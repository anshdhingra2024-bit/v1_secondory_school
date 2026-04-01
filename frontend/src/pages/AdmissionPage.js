import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdmissionPage = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [formData, setFormData] = useState({
    student_name: '',
    class_applying: '',
    parent_name: '',
    phone_number: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWhatsappNumber = async () => {
      try {
        const response = await axios.get(`${API}/whatsapp-number`);
        setWhatsappNumber(response.data.number);
      } catch (error) {
        console.error('Error fetching WhatsApp number:', error);
      }
    };
    fetchWhatsappNumber();
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${API}/admission`, formData);
      setIsSubmitted(true);
      toast.success('Application submitted successfully!');
    } catch (error) {
      console.error('Admission submission error:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      `Hello! I have submitted an admission application for ${formData.student_name} for ${formData.class_applying}. Looking forward to hearing from you.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.12)] p-10 text-center border border-slate-100"
          data-testid="admission-success-message"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-14 h-14 text-green-600" />
            </div>
          </motion.div>
          <h2 className="font-heading text-4xl font-bold text-slate-900 mb-4">
            Application Submitted!
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Thank you for applying to Modern Public School. We will review your application and contact you soon.
          </p>
          <div className="space-y-3">
            <Button
              onClick={handleWhatsAppRedirect}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold rounded-full px-8 py-6 text-lg shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)] hover:scale-105 transition-all duration-300"
              data-testid="whatsapp-redirect-btn"
            >
              Contact us on WhatsApp
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full rounded-full py-6 text-lg border-2"
              data-testid="back-home-btn"
            >
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-white rounded-full"
          data-testid="back-btn"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.12)] border border-slate-100 p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-6">
              <Sparkles className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Admission Application
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Fill out the form below to apply for admission at Modern Public School, Ambala
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Student Name <span className="text-orange-500">*</span>
              </label>
              <Input
                value={formData.student_name}
                onChange={(e) => handleChange('student_name', e.target.value)}
                placeholder="Enter student's full name"
                className="h-12 rounded-xl border-slate-200"
                required
                data-testid="student-name-input"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Class Applying For <span className="text-orange-500">*</span>
              </label>
              <Select value={formData.class_applying} onValueChange={(value) => handleChange('class_applying', value)} required>
                <SelectTrigger className="h-12 rounded-xl" data-testid="class-select">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Playschool">Playschool</SelectItem>
                  <SelectItem value="Nursery">Nursery</SelectItem>
                  <SelectItem value="LKG">LKG</SelectItem>
                  <SelectItem value="UKG">UKG</SelectItem>
                  <SelectItem value="Class 1">Class 1</SelectItem>
                  <SelectItem value="Class 2">Class 2</SelectItem>
                  <SelectItem value="Class 3">Class 3</SelectItem>
                  <SelectItem value="Class 4">Class 4</SelectItem>
                  <SelectItem value="Class 5">Class 5</SelectItem>
                  <SelectItem value="Class 6">Class 6</SelectItem>
                  <SelectItem value="Class 7">Class 7</SelectItem>
                  <SelectItem value="Class 8">Class 8</SelectItem>
                  <SelectItem value="Class 9">Class 9</SelectItem>
                  <SelectItem value="Class 10">Class 10</SelectItem>
                  <SelectItem value="Class 11">Class 11</SelectItem>
                  <SelectItem value="Class 12">Class 12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Parent/Guardian Name <span className="text-orange-500">*</span>
              </label>
              <Input
                value={formData.parent_name}
                onChange={(e) => handleChange('parent_name', e.target.value)}
                placeholder="Enter parent/guardian name"
                className="h-12 rounded-xl border-slate-200"
                required
                data-testid="parent-name-input"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Phone Number <span className="text-orange-500">*</span>
              </label>
              <Input
                type="tel"
                value={formData.phone_number}
                onChange={(e) => handleChange('phone_number', e.target.value)}
                placeholder="Enter contact number"
                className="h-12 rounded-xl border-slate-200"
                required
                data-testid="phone-number-input"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                Address <span className="text-orange-500">*</span>
              </label>
              <Textarea
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Enter complete address"
                rows={4}
                className="rounded-xl border-slate-200"
                required
                data-testid="address-input"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-8 py-6 text-lg shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:scale-105 transition-all duration-300"
              data-testid="submit-admission-btn"
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdmissionPage;