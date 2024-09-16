import React, { useEffect, useRef } from 'react';
import { Briefcase, ChevronRight, Star, Code, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'StudyMeister ',
    role: 'Senior Frontend Developer',
    period: 'Ongoing',
    logo: '/studyicon.png',
    responsibilities: [
      'Developed responsive UIs with React.js, TypeScript, TailwindCSS.',
      'Integrated AI-powered content generation system.',
      'Built interactive components with real-time feedback.'
    ],
    icon: <Code className="w-6 h-6 text-blue-500" />
  },
  {
    company: 'SwiftyHost',
    role: 'Senior Frontend Developer',
    period: 'Jan 2021 – Present',
    logo: '/swiftyhost.png',
    responsibilities: [
      'Led MVP frontend dev with Angular, TypeScript, Node.js.',
      'Improved SEO and Google search rankings.',
      'Ensured efficient API integration.'
    ],
    icon: <Globe className="w-6 h-6 text-green-500" />
  },
  {
    company: 'Smartlearn',
    role: 'Senior Frontend Developer',
    period: 'Oct 2019 – Sep 2020',
    logo: '/smartlearn-logo.png',
    responsibilities: [
      'Led frontend dev with Vue.js and TypeScript.',
      'Integrated multi-format content delivery systems.',
      'Ensured cross-platform accessibility.'
    ],
    icon: <Star className="w-6 h-6 text-yellow-500" />
  },
  {
    company: 'LorenzoTvmedia',
    role: 'Frontend Developer',
    period: 'May 2017 – Jul 2019',
    logo: '/lorenzotvmedia.png',
    responsibilities: [
      'Developed media platform using React.js.',
      'Created tech/startup news blog platform.',
      'Integrated content management system.'
    ],
    icon: <Zap className="w-6 h-6 text-purple-500" />
  },
  {
    company: 'One Credit Pay Solutions',
    role: 'Junior Developer',
    period: 'Oct 2016 – May 2017',
    logo: '/onecredit.png',
    responsibilities: [
      'Redesigned website with Angular, HTML5, CSS3.',
      'Developed fintech platform features.',
      'Integrated secure payment gateways.'
    ],
    icon: <Briefcase className="w-6 h-6 text-red-500" />
  }
];

export default function Experience() {
  const experienceRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0) rotateY(0)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    experienceRefs.current.forEach((ref, index) => {
      if (ref) {
        observer.observe(ref);
        ref.style.opacity = '0';
        ref.style.transform = index % 2 === 0 ? 'translateX(-25px) rotateY(-5deg)' : 'translateX(25px) rotateY(5deg)';
        ref.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      }
    });

    return () => {
      experienceRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="experience" className="mb-12 py-12 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Professional Journey
        </h2>
        <p className="mb-8 text-center text-gray-400 max-w-xl mx-auto text-base italic">
          A tour through my career, blending creativity, technical expertise, and growth:
        </p>
        <div className="space-y-8">
          {experiences.map((job, index) => (
            <motion.div 
              key={index} 
              ref={(el) => (experienceRefs.current[index] = el)}
              className="relative bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-500"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-2 shadow-md">
                {job.icon}
              </div>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 mr-4 overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-0.5 shadow-inner">
                  <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-contain rounded-full bg-gray-800" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{job.role}</h3>
                  <p className="text-sm text-blue-400 font-semibold">{job.company}</p>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Briefcase className="w-3 h-3 mr-1 text-green-500" />
                    {job.period}
                  </span>
                </div>
              </div>
              <ul className="space-y-2 bg-gray-700 p-3 rounded-lg text-sm">
                {job.responsibilities.map((responsibility, idx) => (
                  <li key={idx} className="flex items-start group">
                    <ChevronRight className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5 transform group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="text-gray-300 group-hover:text-blue-600 transition-colors duration-200">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}