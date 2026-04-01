import PageTemplate from '@/components/PageTemplate';

const FeeStructure = () => {
  return (
    <PageTemplate
      title="Fee Structure"
      subtitle="Transparent and Affordable Education"
      heroImage="https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      content={[
        "At Modern Public School, we believe in providing quality education at affordable fees. Our fee structure is designed to be transparent and competitive, ensuring value for money while maintaining high educational standards.",
        "The fee structure covers tuition, infrastructure maintenance, library, laboratory, sports, and co-curricular activities. Additional charges may apply for optional services like transportation, special coaching, and extracurricular classes."
      ]}
    >
      <div className="mt-12 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
          <div className="bg-blue-600 text-white px-6 py-4">
            <h3 className="font-heading text-xl font-bold">Annual Fee Structure (2025-26)</h3>
          </div>
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 font-bold text-slate-900">Class</th>
                  <th className="text-right py-3 font-bold text-slate-900">Annual Fee</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-3">Playschool - UKG</td>
                  <td className="text-right py-3 font-semibold text-blue-600">₹15,000 - ₹20,000</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="py-3">Class 1 - 5</td>
                  <td className="text-right py-3 font-semibold text-blue-600">₹25,000 - ₹30,000</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-3">Class 6 - 8</td>
                  <td className="text-right py-3 font-semibold text-blue-600">₹35,000 - ₹38,000</td>
                </tr>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <td className="py-3">Class 9 - 10</td>
                  <td className="text-right py-3 font-semibold text-blue-600">₹40,000 - ₹42,000</td>
                </tr>
                <tr>
                  <td className="py-3">Class 11 - 12</td>
                  <td className="text-right py-3 font-semibold text-blue-600">₹43,000 - ₹45,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-2xl p-6">
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-3">Payment Options:</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Annual payment (with 5% discount)</li>
              <li>• Quarterly installments</li>
              <li>• Online payment accepted</li>
            </ul>
          </div>

          <div className="bg-orange-50 rounded-2xl p-6">
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-3">Scholarships:</h3>
            <ul className="space-y-2 text-slate-700">
              <li>• Merit-based scholarships</li>
              <li>• Financial assistance available</li>
              <li>• Sports quota benefits</li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-100 rounded-2xl p-6 text-sm text-slate-600">
          <p><strong>Note:</strong> Fee structure is subject to revision. For detailed and updated information, please contact the school office or visit during office hours.</p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default FeeStructure;