import { Mail, MapPin, Phone, Clock, Menu, X } from 'lucide-react';
import React, {useState} from 'react'
import Navbar from './navbar';

const contact_us = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <Navbar currentPage='contact'/>

        <div className="px-4 py-16 pt-40 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Get in Touch</h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
  
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="p-8 bg-white shadow-xl rounded-2xl">
              <div className="space-y-8">
                <h2 className="mb-8 text-2xl font-semibold text-gray-900">Contact Information</h2>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-[#dbf7ee] rounded-full">
                      <Phone className="w-6 h-6 text-[#265c4c]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="mt-1 text-gray-600">+91 00000 00000</p>
                  </div>
                </div>
  
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                     <div className="p-3 bg-[#dbf7ee] rounded-full">
                        <Mail className="w-6 h-6 text-[#265c4c]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="mt-1 text-gray-600">contact@gmail.com</p>
                  </div>
                </div>
  
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-[#dbf7ee] rounded-full">
                        <MapPin className="w-6 h-6 text-[#265c4c]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Location</h3>
                    <p className="mt-1 text-gray-600">ABC Street</p>
                  </div>
                </div>
  
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-[#dbf7ee] rounded-full">
                        <Clock className="w-6 h-6 text-[#265c4c]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                    <p className="mt-1 text-gray-600">24 / 7</p>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="p-8 bg-white shadow-xl rounded-2xl">
              <h2 className="mb-8 text-2xl font-semibold text-gray-900">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="John Doe"
                  />
                </div>
  
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="john@example.com"
                  />
                </div>
  
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="How can we help?"
                  />
                </div>
  
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Your message here..."
                  />
                </div>
  
                <div>
                  <button
                    type="submit"
                    className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors bg-[#126d52] border border-transparent rounded-md shadow-sm hover:bg-[#1a664f] focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default contact_us