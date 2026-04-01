import PageTemplate from '@/components/PageTemplate';

const VisionMission = () => {
  return (
    <PageTemplate
      title="Vision & Mission"
      subtitle="Guiding Principles That Drive Our Excellence"
      heroImage="https://images.pexels.com/photos/247823/pexels-photo-247823.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    >
      <div className="space-y-12">
        <div className="bg-blue-50 rounded-3xl p-8 md:p-12">
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6">Our Vision</h2>
          <p className="text-lg leading-relaxed text-slate-700">
            To be a center of educational excellence that nurtures creative, compassionate, and confident global citizens who are equipped with 21st-century skills and values to make a positive impact on society.
          </p>
        </div>

        <div className="bg-orange-50 rounded-3xl p-8 md:p-12">
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
          <ul className="space-y-4 text-lg text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-orange-500 font-bold text-2xl">•</span>
              <span>Provide quality education that promotes academic excellence and holistic development</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 font-bold text-2xl">•</span>
              <span>Foster critical thinking, creativity, and innovation through modern teaching methodologies</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 font-bold text-2xl">•</span>
              <span>Cultivate values of integrity, respect, and social responsibility in every student</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500 font-bold text-2xl">•</span>
              <span>Create a safe, inclusive, and supportive learning environment for all</span>
            </li>
          </ul>
        </div>
      </div>
    </PageTemplate>
  );
};

export default VisionMission;