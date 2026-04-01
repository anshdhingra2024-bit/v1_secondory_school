import PageTemplate from '@/components/PageTemplate';

const MiddleSchool = () => {
  return (
    <PageTemplate
      title="Middle School (Classes 6-8)"
      subtitle="Developing Critical Thinkers"
      heroImage="https://images.pexels.com/photos/5211446/pexels-photo-5211446.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      content={[
        "The Middle School section (Classes 6 to 8) is a crucial phase where students transition from childhood to adolescence. Our curriculum is designed to challenge students intellectually while supporting their social and emotional development.",
        "We offer a comprehensive CBSE curriculum covering English, Mathematics, Science, Social Science, Languages, and Computer Science. Our focus is on developing analytical skills, problem-solving abilities, and independent thinking. Students are encouraged to ask questions, explore concepts, and engage in project-based learning.",
        "We also emphasize value education, life skills, and career guidance during these years. Regular parent-teacher meetings, personalized attention, and a supportive environment ensure that every student thrives academically and personally."
      ]}
      images={[
        {
          url: "https://images.pexels.com/photos/5211446/pexels-photo-5211446.jpeg?auto=compress&cs=tinysrgb&w=800",
          caption: "Middle school students engaged in learning"
        }
      ]}
    />
  );
};

export default MiddleSchool;