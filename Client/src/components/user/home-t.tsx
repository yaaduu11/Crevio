import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="w-full px-4 py-16 text-black bg-gradient-to-b from-white via-[#e3ffe3] to-white">
    <div className="max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Success Stories</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          Hear from clients and freelancers who've achieved amazing results
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-full px-4">
                <div className="p-8 shadow-xl bg-white/70 backdrop-blur-sm rounded-2xl md:p-10">
                  <div className="flex flex-col gap-6 md:flex-row md:gap-10">
                    <div className="md:w-1/3">
                      <div className="relative w-24 h-24 mx-auto overflow-hidden border-4 border-green-400 rounded-full md:w-32 md:h-32 md:mx-0">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="mt-4 text-center md:text-left">
                        <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                        <p className="text-gray-800">{testimonial.role}</p>
                        <div className="flex justify-center mt-2 md:justify-start">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="w-5 h-5" 
                              fill={i < testimonial.stars ? "#FFD700" : "none"} 
                              color={i < testimonial.stars ? "#FFD700" : "#A0AEC0"}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3">
                      <blockquote className="mb-6 text-lg italic text-gray-800 md:text-xl">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex flex-wrap gap-3">
                        {testimonial.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 text-xs bg-green-200 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="mt-6 text-sm text-gray-700">{testimonial.project}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={goToPrevious}
          className="absolute flex items-center justify-center w-10 h-10 transition-colors duration-300 -translate-y-1/2 bg-green-300 rounded-full shadow-lg left-2 top-1/2 hover:bg-green-400 focus:outline-none"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>

        <button 
          onClick={goToNext}
          className="absolute flex items-center justify-center w-10 h-10 transition-colors duration-300 -translate-y-1/2 bg-green-300 rounded-full shadow-lg right-2 top-1/2 hover:bg-green-400 focus:outline-none"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-green-600' : 'bg-green-300 hover:bg-green-400'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  </section>
);

};

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    quote: "Working with freelancers on this platform transformed our marketing strategy. We found an amazing designer who understood our brand immediately and delivered outstanding creative assets that increased our engagement by 45%.",
    stars: 5,
    tags: ["Graphic Design", "Social Media", "Branding"],
    project: "Complete brand refresh and social media campaign"
  },
  
  {
    name: "Michael Chen",
    role: "Freelance Developer",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
    quote: "Since joining this platform, I've been able to find consistent high-quality projects that match my expertise. The seamless payment system and project management tools help me focus on what I do best - coding great solutions for clients.",
    stars: 5,
    tags: ["Web Development", "React", "API Integration"],
    project: "Developed 12+ projects with 100% client satisfaction"
  },
  {
    name: "Elena Rodriguez",
    role: "Startup Founder",
    image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600",
    quote: "As a startup with limited resources, this platform has been invaluable. We've built our entire tech infrastructure using talented freelancers, saving us over $200K in development costs while still getting enterprise-quality results.",
    stars: 4,
    tags: ["MVP Development", "UX Design", "Technical Consulting"],
    project: "Complete startup platform development from concept to launch"
  }
];

export default Testimonials;