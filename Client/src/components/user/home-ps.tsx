import React, { useEffect, useRef } from 'react';
import { Users, Briefcase, Globe, Award } from 'lucide-react';

const PlatformStats: React.FC = () => {
  const countersRef = useRef<HTMLDivElement>(null);
  const animatedNumbers = useRef<{[key: string]: boolean}>({});
  
  const animateValue = (element: HTMLElement, start: number, end: number, duration: number) => {
    if (animatedNumbers.current[element.id]) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      
      // Format the number with commas
      element.innerHTML = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        animatedNumbers.current[element.id] = true;
      }
    };
    
    window.requestAnimationFrame(step);
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-counter]');
            counters.forEach((counter) => {
              if (counter instanceof HTMLElement) {
                const target = parseInt(counter.getAttribute('data-counter') || '0', 10);
                animateValue(counter, 0, target, 2000);
              }
            });
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (countersRef.current) {
      observer.observe(countersRef.current);
    }
    
    return () => {
      if (countersRef.current) {
        observer.unobserve(countersRef.current);
      }
    };
  }, []);

  return (
    <section className="w-full px-4 py-16 bg-gradient-to-b from-white via-[#e7feff] to-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">Our Growing Community</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Join thousands of clients and freelancers creating success stories every day
          </p>
        </div>
        
        <div 
          ref={countersRef}
          className="grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="p-6 transition-all duration-300 bg-white border border-gray-100 shadow-md rounded-xl hover:shadow-lg"
            >
              <div className="flex items-center justify-center mx-auto mb-4 rounded-lg w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50">
                {stat.icon}
              </div>
              <h3 
                id={`counter-${index}`}
                data-counter={stat.value}
                className="mb-2 text-3xl font-bold text-center text-gray-800 md:text-4xl"
              >
                0
              </h3>
              <p className="text-center text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
            {achievements.map((achievement, index) => (
                <div 
                key={index}
                className="p-6 bg-black border border-black rounded-xl"
                >
                <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 mr-4 bg-white rounded-full bg-opacity-10">
                    <Award className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{achievement.title}</h3>
                </div>
                <p className="text-white text-opacity-90">{achievement.description}</p>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

const stats = [
  {
    value: 125000,
    label: "Freelancers",
    icon: <Users className="w-6 h-6 text-blue-600" />
  },
  {
    value: 85000,
    label: "Clients",
    icon: <Briefcase className="w-6 h-6 text-blue-600" />
  },
  {
    value: 250000,
    label: "Projects Completed",
    icon: <Award className="w-6 h-6 text-blue-600" />
  },
  {
    value: 110,
    label: "Countries",
    icon: <Globe className="w-6 h-6 text-blue-600" />
  }
];

const achievements = [
  {
    title: "Client Satisfaction",
    description: "97% of clients rate their experience as excellent, with an average rating of 4.8/5 stars across all completed projects."
  },
  {
    title: "Fast Response Time",
    description: "Projects receive their first qualified proposal within an average of just 30 minutes after posting."
  },
  {
    title: "Secure Payments",
    description: "Over $500 million securely processed through our platform with our escrow payment protection system."
  }
];

export default PlatformStats;