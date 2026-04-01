import PageTemplate from '@/components/PageTemplate';

const AboutUs = () => {
  return (
    <PageTemplate
      title="About Modern Public School"
      subtitle="Excellence in Education Since Establishment"
      heroImage="https://images.unsplash.com/photo-1770827401349-3499200c5e61?crop=entropy&cs=srgb&fm=jpg&q=85"
      content={[
        "Modern Public School, Ambala stands as a beacon of educational excellence, committed to nurturing young minds and shaping future leaders. Our institution combines traditional values with modern teaching methodologies to provide a holistic learning experience.",
        "With state-of-the-art infrastructure, dedicated faculty, and a student-centric approach, we have established ourselves as one of the leading educational institutions in the region. Our focus on both academic excellence and character development ensures that our students are well-prepared for the challenges of tomorrow.",
        "We believe in creating an environment where every student feels valued, supported, and encouraged to reach their full potential. Through innovative teaching methods, co-curricular activities, and personalized attention, we strive to make learning an enjoyable and enriching experience."
      ]}
      images={[
        {
          url: "https://images.unsplash.com/photo-1758270705639-9727f350f026?crop=entropy&cs=srgb&fm=jpg&q=85",
          caption: "Students engaged in collaborative learning"
        },
        {
          url: "https://images.pexels.com/photos/7406300/pexels-photo-7406300.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          caption: "Modern campus facilities"
        }
      ]}
    />
  );
};

export default AboutUs;