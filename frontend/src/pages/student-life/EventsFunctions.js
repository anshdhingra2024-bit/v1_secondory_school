import PageTemplate from '@/components/PageTemplate';

const EventsFunctions = () => {
  return (
    <PageTemplate
      title="Events & Functions"
      subtitle="Celebrating Together"
      heroImage="https://images.pexels.com/photos/8613320/pexels-photo-8613320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      content={[
        "Throughout the academic year, we organize a variety of events and functions that bring our school community together. These celebrations add color and joy to school life while promoting cultural awareness and social bonding.",
        "Our major events include Annual Day, Sports Day, Cultural Fest, Science Exhibition, Literary Fest, and celebration of national festivals like Independence Day, Republic Day, and Gandhi Jayanti. We also observe important days like Teachers' Day, Children's Day, and Environment Day.",
        "These events provide students with platforms to showcase their talents in dance, music, drama, art, and public speaking. Participation in organizing and managing events also helps students develop organizational skills, leadership qualities, and confidence."
      ]}
      images={[
        {
          url: "https://images.pexels.com/photos/8613320/pexels-photo-8613320.jpeg?auto=compress&cs=tinysrgb&w=800",
          caption: "Annual day celebration"
        }
      ]}
    />
  );
};

export default EventsFunctions;