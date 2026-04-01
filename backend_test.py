import requests
import sys
import json
import time
from datetime import datetime

class SchoolAPITester:
    def __init__(self, base_url="https://school-learning-hub-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.session_id = f"test_session_{int(time.time())}"

    def run_test(self, name, method, endpoint, expected_status, data=None, timeout=30):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=timeout)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:500]}")

            return success, response.json() if response.text else {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout after {timeout}s")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_whatsapp_number(self):
        """Test WhatsApp number endpoint"""
        success, response = self.run_test(
            "Get WhatsApp Number",
            "GET",
            "whatsapp-number",
            200
        )
        if success and 'number' in response:
            print(f"   WhatsApp Number: {response['number']}")
            return response['number']
        return None

    def test_admission_submission(self):
        """Test admission form submission"""
        test_data = {
            "student_name": "Test Student",
            "class_applying": "Class 6",
            "parent_name": "Test Parent",
            "phone_number": "9876543210",
            "address": "Test Address, Test City"
        }
        
        success, response = self.run_test(
            "Submit Admission Form",
            "POST",
            "admission",
            200,
            data=test_data
        )
        return response.get('id') if success else None

    def test_get_admissions(self):
        """Test getting all admissions"""
        success, response = self.run_test(
            "Get All Admissions",
            "GET",
            "admissions",
            200
        )
        if success and isinstance(response, list):
            print(f"   Found {len(response)} admissions")
            return len(response)
        return 0

    def test_ai_chatbot(self):
        """Test AI chatbot functionality"""
        test_message = {
            "message": "What are the school timings?",
            "session_id": self.session_id
        }
        
        success, response = self.run_test(
            "AI Chatbot",
            "POST",
            "chat",
            200,
            data=test_message,
            timeout=60  # AI calls can be slow
        )
        
        if success and 'response' in response:
            print(f"   AI Response: {response['response'][:100]}...")
            return True
        return False

    def test_homework_helper(self):
        """Test AI homework helper"""
        test_question = {
            "question": "What is photosynthesis?"
        }
        
        success, response = self.run_test(
            "AI Homework Helper",
            "POST",
            "homework",
            200,
            data=test_question,
            timeout=60  # AI calls can be slow
        )
        
        if success and 'answer' in response:
            print(f"   AI Answer: {response['answer'][:100]}...")
            return True
        return False

    def test_add_notice(self):
        """Test adding a notice"""
        test_notice = {
            "title": "Test Notice",
            "content": "This is a test notice for API testing."
        }
        
        success, response = self.run_test(
            "Add Notice",
            "POST",
            "admin/notices",
            200,
            data=test_notice
        )
        return response.get('id') if success else None

    def test_get_notices(self):
        """Test getting all notices"""
        success, response = self.run_test(
            "Get All Notices",
            "GET",
            "admin/notices",
            200
        )
        if success and isinstance(response, list):
            print(f"   Found {len(response)} notices")
            return len(response)
        return 0

    def test_add_gallery_image(self):
        """Test adding a gallery image"""
        test_image = {
            "title": "Test Image",
            "image_url": "https://images.unsplash.com/photo-1571260899304-425eee4c7efc"
        }
        
        success, response = self.run_test(
            "Add Gallery Image",
            "POST",
            "admin/gallery",
            200,
            data=test_image
        )
        return response.get('id') if success else None

    def test_get_gallery_images(self):
        """Test getting all gallery images"""
        success, response = self.run_test(
            "Get Gallery Images",
            "GET",
            "admin/gallery",
            200
        )
        if success and isinstance(response, list):
            print(f"   Found {len(response)} gallery images")
            return len(response)
        return 0

    def test_get_ai_settings(self):
        """Test getting AI settings"""
        success, response = self.run_test(
            "Get AI Settings",
            "GET",
            "admin/ai-settings",
            200
        )
        if success:
            print(f"   Current settings: Class={response.get('selected_class')}, Mode={response.get('mode')}")
            return response
        return None

    def test_update_ai_settings(self):
        """Test updating AI settings"""
        test_updates = {
            "selected_class": "Class 8",
            "mode": "Exam Mode",
            "word_limit": 100,
            "use_examples": False
        }
        
        success, response = self.run_test(
            "Update AI Settings",
            "PUT",
            "admin/ai-settings",
            200,
            data=test_updates
        )
        
        if success:
            print(f"   Updated settings: Class={response.get('selected_class')}, Mode={response.get('mode')}")
            return True
        return False

def main():
    print("🚀 Starting Modern Public School API Tests")
    print("=" * 60)
    
    tester = SchoolAPITester()
    
    # Test basic endpoints
    whatsapp_num = tester.test_whatsapp_number()
    
    # Test admission system
    admission_id = tester.test_admission_submission()
    admissions_count = tester.test_get_admissions()
    
    # Test AI features (these may take longer)
    print("\n🤖 Testing AI Features (may take 30-60 seconds each)...")
    chatbot_works = tester.test_ai_chatbot()
    homework_works = tester.test_homework_helper()
    
    # Test admin features
    notice_id = tester.test_add_notice()
    notices_count = tester.test_get_notices()
    
    gallery_id = tester.test_add_gallery_image()
    gallery_count = tester.test_get_gallery_images()
    
    # Test AI settings
    current_settings = tester.test_get_ai_settings()
    settings_updated = tester.test_update_ai_settings()
    
    # Print results
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    # Summary of key functionality
    print("\n🔍 Key Features Status:")
    print(f"   WhatsApp Integration: {'✅' if whatsapp_num else '❌'}")
    print(f"   Admission System: {'✅' if admission_id else '❌'}")
    print(f"   AI Chatbot: {'✅' if chatbot_works else '❌'}")
    print(f"   AI Homework Helper: {'✅' if homework_works else '❌'}")
    print(f"   Admin Notices: {'✅' if notice_id else '❌'}")
    print(f"   Admin Gallery: {'✅' if gallery_id else '❌'}")
    print(f"   AI Settings: {'✅' if settings_updated else '❌'}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"\n🎯 Overall Success Rate: {success_rate:.1f}%")
    
    if success_rate >= 80:
        print("🎉 Backend APIs are working well!")
        return 0
    elif success_rate >= 60:
        print("⚠️  Backend has some issues but core functionality works")
        return 1
    else:
        print("❌ Backend has significant issues")
        return 2

if __name__ == "__main__":
    sys.exit(main())