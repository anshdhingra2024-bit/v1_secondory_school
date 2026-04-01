import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Menu, ChevronRight, MessageCircle } from 'lucide-react';
import { useState } from 'react';

// Simple Header for sub-pages
const SimpleHeader = ({ onBack }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            MPS
          </div>
          <div className="font-heading text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
            Modern Public School
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-slate-700 hover:text-blue-600"
          >
            Home
          </Button>
          <Button
            onClick={() => navigate('/admission')}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6"
          >
            Apply Now
          </Button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 p-6 space-y-4">
          <Button
            onClick={() => { navigate('/'); setIsMenuOpen(false); }}
            variant="ghost"
            className="w-full text-left"
          >
            Home
          </Button>
          <Button
            onClick={() => { navigate('/admission'); setIsMenuOpen(false); }}
            className="w-full bg-orange-500 hover:bg-orange-600 rounded-full"
          >
            Apply Now
          </Button>
        </div>
      )}
    </header>
  );
};

// Simple Footer for sub-pages
const SimpleFooter = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              MPS
            </div>
            <div className="font-heading text-2xl font-extrabold">Modern Public School</div>
          </div>
          <p className="text-white/70 mb-6">Empowering futures with AI-powered education</p>
          <div className="flex justify-center gap-4 mb-6">
            <button onClick={() => navigate('/')} className="text-white/70 hover:text-orange-400 transition-colors">Home</button>
            <button onClick={() => navigate('/admission')} className="text-white/70 hover:text-orange-400 transition-colors">Admissions</button>
            <button onClick={() => navigate('/homework-helper')} className="text-white/70 hover:text-orange-400 transition-colors">Student Helper</button>
          </div>
          <div className="text-sm text-white/50">
            © 2026 Modern Public School, Ambala. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

const PageTemplate = ({ title, subtitle, heroImage, images = [], content, children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <SimpleHeader />
      
      {/* Hero Section */}
      <div 
        className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('${heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-slate-900/20" />
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl md:text-2xl text-white/90">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-slate-100 rounded-full"
          data-testid="back-to-home"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="prose prose-lg max-w-none"
        >
          {content && content.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-slate-700 mb-6">
              {paragraph}
            </p>
          ))}

          {children}

          {images && images.length > 0 && (
            <div className={`grid ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-8 my-12`}>
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300"
                >
                  <img
                    src={image.url}
                    alt={image.caption || title}
                    className="w-full h-80 object-cover"
                  />
                  {image.caption && (
                    <div className="p-4 bg-white">
                      <p className="text-sm text-slate-600 text-center">{image.caption}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <SimpleFooter />
    </div>
  );
};

export default PageTemplate;
