import PageTemplate from '@/components/PageTemplate';

const BeyondBooks = () => {
  return (
    <PageTemplate
      title="Beyond Books"
      subtitle="Holistic Development Through Diverse Activities"
      heroImage="https://images.pexels.com/photos/8613320/pexels-photo-8613320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      content={[
        "At Modern Public School, we believe that education extends far beyond textbooks and classrooms. Our 'Beyond Books' program encompasses a wide range of activities designed to nurture creativity, develop life skills, and promote holistic development.",
        "Students participate in art and craft, music and dance, drama and theater, public speaking, debate competitions, and various creative workshops. These activities help students discover their passions, build confidence, and develop essential soft skills.",
        "We also organize educational tours, field trips, and cultural exchanges that broaden students' horizons and provide real-world learning experiences. Our commitment to holistic education ensures that students grow not just academically, but also socially, emotionally, and creatively."
      ]}
      images={[
        {
          url: "https://images.pexels.com/photos/8613320/pexels-photo-8613320.jpeg?auto=compress&cs=tinysrgb&w=800",
          caption: "Students engaged in creative activities"
        }
      ]}
    />
  );
};

export default BeyondBooks;