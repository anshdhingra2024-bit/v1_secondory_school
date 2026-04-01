import { useEffect, useState } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdmissionPage from './pages/AdmissionPage';
import HomeworkHelperPage from './pages/HomeworkHelperPage';
import AdminDashboard from './pages/AdminDashboard';
import ResultsPage from './pages/ResultsPage';

// Our School
import AboutUs from './pages/school/AboutUs';
import VisionMission from './pages/school/VisionMission';
import PrincipalMessage from './pages/school/PrincipalMessage';
import Affiliation from './pages/school/Affiliation';
import Infrastructure from './pages/school/Infrastructure';

// Academics
import PrePrimary from './pages/academics/PrePrimary';
import Primary from './pages/academics/Primary';
import MiddleSchool from './pages/academics/MiddleSchool';
import SeniorSecondary from './pages/academics/SeniorSecondary';
import TeachingMethodology from './pages/academics/TeachingMethodology';

// Student Life
import BeyondBooks from './pages/student-life/BeyondBooks';
import ClubsActivities from './pages/student-life/ClubsActivities';
import Sports from './pages/student-life/Sports';
import EventsFunctions from './pages/student-life/EventsFunctions';
import SocialActivities from './pages/student-life/SocialActivities';

// School Tour
import Campus from './pages/school-tour/Campus';
import Classrooms from './pages/school-tour/Classrooms';
import Labs from './pages/school-tour/Labs';
import Library from './pages/school-tour/Library';
import Playground from './pages/school-tour/Playground';

// Admissions
import AdmissionProcess from './pages/admissions/AdmissionProcess';
import Eligibility from './pages/admissions/Eligibility';
import Documents from './pages/admissions/Documents';
import FeeStructure from './pages/admissions/FeeStructure';

import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admission" element={<AdmissionPage />} />
          <Route path="/homework-helper" element={<HomeworkHelperPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/results" element={<ResultsPage />} />
          
          {/* Our School */}
          <Route path="/school/about-us" element={<AboutUs />} />
          <Route path="/school/vision-mission" element={<VisionMission />} />
          <Route path="/school/principal-message" element={<PrincipalMessage />} />
          <Route path="/school/affiliation" element={<Affiliation />} />
          <Route path="/school/infrastructure" element={<Infrastructure />} />
          
          {/* Academics */}
          <Route path="/academics/pre-primary" element={<PrePrimary />} />
          <Route path="/academics/primary" element={<Primary />} />
          <Route path="/academics/middle-school" element={<MiddleSchool />} />
          <Route path="/academics/senior-secondary" element={<SeniorSecondary />} />
          <Route path="/academics/teaching-methodology" element={<TeachingMethodology />} />
          
          {/* Student Life */}
          <Route path="/student-life/beyond-books" element={<BeyondBooks />} />
          <Route path="/student-life/clubs-activities" element={<ClubsActivities />} />
          <Route path="/student-life/sports" element={<Sports />} />
          <Route path="/student-life/events-functions" element={<EventsFunctions />} />
          <Route path="/student-life/social-activities" element={<SocialActivities />} />
          
          {/* School Tour */}
          <Route path="/school-tour/campus" element={<Campus />} />
          <Route path="/school-tour/classrooms" element={<Classrooms />} />
          <Route path="/school-tour/labs" element={<Labs />} />
          <Route path="/school-tour/library" element={<Library />} />
          <Route path="/school-tour/playground" element={<Playground />} />
          
          {/* Admissions */}
          <Route path="/admissions/process" element={<AdmissionProcess />} />
          <Route path="/admissions/eligibility" element={<Eligibility />} />
          <Route path="/admissions/documents" element={<Documents />} />
          <Route path="/admissions/fee-structure" element={<FeeStructure />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;