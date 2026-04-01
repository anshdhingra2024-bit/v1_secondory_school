import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Medal, Award, Star } from 'lucide-react';

const ResultsPage = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState('2025');

  const yearlyToppers = {
    '2025': [
      {
        name: "Aarav Sharma",
        class: "Class 12",
        percentage: "98.4%",
        photo: "https://i.pravatar.cc/150?img=12",
        subjects: "PCM + Computer Science",
        rank: "School Topper"
      },
      {
        name: "Diya Patel",
        class: "Class 10",
        percentage: "97.8%",
        photo: "https://i.pravatar.cc/150?img=5",
        subjects: "All Subjects",
        rank: "Perfect Score in Math"
      },
      {
        name: "Rohan Kumar",
        class: "Class 12",
        percentage: "96.5%",
        photo: "https://i.pravatar.cc/150?img=13",
        subjects: "PCB",
        rank: "Science Olympiad Gold"
      },
      {
        name: "Ananya Singh",
        class: "Class 10",
        percentage: "97.2%",
        photo: "https://i.pravatar.cc/150?img=9",
        subjects: "All Subjects",
        rank: "State Rank 12"
      },
      {
        name: "Kabir Malhotra",
        class: "Class 12",
        percentage: "95.8%",
        photo: "https://i.pravatar.cc/150?img=15",
        subjects: "Commerce",
        rank: "Commerce Stream Topper"
      },
      {
        name: "Ishita Verma",
        class: "Class 10",
        percentage: "96.1%",
        photo: "https://i.pravatar.cc/150?img=24",
        subjects: "All Subjects",
        rank: "District Rank 5"
      }
    ],
    '2024': [
      {
        name: "Vikram Singh",
        class: "Class 12",
        percentage: "97.2%",
        photo: "https://i.pravatar.cc/150?img=33",
        subjects: "PCM",
        rank: "School Topper 2024"
      },
      {
        name: "Sneha Kapoor",
        class: "Class 10",
        percentage: "96.5%",
        photo: "https://i.pravatar.cc/150?img=20",
        subjects: "All Subjects",
        rank: "School Topper 2024"
      }
    ],
    '2023': [
      {
        name: "Arjun Reddy",
        class: "Class 12",
        percentage: "96.8%",
        photo: "https://i.pravatar.cc/150?img=32",
        subjects: "PCB",
        rank: "School Topper 2023"
      },
      {
        name: "Neha Agarwal",
        class: "Class 10",
        percentage: "95.9%",
        photo: "https://i.pravatar.cc/150?img=25",
        subjects: "All Subjects",
        rank: "School Topper 2023"
      }
    ]
  };

  const achievements = [
    {
      title: "100% Pass Rate",
      description: "Consistent excellence in board examinations",
      icon: Trophy,
      color: "orange"
    },
    {
      title: "15+ State Toppers",
      description: "In the last 5 years",
      icon: Star,
      color: "blue"
    },
    {
      title: "50+ Olympiad Medals",
      description: "Gold, Silver & Bronze",
      icon: Medal,
      color: "purple"
    },
    {
      title: "Award Winning School",
      description: "Best School in District",
      icon: Award,
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-white rounded-full"
          data-testid="results-back-btn"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Results & Achievements
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Celebrating academic excellence and the bright minds of Modern Public School
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            const colorClasses = {
              orange: 'from-orange-500 to-orange-600',
              blue: 'from-blue-500 to-blue-600',
              purple: 'from-purple-500 to-purple-600',
              green: 'from-green-500 to-green-600'
            };
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 text-center"
                data-testid={`achievement-stat-${index}`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses[achievement.color]} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-slate-900 mb-2">{achievement.title}</h3>
                <p className="text-sm text-slate-600">{achievement.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mb-12">
          <div className="flex justify-center gap-3 flex-wrap">
            {Object.keys(yearlyToppers).map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                  selectedYear === year
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200'
                }`}
                data-testid={`year-btn-${year}`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={selectedYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-12">
            Hall of Fame {selectedYear}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {yearlyToppers[selectedYear].map((topper, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group"
                data-testid={`topper-card-${index}`}
              >
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <img
                      src={topper.photo}
                      alt={topper.name}
                      className="w-28 h-28 rounded-full mx-auto border-4 border-orange-100 shadow-lg"
                    />
                    {index === 0 && (
                      <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <Trophy className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-slate-900 mb-1">{topper.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{topper.class}</p>
                  <div className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-3">
                    {topper.percentage}
                  </div>
                  <p className="text-xs text-orange-600 font-bold uppercase tracking-wide mb-2">{topper.rank}</p>
                  <p className="text-sm text-slate-600">{topper.subjects}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white"
        >
          <h3 className="font-heading text-3xl font-bold mb-4">Want to Join Our Hall of Fame?</h3>
          <p className="text-lg mb-8 text-white/90">Apply now and be part of our legacy of excellence</p>
          <Button
            onClick={() => navigate('/admission')}
            className="bg-white text-blue-600 hover:bg-white/90 font-bold rounded-full px-10 py-4 text-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
            data-testid="apply-from-results-btn"
          >
            Apply for Admission
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;
