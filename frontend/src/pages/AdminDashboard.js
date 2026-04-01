import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  ArrowLeft,
  Users,
  Bell,
  Image as ImageIcon,
  Settings,
  UserPlus,
  LayoutDashboard,
  Palette,
  School
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isKidsMode, setIsKidsMode] = useState(false);
  const [admissions, setAdmissions] = useState([]);
  const [notices, setNotices] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [aiSettings, setAiSettings] = useState({
    selected_class: 'Class 6',
    mode: 'Concept Mode',
    word_limit: 80,
    use_examples: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [admissionsRes, noticesRes, galleryRes, aiSettingsRes] = await Promise.all([
        axios.get(`${API}/admissions`),
        axios.get(`${API}/admin/notices`),
        axios.get(`${API}/admin/gallery`),
        axios.get(`${API}/admin/ai-settings`)
      ]);

      setAdmissions(admissionsRes.data);
      setNotices(noticesRes.data);
      setGalleryImages(galleryRes.data);
      setAiSettings(aiSettingsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddNotice = async (title, content) => {
    try {
      await axios.post(`${API}/admin/notices`, { title, content });
      toast.success('Notice added successfully!');
      fetchData();
    } catch (error) {
      toast.error('Failed to add notice');
    }
  };

  const handleAddGalleryImage = async (title, imageUrl) => {
    try {
      await axios.post(`${API}/admin/gallery`, { title, image_url: imageUrl });
      toast.success('Image added to gallery!');
      fetchData();
    } catch (error) {
      toast.error('Failed to add image');
    }
  };

  const handleUpdateAISettings = async (updates) => {
    try {
      const response = await axios.put(`${API}/admin/ai-settings`, updates);
      setAiSettings(response.data);
      toast.success('AI settings updated!');
    } catch (error) {
      toast.error('Failed to update AI settings');
    }
  };

  const containerClass = isKidsMode
    ? 'font-kids bg-gradient-to-br from-[#FEF3C7] via-[#DBEAFE] to-[#FEF3C7]'
    : 'bg-[#FAFAFA]';

  return (
    <div className={`min-h-screen ${containerClass}`}>
      <Header
        isKidsMode={isKidsMode}
        onToggleMode={() => setIsKidsMode(!isKidsMode)}
        onBack={() => navigate('/')}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1
            className={`${
              isKidsMode ? 'text-5xl' : 'text-4xl'
            } font-bold text-[#0A2540] mb-2`}
          >
            {isKidsMode ? '🎨 Admin Dashboard' : 'Admin Dashboard'}
          </h1>
          <p className="text-slate-700">
            {isKidsMode ? 'Manage your awesome school! 🚀' : 'Manage school operations efficiently'}
          </p>
        </motion.div>

        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isKidsMode={isKidsMode}
        />

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <OverviewTab admissions={admissions} isKidsMode={isKidsMode} />
            )}
            {activeTab === 'admissions' && (
              <AdmissionsTab admissions={admissions} isKidsMode={isKidsMode} />
            )}
            {activeTab === 'notices' && (
              <NoticesTab
                notices={notices}
                onAddNotice={handleAddNotice}
                isKidsMode={isKidsMode}
              />
            )}
            {activeTab === 'gallery' && (
              <GalleryTab
                images={galleryImages}
                onAddImage={handleAddGalleryImage}
                isKidsMode={isKidsMode}
              />
            )}
            {activeTab === 'ai-settings' && (
              <AISettingsTab
                settings={aiSettings}
                onUpdateSettings={handleUpdateAISettings}
                isKidsMode={isKidsMode}
              />
            )}

            {activeTab === 'hero-images' && (
              <HeroImagesTab isKidsMode={isKidsMode} />
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const Header = ({ isKidsMode, onToggleMode, onBack }) => {
  return (
    <header
      className={`${
        isKidsMode ? 'bg-gradient-to-r from-[#3B82F6] to-[#10B981]' : 'bg-white'
      } border-b ${isKidsMode ? 'border-transparent' : 'border-slate-200'} sticky top-0 z-50 backdrop-blur-xl`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className={isKidsMode ? 'text-white hover:bg-white/20' : ''}
          data-testid="admin-back-btn"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="flex items-center gap-4">
          <span className={`text-sm ${isKidsMode ? 'text-white' : 'text-slate-700'}`}>
            {isKidsMode ? '🎨 Kids Mode' : 'Professional Mode'}
          </span>
          <Switch
            checked={isKidsMode}
            onCheckedChange={onToggleMode}
            data-testid="mode-toggle-switch"
          />
        </div>
      </div>
    </header>
  );
};

const TabNavigation = ({ activeTab, onTabChange, isKidsMode }) => {
  const tabs = [
    { id: 'overview', label: isKidsMode ? '📊 Dashboard' : 'Overview', icon: LayoutDashboard },
    { id: 'admissions', label: isKidsMode ? '👥 Students' : 'Admissions', icon: Users },
    { id: 'notices', label: isKidsMode ? '📢 Notices' : 'Notice Board', icon: Bell },
    { id: 'gallery', label: isKidsMode ? '🖼️ Gallery' : 'Gallery', icon: ImageIcon },
    { id: 'hero-images', label: isKidsMode ? '🎨 Hero Images' : 'Hero Images', icon: ImageIcon },
    { id: 'ai-settings', label: isKidsMode ? '⚙️ AI Settings' : 'AI Settings', icon: Settings }
  ];

  const cardClass = isKidsMode
    ? 'bg-white rounded-3xl shadow-xl border-4'
    : 'bg-white rounded-xl shadow-md border';

  return (
    <div className={`${cardClass} border-slate-200 p-2`}>
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 ${
                isKidsMode ? 'rounded-2xl' : 'rounded-lg'
              } transition-all ${
                activeTab === tab.id
                  ? isKidsMode
                    ? 'bg-gradient-to-r from-[#3B82F6] to-[#10B981] text-white shadow-lg scale-105'
                    : 'bg-[#0A2540] text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
              data-testid={`tab-${tab.id}`}
            >
              {!isKidsMode && <Icon className="w-4 h-4" />}
              <span className={isKidsMode ? 'text-lg font-bold' : 'text-sm font-medium'}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const OverviewTab = ({ admissions, isKidsMode }) => {
  const stats = [
    { label: 'Total Applications', value: admissions.length, icon: Users, color: 'blue' },
    { label: 'Pending Review', value: admissions.filter(a => a.status === 'pending').length, icon: Bell, color: 'orange' },
    { label: 'This Month', value: admissions.filter(a => {
      const date = new Date(a.created_at);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length, icon: UserPlus, color: 'green' }
  ];

  const cardClass = isKidsMode
    ? 'bg-white rounded-3xl shadow-xl border-4 p-8'
    : 'bg-white rounded-xl border border-slate-200 p-6';

  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={cardClass}
              data-testid={`stat-card-${index}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${isKidsMode ? 'text-lg' : 'text-sm'} text-slate-500 mb-2`}>
                    {stat.label}
                  </p>
                  <p className={`${isKidsMode ? 'text-5xl' : 'text-3xl'} font-bold text-[#0A2540]`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`${isKidsMode ? 'w-20 h-20 rounded-3xl' : 'w-14 h-14 rounded-xl'} bg-${stat.color}-100 flex items-center justify-center`}>
                  <Icon className={`${isKidsMode ? 'w-10 h-10' : 'w-7 h-7'} text-${stat.color}-600`} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className={cardClass}>
        <h3 className={`${isKidsMode ? 'text-3xl' : 'text-xl'} font-bold text-[#0A2540] mb-4`}>
          {isKidsMode ? '📋 Recent Applications' : 'Recent Applications'}
        </h3>
        {admissions.slice(0, 5).length > 0 ? (
          <div className="space-y-3">
            {admissions.slice(0, 5).map((admission, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 ${
                  isKidsMode ? 'bg-[#FEF3C7] rounded-2xl' : 'bg-slate-50 rounded-lg'
                }`}
                data-testid={`recent-admission-${index}`}
              >
                <div>
                  <p className={`${isKidsMode ? 'text-lg' : 'text-base'} font-medium text-[#0A2540]`}>
                    {admission.student_name}
                  </p>
                  <p className="text-sm text-slate-500">{admission.class_applying}</p>
                </div>
                <span
                  className={`px-3 py-1 ${
                    isKidsMode ? 'rounded-full text-base' : 'rounded-md text-xs'
                  } bg-yellow-100 text-yellow-700`}
                >
                  {admission.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">No applications yet</p>
        )}
      </div>
    </motion.div>
  );
};

const AdmissionsTab = ({ admissions, isKidsMode }) => {
  const cardClass = isKidsMode
    ? 'bg-white rounded-3xl shadow-xl border-4 p-8'
    : 'bg-white rounded-xl border border-slate-200 p-6';

  return (
    <motion.div
      key="admissions"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cardClass}
    >
      <h3 className={`${isKidsMode ? 'text-3xl' : 'text-xl'} font-bold text-[#0A2540] mb-6`}>
        {isKidsMode ? '👥 All Student Applications' : 'Admission Applications'}
      </h3>

      {admissions.length > 0 ? (
        <div className="space-y-4">
          {admissions.map((admission, index) => (
            <div
              key={index}
              className={`${
                isKidsMode ? 'bg-[#DBEAFE] rounded-2xl p-6' : 'bg-slate-50 rounded-lg p-4'
              } border ${isKidsMode ? 'border-[#3B82F6]/30' : 'border-slate-200'}`}
              data-testid={`admission-item-${index}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Student Name</p>
                  <p className={`${isKidsMode ? 'text-lg' : 'text-base'} font-medium text-[#0A2540]`}>
                    {admission.student_name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Class</p>
                  <p className={`${isKidsMode ? 'text-lg' : 'text-base'} font-medium text-[#0A2540]`}>
                    {admission.class_applying}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Parent Name</p>
                  <p className={`${isKidsMode ? 'text-lg' : 'text-base'} font-medium text-[#0A2540]`}>
                    {admission.parent_name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Phone</p>
                  <p className={`${isKidsMode ? 'text-lg' : 'text-base'} font-medium text-[#0A2540]`}>
                    {admission.phone_number}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-slate-500 mb-1">Address</p>
                  <p className="text-sm text-slate-700">{admission.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-500 text-center py-8">No applications yet</p>
      )}
    </motion.div>
  );
};

const NoticesTab = ({ notices, onAddNotice, isKidsMode }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Event');
  const [isUrgent, setIsUrgent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNotice(title, content, category, isUrgent);
    setTitle('');
    setContent('');
    setCategory('Event');
    setIsUrgent(false);
  };

  const cardClass = isKidsMode
    ? 'bg-white rounded-3xl shadow-xl border-4 p-8'
    : 'bg-white rounded-xl border border-slate-200 p-6';

  return (
    <motion.div
      key="notices"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className={cardClass}>
        <h3 className={`${isKidsMode ? 'text-3xl' : 'text-xl'} font-bold text-[#0A2540] mb-6`}>
          {isKidsMode ? '➕ Add New Notice' : 'Add New Notice'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Notice title"
              required
              data-testid="notice-title-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Notice content"
              rows={4}
              required
              data-testid="notice-content-input"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger data-testid="notice-category-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Exam">Exam</SelectItem>
                  <SelectItem value="Event">Event</SelectItem>
                  <SelectItem value="Holiday">Holiday</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isUrgent}
                  onCheckedChange={setIsUrgent}
                  data-testid="notice-urgent-toggle"
                />
                <label className="text-sm font-medium text-slate-700">Mark as Urgent</label>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className={`${
              isKidsMode
                ? 'bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-2xl text-lg py-6'
                : 'bg-[#EA580C] hover:bg-[#C2410C]'
            } text-white w-full`}
            data-testid="add-notice-btn"
          >
            {isKidsMode ? '🎉 Add Notice' : 'Add Notice'}
          </Button>
        </form>
      </div>

      <div className={cardClass}>
        <h3 className={`${isKidsMode ? 'text-3xl' : 'text-xl'} font-bold text-[#0A2540] mb-6`}>
          {isKidsMode ? '📢 All Notices' : 'Published Notices'}
        </h3>
        {notices.length > 0 ? (
          <div className="space-y-4">
            {notices.map((notice, index) => (
              <div
                key={index}
                className={`${
                  isKidsMode ? 'bg-[#FEF3C7] rounded-2xl p-6' : 'bg-slate-50 rounded-lg p-4'
                } ${notice.isUrgent ? 'border-2 border-red-400' : ''}`}
                data-testid={`notice-item-${index}`}
              >
                {notice.isUrgent && (
                  <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded mb-2">
                    URGENT
                  </span>
                )}
                <span className={`inline-block ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  notice.category === 'Exam' ? 'bg-blue-100 text-blue-700' :
                  notice.category === 'Event' ? 'bg-purple-100 text-purple-700' :
                  notice.category === 'Holiday' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {notice.category}
                </span>
                <h4 className={`${isKidsMode ? 'text-xl' : 'text-base'} font-bold text-[#0A2540] mb-2 mt-2`}>
                  {notice.title}
                </h4>
                <p className="text-slate-700 mb-2">{notice.content}</p>
                <p className="text-xs text-slate-500">
                  {new Date(notice.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">No notices yet</p>
        )}
      </div>
    </motion.div>
  );
};

const GalleryTab = ({ images, onAddImage, isKidsMode }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddImage(title, imageUrl);
    setTitle('');
    setImageUrl('');
  };

  const cardClass = isKidsMode
    ? 'bg-white rounded-3xl shadow-xl border-4 p-8'
    : 'bg-white rounded-xl border border-slate-200 p-6';

  return (
    <motion.div
      key="gallery"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className={cardClass}>
        <h3 className={`${isKidsMode ? 'text-3xl' : 'text-xl'} font-bold text-[#0A2540] mb-6`}>
          {isKidsMode ? '➕ Add New Image' : 'Add New Image'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Image title"
              required
              data-testid="gallery-title-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              required
              data-testid="gallery-url-input"
            />
          </div>
          <Button
            type="submit"
            className={`${
              isKidsMode
                ? 'bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-2xl text-lg py-6'
                : 'bg-[#EA580C] hover:bg-[#C2410C]'
            } text-white w-full`}
            data-testid="add-gallery-btn"
          >
            {isKidsMode ? '🎉 Add Image' : 'Add Image'}
          </Button>
        </form>
      </div>

      <div className={cardClass}>
        <h3 className={`${isKidsMode ? 'text-3xl' : 'text-xl'} font-bold text-[#0A2540] mb-6`}>
          {isKidsMode ? '🖼️ Gallery Images' : 'Gallery Images'}
        </h3>
        {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`${isKidsMode ? 'rounded-2xl' : 'rounded-lg'} overflow-hidden border-2 ${
                  isKidsMode ? 'border-[#3B82F6]' : 'border-slate-200'
                }`}
                data-testid={`gallery-image-${index}`}
              >
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3 bg-white">
                  <p className={`${isKidsMode ? 'text-lg' : 'text-sm'} font-medium text-[#0A2540]`}>
                    {image.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">No images yet</p>
        )}
      </div>
    </motion.div>
  );
};


const HeroImagesTab = ({ isKidsMode }) => {
  const [heroImages, setHeroImages] = useState([
    'https://images.pexels.com/photos/247823/pexels-photo-247823.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/5211446/pexels-photo-5211446.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    'https://images.unsplash.com/photo-1733648213151-54ff57977151?crop=entropy&cs=srgb&fm=jpg&q=85'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAddImage = (e) => {
    e.preventDefault();
    if (newImageUrl.trim()) {
      setHeroImages([...heroImages, newImageUrl]);
      setNewImageUrl('');
      toast.success('Hero image added! (Note: This is demo mode - actual implementation will save to database)');
    }
  };

  const handleRemoveImage = (index) => {
    const updated = heroImages.filter((_, i) => i !== index);
    setHeroImages(updated);
    toast.success('Hero image removed!');
  };

  const cardClass = isKidsMode
    ? 'bg-white rounded-3xl shadow-xl border-4 p-8'
    : 'bg-white rounded-xl border border-slate-200 p-6';

  return (
    <motion.div
      key="hero-images"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cardClass}
    >
      <h3 className={`${isKidsMode ? 'text-3xl' : 'text-xl'} font-bold text-[#0A2540] mb-6`}>
        {isKidsMode ? '🎨 Manage Hero Images' : 'Manage Hero Slider Images'}
      </h3>
      
      <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Hero slider images appear on the homepage. Recommended size: 1920x1080px. 
          You can add/remove images that will auto-rotate every 4 seconds.
        </p>
      </div>

      <form onSubmit={handleAddImage} className="mb-8">
        <label className="block text-sm font-medium text-slate-700 mb-2">Add New Hero Image</label>
        <div className="flex gap-2">
          <Input
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
            className="flex-1"
            data-testid="hero-image-url-input"
          />
          <Button
            type="submit"
            className={`${
              isKidsMode
                ? 'bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-2xl'
                : 'bg-[#EA580C] hover:bg-[#C2410C]'
            } text-white`}
            data-testid="add-hero-image-btn"
          >
            Add Image
          </Button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {heroImages.map((imageUrl, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden border-2 border-slate-200 hover:border-blue-400 transition-colors"
            data-testid={`hero-image-${index}`}
          >
            <img
              src={imageUrl}
              alt={`Hero ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => handleRemoveImage(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
                data-testid={`remove-hero-image-${index}`}
              >
                Remove
              </button>
            </div>
            <div className="p-2 bg-white">
              <p className="text-xs text-slate-600 truncate">Image {index + 1}</p>
            </div>
          </div>
        ))}
      </div>

      {heroImages.length === 0 && (
        <p className="text-center text-slate-500 py-8">No hero images yet. Add your first image above!</p>
      )}
    </motion.div>
  );
};

const AISettingsTab = ({ settings, onUpdateSettings, isKidsMode }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleUpdate = () => {
    onUpdateSettings(localSettings);
  };

  const cardClass = isKidsMode
    ? 'bg-white rounded-3xl shadow-xl border-4 p-8'
    : 'bg-white rounded-xl border border-slate-200 p-6';

  return (
    <motion.div
      key="ai-settings"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cardClass}
    >
      <h3 className={`${isKidsMode ? 'text-3xl' : 'text-xl'} font-bold text-[#0A2540] mb-6`}>
        {isKidsMode ? '⚙️ AI Control Panel' : 'AI Control Panel'}
      </h3>
      <p className="text-slate-700 mb-8">
        Configure how the AI Homework Helper responds to students
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Select Class</label>
          <Select
            value={localSettings.selected_class}
            onValueChange={(value) => setLocalSettings({ ...localSettings, selected_class: value })}
          >
            <SelectTrigger data-testid="ai-class-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map(
                (cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Select Mode</label>
          <Select
            value={localSettings.mode}
            onValueChange={(value) => setLocalSettings({ ...localSettings, mode: value })}
          >
            <SelectTrigger data-testid="ai-mode-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Concept Mode">Concept Mode</SelectItem>
              <SelectItem value="Exam Mode">Exam Mode</SelectItem>
              <SelectItem value="Revision Mode">Revision Mode</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Word Limit: {localSettings.word_limit}
          </label>
          <Slider
            value={[localSettings.word_limit]}
            onValueChange={(value) => setLocalSettings({ ...localSettings, word_limit: value[0] })}
            min={50}
            max={200}
            step={10}
            data-testid="ai-word-limit-slider"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Use Examples</label>
            <p className="text-xs text-slate-500">Include real-life examples in answers</p>
          </div>
          <Switch
            checked={localSettings.use_examples}
            onCheckedChange={(checked) => setLocalSettings({ ...localSettings, use_examples: checked })}
            data-testid="ai-examples-switch"
          />
        </div>

        <Button
          onClick={handleUpdate}
          className={`${
            isKidsMode
              ? 'bg-gradient-to-r from-[#3B82F6] to-[#10B981] rounded-2xl text-lg py-6'
              : 'bg-[#EA580C] hover:bg-[#C2410C]'
          } text-white w-full`}
          data-testid="update-ai-settings-btn"
        >
          {isKidsMode ? '💾 Save Settings' : 'Update Settings'}
        </Button>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
