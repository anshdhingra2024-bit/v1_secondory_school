import PageTemplate from '@/components/PageTemplate';

const Primary = () => {
  return (
    <PageTemplate
      title="Primary (Classes 1-5)"
      subtitle="Building Strong Foundations"
      heroImage="https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      content={[
        "The Primary section (Classes 1 to 5) focuses on building strong academic foundations while nurturing creativity and critical thinking. Our curriculum is designed to make learning enjoyable and meaningful for young students.",
        "We emphasize core subjects like English, Mathematics, Science, Social Studies, and Languages, while also incorporating art, music, physical education, and computer science. Our teaching methodology combines traditional and modern approaches to cater to different learning styles.",
        "Regular assessments, interactive sessions, and hands-on activities ensure that students grasp concepts thoroughly. We also focus on developing good study habits, time management skills, and a positive attitude towards learning."
      ]}
      images={[
        {
          url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?crop=entropy&cs=srgb&fm=jpg&q=85",
          caption: "Primary students in classroom"
        },
        {
          url: "https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg?auto=compress&cs=tinysrgb&w=800",
          caption: "Interactive learning session"
        }
      ]}
    />
  );
};

export default Primary;