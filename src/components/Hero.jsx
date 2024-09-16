import React, { useEffect, useState } from 'react';
import { MapPin, Clock } from 'lucide-react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleImageError = () => {
    console.error("Failed to load hero image");
    setImageError(true);
  };

  return (
    <section className="mb-16 p-8">
      <div className="md:flex items-center">
        <div className={`md:w-2/3 mb-8 md:mb-0 transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-7 text-white">
            <span className="animate-fade-in-text">
              Hi, I'm Azeez Abiola 👋 a Frontend Developer
            </span>
          </h1>
          <p className="text-xl mb-4 text-white">
            I'm a frontend developer with 5+ years of experience, focused on creating fast, accessible, and responsive digital experiences.
          </p> {/* Closing tag added here */}
          <div className="flex items-center space-x-4 mb-4">
            <MapPin className="w-5 h-5 text-white-500" />
            <span className='text-white'>Lagos State, Nigeria</span>
          </div>
          <div className="flex items-center space-x-4">
            <Clock className="w-5 h-5 text-green-500" />
            <span className="text-green-500">Available for new projects</span>
          </div>
        </div>
        <div className={`md:w-1/3 transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          {imageError ? (
            <div className="bg-gray-200 rounded-lg shadow-lg mx-auto w-full max-w-[300px] h-[300px] flex items-center justify-center text-gray-500">
              Image not found
            </div>
          ) : (
            <img 
              src="/heroimg.jpg" 
              alt="Azeez Abiola" 
              className="rounded-lg shadow-lg mx-auto w-full max-w-[300px] h-auto" 
              onError={handleImageError}
            />
          )}
        </div>
      </div>
    </section>
  );
}