import { useState } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import emailjs from 'emailjs-com'; // Import Email.js

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showThankYou, setShowThankYou] = useState(false); // State for thank you message
  const [buttonAnimation, setButtonAnimation] = useState(''); // State for button animation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send email using Email.js
    emailjs.send('service_o9j3nn5', 'template_xuihsf8', formData, 'klZk9imZk9GF3AycA')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        setShowThankYou(true); // Show thank you message
        setFormData({ name: '', email: '', message: '' }); // Reset form

        // Fade out the thank you message after 2 seconds
        setTimeout(() => {
          setShowThankYou(false); // Hide thank you message
        }, 2000); // Adjust the duration as needed
      })
      .catch((err) => {
        console.error('Failed to send email. Error:', err);
      });

    // Trigger button animation
    setButtonAnimation('button-animation');
    setTimeout(() => {
      setButtonAnimation(''); // Reset animation class after it completes
    }, 300); // Match the duration of the animation
  };

  return (
    <section id="contact" className="mb-16 bg-gray-800 rounded-lg p-8 shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Get in Touch</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-lg mb-4 text-gray-300">I'd love to hear from you! be it a question or just want to say hi, feel free to drop a message.</p>
          <div className="flex items-center space-x-3 text-gray-300">
            <Mail className="w-5 h-5 text-blue-400" />
            <span>Abiolaquadri111@gmail.com</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <Phone className="w-5 h-5 text-blue-400" />
            <span>+234 (70)-325-442-94</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <MapPin className="w-5 h-5 text-blue-400" />
            <span>Lagos State, Nigeria</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full h-8 rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full h-12 rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className={`w-full bg-[#111827] text-white py-2 px-4 rounded-md hover:bg-white hover:text-[#111827] hover:border-[#111827] hover:border hover:rounded-[#111827] transition duration-300 flex items-center justify-center ${buttonAnimation}`}
          >
            <span className="hover:text-[#111827]">Send Message</span>
            <Send className="w-4 h-4 ml-2" />
          </button>
        </form>
        {showThankYou && ( // Conditional rendering for thank you message
  <div className={`mt-4 p-4 bg-[#111827] text-white rounded-md ${showThankYou ? 'animate-fade-in' : 'animate-fade-out'}`}>
    Thank you for your message!
  </div>
)}
      </div>
    </section>
  );
}