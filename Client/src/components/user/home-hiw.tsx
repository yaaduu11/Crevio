import { CheckCircle, PenSquare, Search, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section className="w-full px-4 py-16 bg-gradient-to-b from-white via-[#e7feff] to-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">How Our Platform Works</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Get your projects done in four simple steps with our trusted freelancers
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="p-6 transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:shadow-xl hover:-translate-y-2"
            >
              <div className="flex items-center justify-center mx-auto mb-5 bg-blue-100 rounded-full w-14 h-14">
                {step.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-center text-gray-800">{step.title}</h3>
              <p className="text-center text-gray-600">{step.description}</p>
              <div className="mt-5 text-center">
                <span className="inline-block px-4 py-1 text-sm font-medium text-teal-800 bg-teal-100 rounded-full">
                  Step {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const steps = [
  {
    title: "Post a Project",
    description: "Describe your project and receive competitive bids from our talented freelancers within minutes.",
    icon: <PenSquare className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Find Talent",
    description: "Browse profiles, reviews, and portfolios to find the perfect match for your project needs.",
    icon: <Search className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Collaborate Easily",
    description: "Use our secure workspace to communicate, share files, and track progress in real-time.",
    icon: <CheckCircle className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Pay Securely",
    description: "Only release payment when you're completely satisfied with the delivered work.",
    icon: <TrendingUp className="w-6 h-6 text-blue-600" />
  }
];

export default HowItWorks;