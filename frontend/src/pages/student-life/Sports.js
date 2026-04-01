import PageTemplate from '@/components/PageTemplate';

const Sports = () => {
  return (
    <PageTemplate
      title="Sports & Physical Education"
      subtitle="Building Champions On and Off the Field"
      heroImage="https://images.unsplash.com/photo-1733648213151-54ff57977151?crop=entropy&cs=srgb&fm=jpg&q=85"
      content={[
        "Physical education and sports are integral to our curriculum. We believe that sports not only promote physical fitness but also teach discipline, teamwork, and perseverance. Our extensive sports facilities include playgrounds, courts, and indoor spaces for various games.",
        "Students can participate in cricket, football, basketball, volleyball, badminton, table tennis, athletics, and more. We have dedicated coaches for each sport who train students from beginner to competitive levels. Regular practice sessions, inter-house competitions, and participation in inter-school tournaments provide ample opportunities for students to excel.",
        "Our students have won numerous awards and medals at district, state, and national level competitions. We take pride in nurturing not just academic achievers, but also sporting champions who embody the spirit of sportsmanship and fair play."
      ]}
      images={[
        {
          url: "https://images.pexels.com/photos/133623/pexels-photo-133623.jpeg?auto=compress&cs=tinysrgb&w=800",
          caption: "Sports facilities and playground"
        },
        {
          url: "https://images.unsplash.com/photo-1733648213151-54ff57977151?crop=entropy&cs=srgb&fm=jpg&w=800&q=85",
          caption: "Students playing sports"
        }
      ]}
    />
  );
};

export default Sports;