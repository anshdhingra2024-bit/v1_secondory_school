import PageTemplate from '@/components/PageTemplate';

const Documents = () => {
  return (
    <PageTemplate
      title="Documents Required"
      subtitle="Admission Documentation"
      heroImage="https://images.pexels.com/photos/261706/pexels-photo-261706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      content={[
        "To ensure a smooth admission process, please prepare the following documents in advance. All documents should be submitted in original along with one set of photocopies."
      ]}
    >
      <div className="space-y-6 mt-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">Required Documents:</h3>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Birth Certificate (Original + 2 photocopies)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Transfer Certificate from previous school (for Classes 1 and above)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Progress Report/Mark Sheets of previous class</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Aadhar Card of student (photocopy)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Passport size photographs (4 copies)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Address Proof (any government-issued document)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Caste Certificate (if applicable)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Medical Fitness Certificate</span>
            </li>
          </ul>
        </div>

        <div className="bg-orange-50 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-bold text-slate-900 mb-3">Important Notes:</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• All documents must be attested by a Gazetted Officer or School Principal</li>
            <li>• For classes 11 and 12, original mark sheet of Class 10 is mandatory</li>
            <li>• Documents once submitted will not be returned</li>
          </ul>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Documents;