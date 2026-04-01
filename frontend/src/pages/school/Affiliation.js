import PageTemplate from '@/components/PageTemplate';

const Affiliation = () => {
  return (
    <PageTemplate
      title="Affiliation & Recognition"
      subtitle="Accredited Excellence"
      heroImage="https://images.pexels.com/photos/247823/pexels-photo-247823.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      content={[
        "Modern Public School, Ambala is affiliated with the Central Board of Secondary Education (CBSE), New Delhi, one of India's most prestigious educational boards. Our affiliation number ensures that we maintain the highest standards of education as prescribed by the board.",
        "We are recognized by the Department of Education, Government of Haryana, and comply with all statutory requirements for running an educational institution. Our school follows the CBSE curriculum from pre-primary to senior secondary levels, ensuring a structured and comprehensive learning experience.",
        "Our affiliation with CBSE enables our students to appear for board examinations in Classes 10 and 12, which are recognized nationally and internationally. We take pride in consistently achieving excellent results in board examinations."
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-blue-50 rounded-3xl p-8">
          <h3 className="font-heading text-2xl font-bold text-slate-900 mb-4">CBSE Affiliation</h3>
          <p className="text-slate-700 mb-2"><strong>Board:</strong> Central Board of Secondary Education</p>
          <p className="text-slate-700 mb-2"><strong>Affiliation No:</strong> XXXX-XXXX</p>
          <p className="text-slate-700"><strong>School Code:</strong> XXXXX</p>
        </div>
        <div className="bg-orange-50 rounded-3xl p-8">
          <h3 className="font-heading text-2xl font-bold text-slate-900 mb-4">Recognition</h3>
          <p className="text-slate-700 mb-2">Department of Education, Haryana</p>
          <p className="text-slate-700 mb-2">ISO 9001:2015 Certified</p>
          <p className="text-slate-700">Member of various educational forums</p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Affiliation;