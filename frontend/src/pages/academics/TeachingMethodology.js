import PageTemplate from '@/components/PageTemplate';

const TeachingMethodology = () => {
  return (
    <PageTemplate
      title="Teaching Methodology"
      subtitle="Innovative Approaches to Learning"
      heroImage="https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    >
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-slate-700">
          At Modern Public School, we believe that effective teaching goes beyond textbooks. Our methodology combines traditional wisdom with modern pedagogical approaches to create a dynamic and engaging learning experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">Smart Classrooms</h3>
            <p className="text-slate-700">Interactive whiteboards and multimedia presentations make learning visual and engaging.</p>
          </div>
          <div className="bg-orange-50 rounded-2xl p-6">
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">Project-Based Learning</h3>
            <p className="text-slate-700">Students work on real-world projects that develop critical thinking and problem-solving skills.</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-6">
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">AI-Powered Tools</h3>
            <p className="text-slate-700">Our AI homework helper and adaptive learning platforms personalize education for each student.</p>
          </div>
          <div className="bg-green-50 rounded-2xl p-6">
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">Experiential Learning</h3>
            <p className="text-slate-700">Field trips, lab experiments, and hands-on activities bring concepts to life.</p>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-slate-700">
          We also emphasize collaborative learning, peer teaching, and individual attention to ensure that every student receives the support they need to excel.
        </p>
      </div>
    </PageTemplate>
  );
};

export default TeachingMethodology;