import PageTemplate from '@/components/PageTemplate';

const Classrooms = () => {
  return (
    <PageTemplate
      title="Smart Classrooms"
      subtitle="Technology-Enabled Learning Spaces"
      heroImage="https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      content={[
        "Our classrooms are designed to create an optimal learning environment. Each classroom is spacious, well-ventilated, and equipped with ergonomic furniture suitable for the age group. Adequate natural light and artificial lighting ensure comfort throughout the day.",
        "All classrooms from primary level onwards are equipped with smart boards and multimedia projectors, transforming them into interactive learning spaces. Teachers use digital content, videos, animations, and presentations to make lessons more engaging and effective.",
        "The classrooms also feature display boards for student work, learning corners with educational materials, and storage facilities. For pre-primary students, classrooms are specially designed with colorful decor, play areas, and age-appropriate learning materials."
      ]}
      images={[
        {
          url: "https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg?auto=compress&cs=tinysrgb&w=800",
          caption: "Smart classroom with interactive board"
        }
      ]}
    />
  );
};

export default Classrooms;