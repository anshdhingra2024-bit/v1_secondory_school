import PageTemplate from '@/components/PageTemplate';

const PrePrimary = () => {
  return (
    <PageTemplate
      title="Pre-Primary"
      subtitle="Nurturing Young Minds"
      heroImage="https://images.pexels.com/photos/8363030/pexels-photo-8363030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      content={[
        "Our Pre-Primary section (Playschool, Nursery, LKG, and UKG) is designed to provide a warm, caring, and stimulating environment for our youngest learners. We understand that these formative years are crucial in a child's development.",
        "Through play-based learning, storytelling, art, music, and movement activities, we help children develop foundational skills in language, numeracy, and social interaction. Our colorful classrooms and child-friendly furniture create a welcoming space where children feel safe and excited to learn.",
        "Our experienced teachers focus on developing each child's motor skills, cognitive abilities, and emotional intelligence. We follow a structured yet flexible curriculum that encourages curiosity, creativity, and confidence in every child."
      ]}
      images={[
        {
          url: "https://images.pexels.com/photos/8363030/pexels-photo-8363030.jpeg?auto=compress&cs=tinysrgb&w=800",
          caption: "Colorful pre-primary classroom"
        }
      ]}
    />
  );
};

export default PrePrimary;