from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# LLM Key
EMERGENT_KEY = os.environ.get('EMERGENT_LLM_KEY')
WHATSAPP_NUMBER = os.environ.get('WHATSAPP_NUMBER', '8307762064')

# ===== MODELS =====

class AdmissionForm(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    student_name: str
    class_applying: str
    parent_name: str
    phone_number: str
    address: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "pending"

class AdmissionFormCreate(BaseModel):
    student_name: str
    class_applying: str
    parent_name: str
    phone_number: str
    address: str

class ChatMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    user_message: str
    bot_response: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatRequest(BaseModel):
    message: str
    session_id: str

class ChatResponse(BaseModel):
    response: str
    session_id: str

class HomeworkQuery(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    student_question: str
    ai_answer: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class HomeworkRequest(BaseModel):
    question: str

class HomeworkResponse(BaseModel):
    answer: str

class Notice(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    category: str = "Event"
    isUrgent: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class NoticeCreate(BaseModel):
    title: str
    content: str
    category: str = "Event"
    isUrgent: bool = False

class GalleryImage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    image_url: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class GalleryImageCreate(BaseModel):
    title: str
    image_url: str

class AISettings(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default="default")
    selected_class: str = "Class 6"
    mode: str = "Concept Mode"
    word_limit: int = 80
    use_examples: bool = True

class AISettingsUpdate(BaseModel):
    selected_class: Optional[str] = None
    mode: Optional[str] = None
    word_limit: Optional[int] = None
    use_examples: Optional[bool] = None

# ===== ADMISSION ENDPOINTS =====

@api_router.post("/admission", response_model=AdmissionForm)
async def submit_admission(form: AdmissionFormCreate):
    admission_dict = form.model_dump()
    admission_obj = AdmissionForm(**admission_dict)
    
    doc = admission_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.admissions.insert_one(doc)
    return admission_obj

@api_router.get("/admissions", response_model=List[AdmissionForm])
async def get_admissions():
    admissions = await db.admissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    for admission in admissions:
        if isinstance(admission['created_at'], str):
            admission['created_at'] = datetime.fromisoformat(admission['created_at'])
    
    return admissions

@api_router.get("/whatsapp-number")
async def get_whatsapp_number():
    return {"number": WHATSAPP_NUMBER}

# ===== AI CHATBOT ENDPOINTS =====

@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_bot(request: ChatRequest):
    system_message = """You are a friendly and helpful school assistant for Modern Public School, Ambala.
    
    Answer questions about:
    - Admissions: Admissions are open for 2026. We accept students from Playschool to Class 12.
    - Fees: Our fees range from ₹15,000 to ₹45,000 per year depending on the class.
    - Facilities: We have smart classrooms, computer labs, sports facilities, library, science labs, and playground.
    - Timings: School hours are 8:00 AM to 2:30 PM on weekdays.
    
    Keep responses friendly, polite, and under 100 words. If you don't know something, politely suggest contacting the school office at 8307762064."""
    
    try:
        chat = LlmChat(
            api_key=EMERGENT_KEY,
            session_id=request.session_id,
            system_message=system_message
        ).with_model("openai", "gpt-5.2")
        
        user_message = UserMessage(text=request.message)
        response = await chat.send_message(user_message)
        
        # Save to database
        chat_record = ChatMessage(
            session_id=request.session_id,
            user_message=request.message,
            bot_response=response
        )
        
        doc = chat_record.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.chat_history.insert_one(doc)
        
        return ChatResponse(response=response, session_id=request.session_id)
    except Exception as e:
        logging.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail="Failed to process chat message")

# ===== AI HOMEWORK HELPER ENDPOINTS =====

@api_router.post("/homework", response_model=HomeworkResponse)
async def homework_helper(request: HomeworkRequest):
    # Get AI settings
    settings_doc = await db.ai_settings.find_one({"id": "default"}, {"_id": 0})
    if settings_doc:
        settings = AISettings(**settings_doc)
    else:
        settings = AISettings()
    
    mode_instructions = {
        "Concept Mode": "Explain the concept clearly and simply.",
        "Exam Mode": "Provide a concise answer suitable for exam preparation.",
        "Revision Mode": "Give key points for quick revision."
    }
    
    example_text = "Always include one real-life example." if settings.use_examples else ""
    
    system_message = f"""You are a helpful teacher for {settings.selected_class} students.
    
    Mode: {settings.mode}
    Instructions: {mode_instructions.get(settings.mode, 'Explain clearly.')}
    
    Use simple English that a {settings.selected_class} student can understand.
    Keep your answer under {settings.word_limit} words.
    {example_text}
    
    Be encouraging and friendly."""
    
    try:
        chat = LlmChat(
            api_key=EMERGENT_KEY,
            session_id=f"homework_{uuid.uuid4()}",
            system_message=system_message
        ).with_model("openai", "gpt-5.2")
        
        user_message = UserMessage(text=request.question)
        response = await chat.send_message(user_message)
        
        # Save to database
        homework_record = HomeworkQuery(
            student_question=request.question,
            ai_answer=response
        )
        
        doc = homework_record.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.homework_queries.insert_one(doc)
        
        return HomeworkResponse(answer=response)
    except Exception as e:
        logging.error(f"Homework helper error: {e}")
        raise HTTPException(status_code=500, detail="Failed to process homework question")

# ===== ADMIN - NOTICES =====

@api_router.post("/admin/notices", response_model=Notice)
async def create_notice(notice: NoticeCreate):
    notice_obj = Notice(**notice.model_dump())
    
    doc = notice_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.notices.insert_one(doc)
    return notice_obj

@api_router.get("/admin/notices", response_model=List[Notice])
async def get_notices():
    notices = await db.notices.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    
    for notice in notices:
        if isinstance(notice['created_at'], str):
            notice['created_at'] = datetime.fromisoformat(notice['created_at'])
    
    return notices

# ===== ADMIN - GALLERY =====

@api_router.post("/admin/gallery", response_model=GalleryImage)
async def add_gallery_image(image: GalleryImageCreate):
    gallery_obj = GalleryImage(**image.model_dump())
    
    doc = gallery_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.gallery.insert_one(doc)
    return gallery_obj

@api_router.get("/admin/gallery", response_model=List[GalleryImage])
async def get_gallery_images():
    images = await db.gallery.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    
    for image in images:
        if isinstance(image['created_at'], str):
            image['created_at'] = datetime.fromisoformat(image['created_at'])
    
    return images

# ===== ADMIN - AI SETTINGS =====

@api_router.get("/admin/ai-settings", response_model=AISettings)
async def get_ai_settings():
    settings_doc = await db.ai_settings.find_one({"id": "default"}, {"_id": 0})
    if settings_doc:
        return AISettings(**settings_doc)
    else:
        # Create default settings
        default_settings = AISettings()
        doc = default_settings.model_dump()
        await db.ai_settings.insert_one(doc)
        return default_settings

@api_router.put("/admin/ai-settings", response_model=AISettings)
async def update_ai_settings(update: AISettingsUpdate):
    settings_doc = await db.ai_settings.find_one({"id": "default"}, {"_id": 0})
    
    if settings_doc:
        settings = AISettings(**settings_doc)
    else:
        settings = AISettings()
    
    # Update fields
    if update.selected_class is not None:
        settings.selected_class = update.selected_class
    if update.mode is not None:
        settings.mode = update.mode
    if update.word_limit is not None:
        settings.word_limit = update.word_limit
    if update.use_examples is not None:
        settings.use_examples = update.use_examples
    
    # Upsert to database
    await db.ai_settings.update_one(
        {"id": "default"},
        {"$set": settings.model_dump()},
        upsert=True
    )
    
    return settings

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()