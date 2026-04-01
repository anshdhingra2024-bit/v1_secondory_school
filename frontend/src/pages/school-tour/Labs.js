import PageTemplate from '@/components/PageTemplate';

const Labs = () => {
  return (
    <PageTemplate
      title="Laboratories"
      subtitle="Where Theory Meets Practice"
      heroImage="https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      content={[
        "Modern Public School boasts state-of-the-art laboratories that provide students with hands-on experience and practical knowledge. Our well-equipped labs are designed to foster curiosity, experimentation, and scientific thinking.",
        "We have separate Physics, Chemistry, and Biology labs with modern equipment and safety measures. The Computer Labs feature the latest hardware and software, allowing students to learn programming, web development, and digital skills. Our Language Lab helps students improve their communication skills through interactive sessions.",
        "All laboratories are supervised by qualified lab assistants and teachers who guide students through experiments and ensure safety protocols are followed. Regular practical sessions complement classroom theory and enhance understanding of concepts."
      ]}
      images={[
        {
          url: "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=800",
          caption: "Science laboratory"
        },
        {
          url: "https://images.pexels.com/photos/5538573/pexels-photo-5538573.jpeg?auto=compress&cs=tinysrgb&w=800",
          caption: "Students in computer lab"
        }
      ]}
    />
  );
};

export default Labs;