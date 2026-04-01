import PageTemplate from '@/components/PageTemplate';

const Eligibility = () => {
  return (
    <PageTemplate
      title="Eligibility Criteria"
      subtitle="Admission Requirements"
      heroImage="https://images.pexels.com/photos/5211446/pexels-photo-5211446.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      content={[
        "Admission to Modern Public School is open to all students who meet the age criteria as prescribed by CBSE for their respective classes. We follow a fair and transparent admission policy without any discrimination based on caste, creed, or religion.",
        "For Pre-Primary sections (Playschool, Nursery, LKG, UKG), age criteria as on March 31st of the admission year is considered. For Classes 1 to 12, students should have completed the previous class from a recognized school.",
        "Transfer students are required to submit a Transfer Certificate from their previous school. Students seeking admission to Classes 11 and 12 must have passed Class 10 with the required percentage and subject criteria for their chosen stream."
      ]}
    >
      <div className="mt-12 overflow-x-auto">
        <table className="w-full bg-white rounded-2xl overflow-hidden shadow-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-bold">Class</th>
              <th className="px-6 py-4 text-left font-bold">Age Requirement</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-4">Playschool</td>
              <td className="px-6 py-4">2+ years</td>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50">
              <td className="px-6 py-4">Nursery</td>
              <td className="px-6 py-4">3+ years</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-4">LKG</td>
              <td className="px-6 py-4">4+ years</td>
            </tr>
            <tr className="border-b border-slate-100 bg-slate-50">
              <td className="px-6 py-4">UKG</td>
              <td className="px-6 py-4">5+ years</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-4">Class 1</td>
              <td className="px-6 py-4">6+ years</td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageTemplate>
  );
};

export default Eligibility;