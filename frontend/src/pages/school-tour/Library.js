import PageTemplate from '@/components/PageTemplate';

const Library = () => {
  return (
    <PageTemplate
      title="Library"
      subtitle="A Treasure House of Knowledge"
      heroImage="https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      content={[
        "Our school library is a vibrant learning resource center that houses an extensive collection of books, journals, magazines, and digital resources. It serves as a quiet sanctuary for reading, research, and self-study.",
        "The library collection includes fiction and non-fiction books, reference materials, encyclopedias, newspapers, and periodicals across various subjects and languages. We also provide access to e-books and online educational databases to support digital learning.",
        "The library is managed by qualified librarians who assist students in finding resources and developing research skills. Regular library periods are scheduled for all classes, and students are encouraged to develop a habit of reading. We also organize book fairs, author visits, and reading competitions to promote a culture of reading."
      ]}
      images={[
        {
          url: "https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=800",
          caption: "Well-stocked library"
        }
      ]}
    />
  );
};

export default Library;