import React, { useState } from 'react'
import Navbar from '../../components/user/navbar'
import { Plus } from 'lucide-react'
 
 const About = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  const faqData = [
    {
      question: "How do I get there?",
      answer: "You can reach us by car via Highway 101, or take the scenic coastal route. We're located just 15 minutes from downtown, with ample parking available on-site. Public transportation options include bus routes 42 and 67, which stop right at our entrance."
    },
    {
      question: "What dining options are available?",
      answer: "We offer a variety of dining experiences including our signature restaurant featuring locally-sourced ingredients, a casual café with light bites and artisanal coffee, and room service available 24/7. Special dietary requirements can be accommodated with advance notice."
    },
    {
      question: "What beyond lodging is included in my reservation?",
      answer: "Your stay includes complimentary Wi-Fi, access to our fitness center and spa facilities, daily housekeeping, concierge services, and use of our recreational amenities. We also provide welcome refreshments and a comprehensive local activities guide."
    },
    {
      question: "Is Wi-Fi available onsite?",
      answer: "Whether you're hiking the trails of the surrounding volcanoes, kayaking across the serene waters, or immersing yourself in the local culture, there's something for every adventurer. For those seeking deeper connections, the area is also home to a thriving spiritual and wellness community. Participate in transformative workshops, ecstatic dances, kirtans, and so much more."
    },
    {
      question: "What activities are available nearby?",
      answer: "The area offers incredible outdoor adventures including volcano hiking, zip-lining through the canopy, wildlife watching, hot springs, waterfall tours, and cultural experiences with local communities. We can arrange guided tours and provide equipment rentals for most activities."
    }
  ]

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index)
  }

   return (
     <>
      <Navbar currentPage='about us'/>
      <div className="min-h-screen bg-[#f8f8f8] py-60 px-8 ">
        <div className="max-w-6xl mx-auto">
          <div className="grid items-start grid-cols-1 gap-16 lg:grid-cols-2">
            
            <div className="lg:sticky lg:top-16">
              <h1 className="font-bold leading-none text-gray-800 font-playfair text-8xl lg:text-9xl">
                FAQ
              </h1>
            </div>


            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="pb-4 border-b border-gray-200 group"
                >
                  <div
                    className="flex items-center justify-between px-4 py-4 transition-all duration-300 rounded-lg cursor-pointer"
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-[#4a9b8e] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"></div>
                      <h3 className="text-xl lg:text-2xl font-medium text-gray-800 group-hover:text-[#4a9b8e] transition-colors duration-300">
                        {faq.question}
                      </h3>
                    </div>
                    
                    <Plus 
                      className={`w-6 h-6 text-[#4a9b8e] transition-transform duration-500 ease-in-out flex-shrink-0 ${
                        openQuestion === index ? 'rotate-45' : 'rotate-0'
                      }`}
                      strokeWidth={2}
                    />
                  </div>
                  
                  <div
                    className={`overflow-hidden transition-all duration-2000 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      openQuestion === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 pt-2 pb-4">
                      <p className="text-lg leading-relaxed text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      
     </>
   )
 }

export default About
