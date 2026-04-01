import PageTemplate from '@/components/PageTemplate';

const Infrastructure = () => {
  return (
    <PageTemplate
      title="World-Class Infrastructure"
      subtitle="Modern Facilities for Holistic Development"
      heroImage="https://images.unsplash.com/photo-1770827401349-3499200c5e61?crop=entropy&cs=srgb&fm=jpg&q=85"
      content={[
        "Our campus spans across acres of lush greenery, providing a serene and conducive environment for learning. The infrastructure at Modern Public School has been meticulously designed to cater to the diverse needs of modern education.",
        "From spacious, well-ventilated classrooms equipped with smart boards to fully-equipped laboratories for science, computer, and language studies, we ensure that our students have access to the best facilities. Our library houses an extensive collection of books, journals, and digital resources.",
        "We also take pride in our sports facilities including playgrounds, indoor sports complex, and courts for various games. Our campus includes dedicated spaces for arts, music, dance, and other co-curricular activities, ensuring holistic development of every child."
      ]}
      images={[
        {
          url: "https://images.pexels.com/photos/7406300/pexels-photo-7406300.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          caption: "Modern campus building"
        },
        {
          url: "https://images.pexels.com/photos/133623/pexels-photo-133623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          caption: "Sports facilities"
        }
      ]}
    />
  );
};

export default Infrastructure;