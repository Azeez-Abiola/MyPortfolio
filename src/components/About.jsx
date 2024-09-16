import React, { useEffect, useRef, useState } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`mb-16 bg-[#1E293B] text-white rounded-lg p-8 shadow-lg transition-opacity duration-1000 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex justify-center mb-6">
        <h2 className="text-2xl font-bold bg-white-700 border border-gray-500 rounded-md p-2 inline-block">About me</h2>
      </div>
      <div className="md:flex items-center justify-between">
        <div className="md:w-1/3 mb-8 md:mb-0">
          <img src="/Aboutimg2.jpg?height=400&width=300" alt="Sagar full body" className="rounded-lg shadow-lg mx-auto" />
        </div>
        <div className="md:w-2/3 md:pl-8">
          <div className="bg-[#111827] rounded-lg p-6 shadow-inner">
            <h3 className="text-xl font-semibold mb-4 text-blue-300">Curious about me? Here you have it:</h3>
            <p className="mb-3 text-sm">
              I'm a passionate Software Engineer specializing in Frontend Development (React.js & Angular).
              I'm enthusiastic about bringing technical and visual aspects of digital products to life.
            </p>
            {isExpanded && (
              <>
                <p className="mb-3 text-sm">
                  User experience, pixel perfect design, and writing clean accessible, human code matters to me.
                </p>
                <p className="mb-3 text-sm">
                  My journey as a web developer began in 2017. Since then, I've grown and evolved, taking on new challenges and learning the latest technologies. In my 7+ years as a web developer, I've worked with various companies and startups, proud of the skills I've gained and the progress I've made.
                </p>
                <p className="mb-3 text-sm">
                  When not in full-on developer mode, you can find me Working on my Startups or Reading Engineering Books, witnessing early startup journeys or enjoying free time. Follow me on Twitter for tech-related bites and build-in-public updates, or on GitHub.
                </p>
                <p className="mb-2 text-sm">Quick bits about me:</p>
                <ul className="list-disc list-inside mb-3 pl-4 text-sm">
                  <li>B.E. in Electrical and Electronics Engineering</li>
                  <li>Frontend Developer</li>
                  <li>Aspiring Founder</li>
                </ul>
                <p className="italic text-sm">Available for freelance work, Collaborations and Jobs - feel free to reach out and say hello! I promise I'm Friendly😉</p>
              </>
            )}
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="mt-4 text-blue-500 hover:underline"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}