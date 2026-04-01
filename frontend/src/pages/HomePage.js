import { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Trophy, Microscope, Computer, Palette, MessageCircle, X, Send, Menu, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Download, Sparkles, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const TopBar = () => {
  return (
    <div className="bg-slate-900 text-white py-2 text-xs md:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <a href="tel:+918307762064" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
            <Phone className="w-3 h-3" />
            <span>+91 8307762064</span>
          </a>
          <a href="mailto:info@modernpublicschool.edu" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
            <Mail className="w-3 h-3" />
            <span className="hidden sm:inline">info@modernpublicschool.edu</span>
          </a>
          <div className="flex items-center gap-2 text-white/70">
            <MapPin className="w-3 h-3" />
            <span>Ambala, Haryana</span>
          </div>
        </div>
        <a 
          href="/prospectus.pdf" 
          download
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-4 py-1 rounded-full transition-all duration-300 hover:scale-105 text-white font-semibold"
        >
          <Download className="w-3 h-3" />
          <span>Download Prospectus</span>
        </a>
      </div>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {
      title: 'OUR SCHOOL',
      items: [
        { label: 'About Us', href: '/school/about-us', isLink: true },
        { label: 'Vision & Mission', href: '/school/vision-mission', isLink: true },
        { label: 'Principal Message', href: '/school/principal-message', isLink: true },
        { label: 'Affiliation', href: '/school/affiliation', isLink: true },
        { label: 'Infrastructure', href: '/school/infrastructure', isLink: true }
      ]
    },
    {
      title: 'ACADEMICS',
      items: [
        { label: 'Pre-Primary', href: '/academics/pre-primary', isLink: true },
        { label: 'Primary', href: '/academics/primary', isLink: true },
        { label: 'Middle School', href: '/academics/middle-school', isLink: true },
        { label: 'Senior Secondary', href: '/academics/senior-secondary', isLink: true },
        { label: 'Teaching Methodology', href: '/academics/teaching-methodology', isLink: true }
      ]
    },
    {
      title: 'STUDENT LIFE',
      items: [
        { label: 'Beyond Books', href: '/student-life/beyond-books', isLink: true },
        { label: 'Clubs & Activities', href: '/student-life/clubs-activities', isLink: true },
        { label: 'Sports', href: '/student-life/sports', isLink: true },
        { label: 'Events & Functions', href: '/student-life/events-functions', isLink: true },
        { label: 'Social Activities', href: '/student-life/social-activities', isLink: true }
      ]
    },
    {
      title: 'SCHOOL TOUR',
      items: [
        { label: 'Campus', href: '/school-tour/campus', isLink: true },
        { label: 'Classrooms', href: '/school-tour/classrooms', isLink: true },
        { label: 'Labs', href: '/school-tour/labs', isLink: true },
        { label: 'Library', href: '/school-tour/library', isLink: true },
        { label: 'Playground', href: '/school-tour/playground', isLink: true }
      ]
    },
    {
      title: 'ADMISSIONS',
      items: [
        { label: 'Admission Process', href: '/admissions/process', isLink: true },
        { label: 'Eligibility', href: '/admissions/eligibility', isLink: true },
        { label: 'Documents Required', href: '/admissions/documents', isLink: true },
        { label: 'Fee Structure', href: '/admissions/fee-structure', isLink: true },
        { label: 'Apply Now', href: '/admission', isLink: true }
      ]
    }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm' : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            MPS
          </div>
          <div className="font-heading text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            Modern Public School
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map((menu, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(index)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                {menu.title}
              </button>
              
              {openDropdown === index && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-[0_20px_60px_rgb(0,0,0,0.12)] border border-slate-100 py-2 z-50"
                >
                  {menu.items.map((item, idx) => (
                    item.isLink ? (
                      <button
                        key={idx}
                        onClick={() => navigate(item.href)}
                        className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <a
                        key={idx}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {item.label}
                      </a>
                    )
                  ))}
                </motion.div>
              )}
            </div>
          ))}
          
          <Button 
            onClick={() => navigate('/homework-helper')} 
            className="ml-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
            data-testid="homework-helper-nav-btn"
          >
            Student Helper
          </Button>
          
          <button
            onClick={() => navigate('/admin')}
            className="ml-3 p-2.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-all duration-300 hover:scale-110 group"
            data-testid="admin-icon-btn"
            title="Admin Dashboard"
          >
            <Settings className="w-5 h-5 text-slate-600 group-hover:text-blue-600 group-hover:rotate-90 transition-all duration-300" />
          </button>
        </nav>

        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          data-testid="mobile-menu-toggle"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 max-h-[80vh] overflow-y-auto">
          {menuItems.map((menu, index) => (
            <div key={index} className="border-b border-slate-100">
              <button
                onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                className="w-full px-6 py-3 text-left font-semibold text-slate-900 flex items-center justify-between hover:bg-slate-50"
              >
                {menu.title}
                <ChevronRight className={`w-4 h-4 transition-transform ${openDropdown === index ? 'rotate-90' : ''}`} />
              </button>
              {openDropdown === index && (
                <div className="bg-slate-50 px-6 py-2">
                  {menu.items.map((item, idx) => (
                    item.isLink ? (
                      <button
                        key={idx}
                        onClick={() => { navigate(item.href); setIsMenuOpen(false); }}
                        className="block w-full text-left py-2 text-sm text-slate-700 hover:text-blue-600"
                      >
                        {item.label}
                      </button>
                    ) : (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 text-sm text-slate-700 hover:text-blue-600"
                      >
                        {item.label}
                      </a>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="p-6">
            <Button 
              onClick={() => { navigate('/homework-helper'); setIsMenuOpen(false); }} 
              className="w-full bg-orange-500 hover:bg-orange-600 rounded-full py-3" 
              data-testid="mobile-homework-helper-btn"
            >
              Student Helper
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

const HeroCarousel = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const slides = [
    {
      image: 'https://images.pexels.com/photos/247823/pexels-photo-247823.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'Excellence in Education',
      subtitle: 'Where Dreams Meet Opportunity'
    },
    {
      image: 'https://images.pexels.com/photos/5211446/pexels-photo-5211446.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'Empowering Young Minds',
      subtitle: 'Building Tomorrow\'s Leaders Today'
    },
    {
      image: 'https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      title: 'AI-Powered Learning',
      subtitle: 'Modern Education for the Future'
    },
    {
      image: 'https://images.unsplash.com/photo-1733648213151-54ff57977151?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxzdHVkZW50cyUyMHNwb3J0cyUyMGFjdGl2aXRpZXN8ZW58MHx8fHwxNzc0NjcwNzYzfDA&ixlib=rb-4.1.0&q=85',
      title: 'Holistic Development',
      subtitle: 'Sports, Arts, and Academic Excellence'
    }
  ];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section 
      className="relative min-h-[92vh] overflow-hidden mt-[100px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 12, ease: "linear" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${slides[currentIndex].image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex items-center justify-center min-h-[92vh] text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 text-blue-400 border border-white/20">
                Admissions Open 2026
              </div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-[4rem] tracking-tight leading-none font-extrabold text-white mb-6">
                {slides[currentIndex].title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
                {slides[currentIndex].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/admission')}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-8 py-4 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:scale-105 transition-all duration-300"
                  data-testid="apply-now-btn"
                >
                  Apply Now
                </Button>
                <Button
                  size="lg"
                  onClick={() => setIsChatOpen(true)}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-bold rounded-full px-8 py-4 transition-all duration-300"
                  data-testid="ask-ai-btn"
                >
                  Ask AI
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all z-20"
        data-testid="hero-prev-btn"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-all z-20"
        data-testid="hero-next-btn"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-12 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
            }`}
            data-testid={`hero-indicator-${index}`}
          />
        ))}
      </div>

      {isChatOpen && <FloatingChatbot onClose={() => setIsChatOpen(false)} />}
    </section>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-4">About Us</div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight font-bold text-slate-900 mb-6">
            Excellence in Education<br />Since Decades
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-slate-600 max-w-3xl mx-auto">
            Modern Public School, Ambala is committed to providing world-class education that nurtures young minds. 
            With state-of-the-art facilities and AI-powered learning tools, we prepare students for the challenges of tomorrow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 ease-out">
            <img
              src="https://images.unsplash.com/photo-1758270705639-9727f350f026?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwyfHxoYXBweSUyMHN0dWRlbnRzJTIwY2xhc3Nyb29tJTIwbGVhcm5pbmd8ZW58MHx8fHwxNzc0NjcwNzYyfDA&ixlib=rb-4.1.0&q=85"
              alt="Students Learning"
              className="w-full h-80 object-cover"
            />
            <div className="p-8">
              <h3 className="font-heading text-2xl font-bold text-slate-900 mb-3">Modern Learning Environment</h3>
              <p className="text-slate-600 leading-relaxed">
                Our classrooms are equipped with the latest technology and designed to foster interactive learning and collaboration.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 ease-out">
            <img
              src="https://images.unsplash.com/photo-1770827401349-3499200c5e61?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzY2hvb2wlMjBjYW1wdXN8ZW58MHx8fHwxNzc0NjAzMTUwfDA&ixlib=rb-4.1.0&q=85"
              alt="Campus"
              className="w-full h-80 object-cover"
            />
            <div className="p-8">
              <h3 className="font-heading text-2xl font-bold text-slate-900 mb-3">Beautiful Campus</h3>
              <p className="text-slate-600 leading-relaxed">
                Spread across acres of lush greenery, our campus provides a serene and inspiring environment for learning.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FacilitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const facilities = [
    { icon: BookOpen, title: 'Smart Classrooms', description: 'Interactive digital learning environments with modern technology' },
    { icon: Computer, title: 'Computer Labs', description: 'Latest technology and software for hands-on learning' },
    { icon: Microscope, title: 'Science Labs', description: 'Fully equipped laboratories for practical experiments' },
    { icon: Users, title: 'Sports Facilities', description: 'Indoor and outdoor sports infrastructure for all-round development' },
    { icon: Palette, title: 'Arts & Culture', description: 'Music, dance, and art studios to nurture creativity' },
    { icon: Trophy, title: 'Activity Clubs', description: 'Various co-curricular activities and competitions' },
  ];

  return (
    <section id="facilities" ref={ref} className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-4">Our Facilities</div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight font-bold text-slate-900">
            World-Class Infrastructure
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 ease-out"
                data-testid={`facility-card-${index}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">{facility.title}</h3>
                <p className="text-base leading-relaxed text-slate-600">{facility.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const PrincipalMessageSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-4">Message from Principal</div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight font-bold text-slate-900">
            A Word from Our Leader
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0">
            <div className="md:col-span-2 p-8 md:p-12 flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
              <div className="text-center">
                <img
                  src="https://i.pravatar.cc/300?img=60"
                  alt="Dr. Rajesh Sharma"
                  className="w-48 h-48 rounded-2xl mx-auto mb-6 shadow-xl border-4 border-white"
                />
                <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">Dr. Rajesh Sharma</h3>
                <p className="text-sm text-slate-600 font-semibold">Principal</p>
                <p className="text-xs text-slate-500 mt-1">M.Ed., Ph.D. in Education</p>
              </div>
            </div>
            
            <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
              <div className="text-6xl text-orange-500 mb-4 font-serif leading-none">"</div>
              <p className="text-lg leading-relaxed text-slate-700 mb-6">
                Education is not just about acquiring knowledge; it's about nurturing character, building confidence, and preparing young minds to face the world with wisdom and compassion. At Modern Public School, we are committed to providing an environment where every child can discover their potential and grow into responsible, thoughtful citizens.
              </p>
              <p className="text-base leading-relaxed text-slate-600 italic">
                Together with our dedicated teachers and supportive parents, we strive to make learning a joyful and transformative experience for every student.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentSet, setCurrentSet] = useState(0);

  const imageGroups = [
    [
      { url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?crop=entropy&cs=srgb&fm=jpg&q=85', title: 'Students Learning' },
      { url: 'https://images.pexels.com/photos/5538573/pexels-photo-5538573.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Classroom' },
      { url: 'https://images.pexels.com/photos/133623/pexels-photo-133623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Playground' }
    ],
    [
      { url: 'https://images.unsplash.com/photo-1630638208195-9a8d9510d855?crop=entropy&cs=srgb&fm=jpg&q=85', title: 'Activities' },
      { url: 'https://images.pexels.com/photos/5211446/pexels-photo-5211446.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Students' },
      { url: 'https://images.pexels.com/photos/7406300/pexels-photo-7406300.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', title: 'Campus' }
    ]
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % imageGroups.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [imageGroups.length]);

  const nextSet = () => {
    setCurrentSet((prev) => (prev + 1) % imageGroups.length);
  };

  const prevSet = () => {
    setCurrentSet((prev) => (prev - 1 + imageGroups.length) % imageGroups.length);
  };

  return (
    <section id="gallery" ref={ref} className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-4">Gallery</div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight font-bold text-slate-900">
            Life at Our School
          </h2>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSet}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {imageGroups[currentSet].map((image, index) => (
                  <div
                    key={index}
                    className="relative h-80 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300"
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4">
                      <p className="text-white font-semibold">{image.title}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prevSet}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-slate-50 transition-all z-20"
            data-testid="gallery-prev-btn"
          >
            <ChevronLeft className="w-6 h-6 text-slate-900" />
          </button>

          <button
            onClick={nextSet}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-slate-50 transition-all z-20"
            data-testid="gallery-next-btn"
          >
            <ChevronRight className="w-6 h-6 text-slate-900" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {imageGroups.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSet(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSet ? 'w-12 bg-blue-600' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
                data-testid={`gallery-indicator-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const NoticeBoardSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const notices = [
    {
      id: 1,
      title: "Winter Break Announcement",
      description: "School will remain closed from December 25th to January 5th for winter holidays.",
      date: "2026-01-15",
      category: "Holiday",
      isUrgent: false
    },
    {
      id: 2,
      title: "Annual Exam Schedule Released",
      description: "Class 10 and 12 board exams will commence from March 1st. Detailed schedule available on portal.",
      date: "2026-01-20",
      category: "Exam",
      isUrgent: true
    },
    {
      id: 3,
      title: "Sports Day Event",
      description: "Annual Sports Day will be held on February 14th. All students must participate.",
      date: "2026-01-18",
      category: "Event",
      isUrgent: false
    },
    {
      id: 4,
      title: "Parent-Teacher Meeting",
      description: "PTM scheduled for January 30th from 10 AM to 2 PM. Parents are requested to attend.",
      date: "2026-01-22",
      category: "Event",
      isUrgent: true
    },
    {
      id: 5,
      title: "Science Exhibition",
      description: "Inter-school science exhibition on February 20th. Submit projects by February 10th.",
      date: "2026-01-25",
      category: "Event",
      isUrgent: false
    }
  ];

  const sortedNotices = [...notices].sort((a, b) => {
    if (a.isUrgent && !b.isUrgent) return -1;
    if (!a.isUrgent && b.isUrgent) return 1;
    return 0;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNoticeIndex((prev) => (prev + 1) % sortedNotices.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sortedNotices.length]);

  const handleAIQuery = (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setIsSearching(true);
    
    setTimeout(() => {
      let response = '';
      const query = aiQuery.toLowerCase();

      if (query.includes('holiday') || query.includes('vacation') || query.includes('break')) {
        response = 'The next holiday is Winter Break from December 25th to January 5th. School will resume on January 6th, 2026.';
      } else if (query.includes('exam') || query.includes('test')) {
        response = 'Annual exams for Class 10 and 12 will commence from March 1st, 2026. Detailed schedule is available on the student portal.';
      } else if (query.includes('event') || query.includes('sports')) {
        response = 'Upcoming events: Annual Sports Day on February 14th and Science Exhibition on February 20th. Mark your calendars!';
      } else if (query.includes('ptm') || query.includes('parent') || query.includes('meeting')) {
        response = 'Parent-Teacher Meeting is scheduled for January 30th, 2026, from 10 AM to 2 PM. All parents are requested to attend.';
      } else {
        response = `I found ${sortedNotices.length} active notices. The most recent update is: "${sortedNotices[0].title}". You can also ask about holidays, exams, or events.`;
      }

      setAiResponse(response);
      setIsSearching(false);
    }, 1000);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Exam: 'bg-blue-100 text-blue-700 border-blue-200',
      Event: 'bg-purple-100 text-purple-700 border-purple-200',
      Holiday: 'bg-green-100 text-green-700 border-green-200',
      Urgent: 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[category] || 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-3">Smart Updates</div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight font-bold text-slate-900 mb-4">
            AI Smart Notice Board
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Stay informed with intelligent updates and ask questions anytime
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notices Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-6 md:p-8">
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Latest Updates
              </h3>

              <div className="space-y-4 mb-6">
                {sortedNotices.slice(0, 4).map((notice, index) => (
                  <motion.div
                    key={notice.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className={`relative p-4 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      notice.isUrgent 
                        ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200' 
                        : 'bg-slate-50 border-slate-200 hover:border-blue-300'
                    }`}
                    data-testid={`notice-${index}`}
                  >
                    {notice.isUrgent && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                        URGENT
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <h4 className="font-heading text-base font-bold text-slate-900 flex-1">
                        {notice.title}
                      </h4>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(notice.category)}`}>
                        {notice.category}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {notice.description}
                    </p>
                    <div className="text-xs text-slate-400">
                      {new Date(notice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center gap-2">
                {sortedNotices.slice(0, 4).map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentNoticeIndex % 4 ? 'w-8 bg-blue-600' : 'w-1 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* AI Assistant */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 md:p-8 text-white h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-heading text-xl font-bold">AI Assistant</h3>
              </div>

              <form onSubmit={handleAIQuery} className="mb-6">
                <div className="relative">
                  <Input
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="Ask about school updates..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-xl h-12"
                    data-testid="ai-query-input"
                  />
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                    data-testid="ai-query-submit"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {isSearching && (
                <div className="flex items-center gap-2 text-white/80 mb-4">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-sm ml-2">Searching...</span>
                </div>
              )}

              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6"
                  data-testid="ai-response"
                >
                  <p className="text-sm leading-relaxed">{aiResponse}</p>
                </motion.div>
              )}

              <div className="space-y-3">
                <p className="text-xs text-white/70 mb-3">Try asking:</p>
                {['When is the next holiday?', 'Exam schedule?', 'Upcoming events?'].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setAiQuery(suggestion);
                      handleAIQuery({ preventDefault: () => {} });
                    }}
                    className="block w-full text-left px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors"
                    data-testid={`ai-suggestion-${index}`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const achievers = [
    { name: "Aarav Sharma", class: "Class 12", achievement: "98.4%", photo: "https://i.pravatar.cc/150?img=12" },
    { name: "Diya Patel", class: "Class 10", achievement: "97.8%", photo: "https://i.pravatar.cc/150?img=5" },
    { name: "Rohan Kumar", class: "Class 12", achievement: "96.5%", photo: "https://i.pravatar.cc/150?img=13" },
    { name: "Ananya Singh", class: "Class 10", achievement: "97.2%", photo: "https://i.pravatar.cc/150?img=9" },
    { name: "Kabir Malhotra", class: "Class 12", achievement: "95.8%", photo: "https://i.pravatar.cc/150?img=15" },
    { name: "Ishita Verma", class: "Class 10", achievement: "96.1%", photo: "https://i.pravatar.cc/150?img=24" },
    { name: "Arjun Reddy", class: "Class 12", achievement: "96.8%", photo: "https://i.pravatar.cc/150?img=32" },
    { name: "Priya Agarwal", class: "Class 9", achievement: "95.5%", photo: "https://i.pravatar.cc/150?img=23" },
    { name: "Vikram Singh", class: "Class 11", achievement: "94.9%", photo: "https://i.pravatar.cc/150?img=33" },
    { name: "Sneha Kapoor", class: "Class 10", achievement: "95.2%", photo: "https://i.pravatar.cc/150?img=20" },
    { name: "Aditya Gupta", class: "Class 12", achievement: "94.6%", photo: "https://i.pravatar.cc/150?img=14" },
    { name: "Riya Sharma", class: "Class 11", achievement: "95.1%", photo: "https://i.pravatar.cc/150?img=25" },
    { name: "Karan Mehta", class: "Class 9", achievement: "93.8%", photo: "https://i.pravatar.cc/150?img=18" },
    { name: "Neha Agarwal", class: "Class 10", achievement: "94.3%", photo: "https://i.pravatar.cc/150?img=10" },
    { name: "Siddharth Jain", class: "Class 12", achievement: "93.5%", photo: "https://i.pravatar.cc/150?img=17" }
  ];

  return (
    <section ref={ref} className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">Student Excellence</div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight font-bold text-slate-900 mb-4">
            Our Proud Achievers
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            1000+ students excelling in academics, sports, and beyond
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
          {achievers.map((achiever, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-slate-100 p-4 text-center shadow-[0_2px_8px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_8px_16px_rgb(0,0,0,0.08)] transition-all duration-300 ease-out group"
              data-testid={`achiever-card-${index}`}
            >
              <div className="relative inline-block mb-3">
                <img
                  src={achiever.photo}
                  alt={achiever.name}
                  className="w-16 h-16 rounded-full mx-auto border-2 border-blue-100 group-hover:border-orange-400 transition-colors duration-300"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <Trophy className="w-3 h-3 text-white" />
                </div>
              </div>
              <h3 className="font-heading text-sm font-bold text-slate-900 mb-1 line-clamp-1">{achiever.name}</h3>
              <p className="text-xs text-slate-500 mb-2">{achiever.class}</p>
              <div className="text-lg font-extrabold text-blue-600">{achiever.achievement}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Button
            onClick={() => window.location.href = '/results'}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-8 py-3 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:scale-105 transition-all duration-300"
            data-testid="view-all-achievers-btn"
          >
            View All Achievers
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "The AI-powered learning tools have transformed how my daughter studies. She's more engaged and confident than ever.",
      author: "Mrs. Sharma",
      role: "Parent of Grade 8 Student",
      photo: "https://i.pravatar.cc/150?img=1"
    },
    {
      quote: "Modern Public School provides the perfect balance of academics and extracurricular activities. The teachers are exceptional.",
      author: "Mr. Kumar",
      role: "Parent of Grade 10 Student",
      photo: "https://i.pravatar.cc/150?img=33"
    },
    {
      quote: "The infrastructure and facilities are outstanding. My son loves the science labs and sports facilities.",
      author: "Mrs. Gupta",
      role: "Parent of Grade 6 Student",
      photo: "https://i.pravatar.cc/150?img=10"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-4">Testimonials</div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight font-bold text-slate-900">
            What Parents Say
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl border border-slate-100 p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              data-testid={`testimonial-slide-${currentIndex}`}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img
                  src={testimonials[currentIndex].photo}
                  alt={testimonials[currentIndex].author}
                  className="w-24 h-24 rounded-full border-4 border-blue-100 shadow-lg"
                />
                <div className="flex-1 text-center md:text-left">
                  <div className="text-5xl text-orange-500 mb-4 font-serif leading-none">"</div>
                  <p className="text-lg leading-relaxed text-slate-600 mb-6">{testimonials[currentIndex].quote}</p>
                  <div>
                    <div className="font-heading font-bold text-slate-900 text-lg">{testimonials[currentIndex].author}</div>
                    <div className="text-sm text-slate-500">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-12 bg-blue-600' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
                data-testid={`testimonial-indicator-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StudentFeedbackSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const studentFeedback = [
    {
      quote: "The AI Homework Helper makes learning so much easier! I understand concepts better now.",
      student: "Rahul Verma",
      class: "Class 9",
      photo: "https://i.pravatar.cc/150?img=11"
    },
    {
      quote: "I love the science labs and sports facilities. School is not just about books anymore!",
      student: "Priya Agarwal",
      class: "Class 8",
      photo: "https://i.pravatar.cc/150?img=23"
    },
    {
      quote: "The teachers are so supportive and the smart classrooms make learning fun and interactive.",
      student: "Arjun Malhotra",
      class: "Class 10",
      photo: "https://i.pravatar.cc/150?img=14"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % studentFeedback.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [studentFeedback.length]);

  return (
    <section ref={ref} className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-purple-600 mb-4">Student Voices</div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight font-bold text-slate-900">
            What Students Say
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl border border-slate-100 p-10 shadow-[0_20px_60px_rgb(0,0,0,0.08)] text-center"
              data-testid={`student-feedback-${currentIndex}`}
            >
              <img
                src={studentFeedback[currentIndex].photo}
                alt={studentFeedback[currentIndex].student}
                className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-purple-100 shadow-lg"
              />
              <p className="text-xl leading-relaxed text-slate-700 mb-6 italic">
                "{studentFeedback[currentIndex].quote}"
              </p>
              <div>
                <div className="font-heading font-bold text-slate-900 text-lg">{studentFeedback[currentIndex].student}</div>
                <div className="text-sm text-purple-600 font-semibold">{studentFeedback[currentIndex].class}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {studentFeedback.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-12 bg-purple-600' : 'w-1.5 bg-purple-300 hover:bg-purple-400'
                }`}
                data-testid={`student-indicator-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" ref={ref} className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-4">Contact Us</div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight font-bold text-slate-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us and we'll respond as soon as possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="h-12 rounded-xl"
                  required
                  data-testid="contact-name-input"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="h-12 rounded-xl"
                  required
                  data-testid="contact-email-input"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message..."
                  rows={5}
                  className="rounded-xl"
                  required
                  data-testid="contact-message-input"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-8 py-6 text-lg shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:scale-105 transition-all duration-300"
                data-testid="contact-submit-btn"
              >
                Send Message
              </Button>
            </form>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-white rounded-2xl border border-slate-100">
              <p className="text-sm font-bold text-slate-900 mb-1">Address</p>
              <p className="text-sm text-slate-600">Modern Public School, Ambala, Haryana</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-100">
              <p className="text-sm font-bold text-slate-900 mb-1">Phone</p>
              <p className="text-sm text-slate-600">+91 8307762064</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-100">
              <p className="text-sm font-bold text-slate-900 mb-1">Timings</p>
              <p className="text-sm text-slate-600">Mon-Fri, 8:00 AM - 2:30 PM</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FloatingChatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I\'m here to help you with questions about admissions, fees, facilities, and timings. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    'What are the fees?',
    'Which subjects do you offer?',
    'What is the admission process?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText) => {
    const userMessage = messageText || input;
    if (!userMessage.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/chat`, {
        message: userMessage,
        session_id: sessionId
      });

      setMessages(prev => [...prev, { role: 'bot', content: response.data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    handleSend(question);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden"
      data-testid="floating-chatbot"
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="font-bold">School Assistant</div>
            <div className="text-xs text-white/70">Online</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          data-testid="close-chatbot-btn"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="h-96 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            data-testid={`chat-message-${index}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-slate-100 text-slate-800 rounded-bl-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-slate-800 p-4 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <p className="text-xs text-slate-500 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="px-3 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-medium hover:bg-blue-100 transition-colors"
                data-testid={`quick-question-${index}`}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-6 border-t border-slate-200 bg-slate-50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="flex-1 rounded-full"
            data-testid="chat-input"
          />
          <Button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
            data-testid="chat-send-btn"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const FloatingChatButton = ({ onClick }) => {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-[0_8px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.4)] flex items-center justify-center z-40 transition-all duration-300"
      data-testid="floating-chat-button"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></span>
    </motion.button>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                MPS
              </div>
              <div className="font-heading text-xl font-extrabold">Modern Public School</div>
            </div>
            <p className="text-white/70 mb-4 leading-relaxed">
              Empowering futures with AI-powered education and world-class infrastructure.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#about" className="hover:text-orange-400 transition-colors">About Us</a></li>
              <li><a href="#facilities" className="hover:text-orange-400 transition-colors">Facilities</a></li>
              <li><a href="/admission" className="hover:text-orange-400 transition-colors">Admissions</a></li>
              <li><a href="#contact" className="hover:text-orange-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">📍</span>
                <span>Modern Public School<br />Ambala, Haryana, India</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">📞</span>
                <a href="tel:+918307762064" className="hover:text-orange-400 transition-colors">+91 8307762064</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-400">✉️</span>
                <a href="mailto:info@modernpublicschool.edu" className="hover:text-orange-400 transition-colors">info@modernpublicschool.edu</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg mb-4">School Hours</h4>
            <ul className="space-y-2 text-white/70">
              <li>Monday - Friday</li>
              <li className="text-white font-semibold">8:00 AM - 2:30 PM</li>
              <li className="mt-4">
                <Button
                  onClick={() => window.open('https://www.google.com/maps/search/Modern+Public+School+Ambala', '_blank')}
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2 hover:scale-105 transition-all duration-300"
                  data-testid="get-directions-btn"
                >
                  Get Directions
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h4 className="font-heading font-bold text-lg mb-4 text-center">Find Us on Map</h4>
          <div className="rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109741.02912911311!2d76.68906292812499!3d30.360994299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391028ab86533555%3A0x93c663fd1d22ec89!2sAmbala%2C%20Haryana!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location"
            ></iframe>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © 2026 Modern Public School, Ambala. All rights reserved.
          </p>
          <a 
            href="/admin" 
            className="inline-block mt-4 text-white/40 text-xs hover:text-orange-400 transition-colors"
            data-testid="admin-login-link"
          >
            🔐 Admin Login
          </a>
        </div>
      </div>
    </footer>
  );
};

const HomePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#FDFBF7]">
      <TopBar />
      <Header />
      <HeroCarousel />
      <AchievementsSection />
      <AboutSection />
      <PrincipalMessageSection />
      <FacilitiesSection />
      <NoticeBoardSection />
      <GallerySection />
      <TestimonialsSection />
      <StudentFeedbackSection />
      <ContactSection />
      <Footer />
      
      {!isChatOpen && <FloatingChatButton onClick={() => setIsChatOpen(true)} />}
      {isChatOpen && <FloatingChatbot onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default HomePage;
