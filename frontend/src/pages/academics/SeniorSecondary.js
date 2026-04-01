import PageTemplate from '@/components/PageTemplate';

const SeniorSecondary = () => {
  return (
    <PageTemplate
      title="Senior Secondary (Classes 9-12)"
      subtitle="Preparing for the Future"
      heroImage="https://images.unsplash.com/photo-1758270705639-9727f350f026?crop=entropy&cs=srgb&fm=jpg&q=85"
      content={[
        "Our Senior Secondary section (Classes 9 to 12) prepares students for board examinations and their future careers. We offer three streams: Science (PCM/PCB), Commerce, and Humanities, allowing students to choose subjects aligned with their interests and career goals.",
        "Our experienced faculty provides rigorous academic training, regular practice sessions, and comprehensive test series to ensure excellent board results. We also offer career counseling, college admission guidance, and coaching for competitive examinations.",
        "Beyond academics, we focus on developing leadership skills, communication abilities, and professional etiquette. Our students have consistently achieved outstanding results in Class 10 and 12 board examinations, with many securing admission to premier colleges and universities."
      ]}
      images={[
        {
          url: "https://images.unsplash.com/photo-1758270705639-9727f350f026?crop=entropy&cs=srgb&fm=jpg&w=800&q=85",
          caption: "Senior students in focused study"
        },
        {
          url: "https://images.pexels.com/photos/5538573/pexels-photo-5538573.jpeg?auto=compress&cs=tinysrgb&w=800",
          caption: "Laboratory practical session"
        }
      ]}
    />
  );
};

export default SeniorSecondary;