import PageTemplate from '@/components/PageTemplate';

const Campus = () => {
  return (
    <PageTemplate
      title="Campus Tour"
      subtitle="Explore Our Beautiful Campus"
      heroImage="https://images.pexels.com/photos/247823/pexels-photo-247823.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      content={[
        "Welcome to the Modern Public School campus, a sprawling educational haven designed to provide the perfect environment for learning and growth. Our campus spans across acres of lush greenery, combining modern architecture with natural beauty.",
        "The campus features well-planned buildings with spacious corridors, adequate ventilation, and natural lighting. We have separate blocks for different sections—pre-primary, primary, and senior—ensuring age-appropriate infrastructure and facilities for all students.",
        "Safety and security are our top priorities. The campus is equipped with CCTV surveillance, secure entry and exit points, and trained security personnel. We also have a medical room with qualified staff to handle any health emergencies."
      ]}
      images={[
        {
          url: "https://images.pexels.com/photos/247823/pexels-photo-247823.jpeg?auto=compress&cs=tinysrgb&w=800",
          caption: "Modern campus building"
        },
        {
          url: "https://images.pexels.com/photos/7406300/pexels-photo-7406300.jpeg?auto=compress&cs=tinysrgb&w=800",
          caption: "Green campus environment"
        }
      ]}
    />
  );
};

export default Campus;