import PageTemplate from '@/components/PageTemplate';

const ClubsActivities = () => {
  return (
    <PageTemplate
      title="Clubs & Activities"
      subtitle="Explore Your Interests"
      heroImage="https://images.pexels.com/photos/8363083/pexels-photo-8363083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      content={[
        "Our school offers a vibrant array of clubs and activities that cater to diverse interests and talents. Students can choose from Science Club, Math Club, Literary Club, Eco Club, Robotics Club, Photography Club, and many more.",
        "Each club is mentored by experienced teachers and provides a platform for students to pursue their passions, learn new skills, and collaborate with like-minded peers. Club activities include workshops, competitions, exhibitions, and community projects.",
        "Participation in clubs helps students develop leadership qualities, teamwork skills, and a sense of responsibility. It also provides opportunities for students to showcase their talents and achievements at school and inter-school events."
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-blue-50 rounded-2xl p-6 text-center">
          <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">Science & Tech Clubs</h3>
          <p className="text-sm text-slate-600">Science, Robotics, Coding</p>
        </div>
        <div className="bg-orange-50 rounded-2xl p-6 text-center">
          <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">Creative Clubs</h3>
          <p className="text-sm text-slate-600">Art, Music, Drama, Photography</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-6 text-center">
          <h3 className="font-heading text-lg font-bold text-slate-900 mb-2">Social Clubs</h3>
          <p className="text-sm text-slate-600">Eco Club, Community Service</p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ClubsActivities;