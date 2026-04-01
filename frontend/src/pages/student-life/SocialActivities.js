import PageTemplate from '@/components/PageTemplate';

const SocialActivities = () => {
  return (
    <PageTemplate
      title="Social Activities"
      subtitle="Building Responsible Citizens"
      heroImage="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      content={[
        "We believe in nurturing socially responsible citizens who care about their community and environment. Our social activities program encourages students to contribute positively to society through various initiatives and projects.",
        "Students participate in community service projects, environmental conservation drives, charity events, and awareness campaigns on important social issues. Our Eco Club actively works on waste management, tree plantation, and promoting sustainable practices within and outside the school campus.",
        "Through these activities, students learn the values of empathy, compassion, and civic responsibility. They understand the importance of giving back to society and develop a sense of social consciousness that stays with them throughout their lives."
      ]}
      images={[
        {
          url: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800",
          caption: "Students engaged in community service"
        }
      ]}
    />
  );
};

export default SocialActivities;