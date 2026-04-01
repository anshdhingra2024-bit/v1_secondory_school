import PageTemplate from '@/components/PageTemplate';

const AdmissionProcess = () => {
  return (
    <PageTemplate
      title="Admission Process"
      subtitle="Join the Modern Public School Family"
      heroImage="https://images.pexels.com/photos/5212329/pexels-photo-5212329.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    >
      <div className="space-y-8">
        <p className="text-lg leading-relaxed text-slate-700">
          We welcome admissions throughout the year based on seat availability. Our admission process is designed to be simple, transparent, and parent-friendly.
        </p>

        <div className="space-y-6">
          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">Step 1: Inquiry</h3>
            <p className="text-slate-700">Visit our school or contact us to inquire about admission availability for your child's class.</p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-6">
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">Step 2: Registration</h3>
            <p className="text-slate-700">Fill out the admission form online or collect it from the school office. Submit required documents along with the form.</p>
          </div>

          <div className="bg-purple-50 rounded-2xl p-6">
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">Step 3: Interaction/Assessment</h3>
            <p className="text-slate-700">For certain classes, we conduct a friendly interaction or assessment to understand the child's learning level.</p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6">
            <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">Step 4: Admission Confirmation</h3>
            <p className="text-slate-700">Upon selection, complete the admission formalities and fee payment to confirm your child's seat.</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-slate-900 rounded-2xl text-white text-center">
          <p className="mb-4">Ready to apply? Start your child's journey with us today!</p>
          <button
            onClick={() => window.location.href = '/admission'}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-8 py-3 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:scale-105 transition-all duration-300"
          >
            Apply Now
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default AdmissionProcess;