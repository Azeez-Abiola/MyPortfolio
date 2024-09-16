import React, { useEffect, useRef, useState } from 'react';
import { Globe, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Lorenzotvmovies",
    description: "A movie streaming platform with a vast collection of films and TV shows.",
    image: "/lorenzotvmovies.jpg",
    technologies: ['React', 'Next.js', 'TypeScript', 'Nest.js', 'PostgreSQL', 'Tailwindcss', 'Figma', 'Cypress'],
    liveLink: "khalteck.lorenzotv.netlify.app",
    githubLink: "#"
  },
  {
    title: "Lorenzotvmedia",
    description: "A media platform for the latest news in technology, startups, and entertainment.",
    image: "/lorenzotvmedia.jpg",
    technologies: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Sass', 'Docker'],
    liveLink: "htps://lorenzotvmedia.netlify.app",
    githubLink: "#"
  },
  {
    title: "Swiftyhost",
    description: "A cloud hosting solution for swift and efficient web application deployment.",
    image: "/swiftyhost.jpg",
    technologies: ['Vue.js', 'Vuex', 'Firebase', 'Tailwindcss', 'Jest'],
    liveLink: "https://swiftyhost.com",
    githubLink: "#"
  },
  {
    title: "Foody project",
    description: "A food delivery application connecting local restaurants with hungry customers.",
    image: "/foody-project.jpg",
    technologies: ['Angular', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Material-UI'],
    liveLink: "foody.netlify.app",
    githubLink: "#"
  },
  {
    title: "StudyMEISTER",
    description: "An AI powered Edtech company that helps students write their project and articles with ease",
    image: "/studyMEISTER.jpg",
    technologies: ['React Native', 'Redux', 'GraphQL', 'Apollo', 'Firebase', 'Expo'],
    liveLink: "https://studymeister.com",
    githubLink: "#"
  }
];

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="bg-gray-800 rounded-lg overflow-hidden text-white"
      initial={{ width: "80%" }}
      whileHover={{ 
        width: "100%",
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row">
        <motion.img 
          src={project.image} 
          alt={project.title} 
          className="w-full md:w-1/2 object-cover"
          initial={{ height: "200px" }}
          animate={{ height: isHovered ? "250px" : "200px" }}
          transition={{ duration: 0.3 }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder.svg?height=200&width=400&text=Project";
          }}
        />
        <motion.div 
          className="p-6 md:w-1/2"
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <div className="flex space-x-2">
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                <Globe className="w-6 h-6" />
              </a>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors duration-200">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
          <p className="mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="relative px-3 py-1 text-sm">
                <span className="relative z-10">{tech}</span>
                <span className="absolute inset-0 rounded-full border-2 border-transparent" style={{
                  background: 'linear-gradient(90deg, #4ade80, #3b82f6, #facc15) border-box',
                  WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}></span>
                <span className="absolute inset-0 rounded-full" style={{
                  background: 'linear-gradient(90deg, #4ade80, #3b82f6, #facc15)',
                  clipPath: 'inset(0 100% 0 0)',
                  animation: 'border-line 3s linear infinite'
                }}></span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const projectRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    projectRefs.current.forEach((ref, index) => {
      if (ref) {
        observer.observe(ref);
        ref.style.opacity = '0';
        ref.style.transform = 'translateY(50px)';
        ref.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'; // Reduced transition duration for faster loading
      }
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="work" className="mb-16 text-white ">
      <h2 className="inline-block px-2 py-2 bg-[#111827] rounded-md border border-gray-500 flex justify-center mb-6">Work</h2>
      <p className="mb-4">Some of the noteworthy projects I have built:</p>
      <div className="space-y-12">
        {projects.map((project, index) => (
          <div 
            key={index} 
            ref={(el) => (projectRefs.current[index] = el)}
            className="opacity-0 transform translate-y-12 flex justify-center"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes border-line {
          0% { clip-path: inset(0 100% 0 0); }
          25% { clip-path: inset(0 0 100% 0); }
          50% { clip-path: inset(100% 0 0 0); }
          75% { clip-path: inset(0 0 0 100%); }
          100% { clip-path: inset(0 100% 0 0); }
        }
      `}</style>
    </section>
  );
}
