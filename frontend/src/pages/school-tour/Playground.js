import PageTemplate from '@/components/PageTemplate';

const Playground = () => {
  return (
    <PageTemplate
      title="Playground & Sports Facilities"
      subtitle="Where Champions Are Made"
      heroImage="https://images.pexels.com/photos/133623/pexels-photo-133623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      content={[
        "Our sprawling playground and sports facilities provide ample space for students to engage in physical activities and sports. We believe that sports and physical education are essential for the overall development of a child.",
        "The campus features dedicated areas for cricket, football, basketball, volleyball, and athletics. We have well-maintained courts for badminton and table tennis, along with an indoor sports complex for year-round activities. The playground equipment for younger students is designed with safety in mind.",
        "Our sports facilities are maintained by a dedicated team, and we have qualified coaches for various sports. Students receive professional training and participate in regular inter-house and inter-school competitions, developing both sportsmanship and competitive spirit."
      ]}
      images={[
        {
          url: "https://images.pexels.com/photos/133623/pexels-photo-133623.jpeg?auto=compress&cs=tinysrgb&w=800",
          caption: "School playground"
        },
        {
          url: "https://images.unsplash.com/photo-1630638208195-9a8d9510d855?crop=entropy&cs=srgb&fm=jpg&w=800&q=85",
          caption: "Students playing on playground"
        }
      ]}
    />
  );
};

export default Playground;