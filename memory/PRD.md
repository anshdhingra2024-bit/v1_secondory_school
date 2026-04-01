# Modern Public School Website - PRD

## Original Problem Statement
Create a complete modern AI-powered school website system for "Modern Public School, Ambala". Features must include:
- Homepage with premium UI/UX
- Admission System
- AI Chatbot (Parent Assistant)
- AI Homework Helper (Class 6)
- Admin Dashboard (Kids + Professional versions)
- AI Control Panel
- WhatsApp integration (8307762064)
- Responsive design with smooth animations

## Tech Stack
- **Frontend:** React, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend:** FastAPI, Python
- **Database:** MongoDB
- **AI:** Emergent Integrations (LLM Key)

## What's Been Implemented

### ✅ Completed (March 2026)

**Core Website:**
- Premium UI/UX with creamy-greenish background
- Auto-sliding hero carousel with 3 slides
- Responsive navigation with dropdowns
- 24+ dedicated sub-pages (Our School, Academics, Student Life, School Tour, Admissions)
- Top Information Bar with contact details
- Principal Message section
- Facilities section
- Testimonials with student feedback
- Contact section with Google Maps
- Footer with Admin Login link

**AI Features:**
- AI Chatbot (Parent Assistant) - floating widget
- AI Homework Helper for Class 6 students
- AI-powered Notice Board

**Admin Dashboard:**
- Overview tab with application stats
- Admissions management
- Notice Board management (add notices)
- Gallery management (add photos via URL)
- Hero Images management (demo mode)
- AI Settings configuration
- Kids Mode / Professional Mode toggle
- **Admin icon (⚙️) in header** for easy access

**Backend API Endpoints:**
- POST /api/chat - AI chatbot
- POST /api/homework - Homework helper
- GET /api/notices - Fetch notices
- POST /api/notices - Add notices
- GET /api/applications - Fetch applications
- POST /api/applications - Submit applications

## Prioritized Backlog

### P0 (Critical)
- None currently

### P1 (High Priority)
- [ ] Connect Hero Images to database (currently demo mode)
- [ ] Add image file upload for Gallery/Hero sections
- [ ] Add WhatsApp floating button (8307762064)

### P2 (Medium Priority)
- [ ] Notice editing and deletion in Admin Dashboard
- [ ] Password protection for admin area
- [ ] Refactor HomePage.js into smaller components

### P3 (Low Priority/Future)
- [ ] Email notifications for new applications
- [ ] Student portal with login
- [ ] Online fee payment integration

## File Structure
```
/app/
├── backend/
│   ├── server.py (Core backend)
│   ├── requirements.txt
│   └── .env
├── frontend/
│   └── src/
│       ├── App.js (Router)
│       ├── pages/
│       │   ├── HomePage.js (Main landing - 1600+ lines)
│       │   ├── AdminDashboard.js
│       │   ├── AdmissionPage.js
│       │   ├── HomeworkHelperPage.js
│       │   └── [24+ sub-pages]
│       └── components/
│           ├── PageTemplate.js
│           └── ui/ (shadcn components)
└── memory/
    └── PRD.md
```

## Database Schema
- **Notice:** {title, description, date, category, is_urgent, created_at}
- **HomeworkQuery:** {student_class, question, ai_answer, created_at}
- **Application:** {student_name, class, parent details, status, created_at}
