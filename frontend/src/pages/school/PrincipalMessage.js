import PageTemplate from '@/components/PageTemplate';

const PrincipalMessage = () => {
  return (
    <PageTemplate
      title="Principal's Message"
      subtitle="A Word from Our Principal"
      heroImage="https://images.pexels.com/photos/5211446/pexels-photo-5211446.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    >
      <div className="bg-white rounded-3xl border border-slate-100 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src="https://i.pravatar.cc/200?img=60"
            alt="Principal"
            className="w-32 h-32 rounded-2xl shadow-lg"
          />
          <div className="flex-1">
            <p className="text-lg leading-relaxed text-slate-700 mb-6">
              Dear Parents, Students, and Well-wishers,
            </p>
            <p className="text-lg leading-relaxed text-slate-700 mb-6">
              It is with immense pride and joy that I welcome you to Modern Public School, Ambala. As the Principal of this esteemed institution, I am honored to lead a team of dedicated educators who are committed to providing the highest quality education to our students.
            </p>
            <p className="text-lg leading-relaxed text-slate-700 mb-6">
              In today's rapidly changing world, education is not just about academic excellence—it's about preparing students to become lifelong learners, critical thinkers, and responsible global citizens. At Modern Public School, we strive to create an environment where every child is encouraged to explore their potential, develop their talents, and build strong character.
            </p>
            <p className="text-lg leading-relaxed text-slate-700 mb-6">
              Our AI-powered learning tools, modern infrastructure, and innovative teaching methodologies ensure that our students receive education that prepares them for the challenges and opportunities of the 21st century. We believe in nurturing not just the minds, but also the hearts of our students.
            </p>
            <p className="text-lg leading-relaxed text-slate-700 mb-6">
              I invite you to join us in this journey of educational excellence and holistic development. Together, we can shape a brighter future for our children.
            </p>
            <p className="text-lg font-semibold text-slate-900">
              Warm regards,<br />
              Dr. Rajesh Sharma<br />
              <span className="text-sm text-slate-600">Principal, Modern Public School</span>
            </p>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PrincipalMessage;