import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Sparkles, BookOpen, Lightbulb } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomeworkHelperPage = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer('');

    try {
      const response = await axios.post(`${API}/homework`, {
        question: question
      });

      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Homework helper error:', error);
      toast.error('Failed to get answer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setQuestion('');
    setAnswer('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 hover:bg-white rounded-full"
          data-testid="homework-back-btn"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
            AI Homework Helper
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Ask me any question and I'll help you understand it better!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.12)] border border-slate-100 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                Ask Your Question
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  What would you like to learn?
                </label>
                <Textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question here... For example: 'What is photosynthesis?' or 'How do we add fractions?'"
                  rows={8}
                  className="text-base rounded-xl border-slate-200"
                  required
                  data-testid="homework-question-input"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isLoading || !question.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-full px-8 py-6 text-lg shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-105 transition-all duration-300"
                  data-testid="get-answer-btn"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Thinking...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Get Answer
                    </>
                  )}
                </Button>
                {answer && (
                  <Button
                    type="button"
                    onClick={handleClear}
                    variant="outline"
                    className="px-6 py-6 rounded-full border-2"
                    data-testid="clear-btn"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.12)] border border-slate-100 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-slate-900">
                Your Answer
              </h2>
            </div>

            <div
              className="bg-white rounded-2xl p-6 min-h-[300px] text-slate-800 leading-relaxed"
              data-testid="homework-answer-display"
            >
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-500 animate-pulse">AI is thinking about your question...</p>
                </div>
              ) : answer ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-base leading-relaxed whitespace-pre-wrap"
                >
                  {answer}
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-center">
                  <div>
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Ask a question and I'll help you learn!</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.12)] border border-slate-100 p-8"
        >
          <h3 className="font-heading text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-orange-500" />
            Tips for better answers:
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Be specific with your questions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Ask one question at a time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Include the subject or topic if needed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Feel free to ask follow-up questions!</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeworkHelperPage;