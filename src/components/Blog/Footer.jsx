import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-950 to-blue-950 text-white mt-12">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <p>&copy; 2023 Abiola's Blog. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-300 transition duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-blue-300 transition duration-200">Terms of Service</a>
          <a href="#" className="hover:text-blue-300 transition duration-200">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;