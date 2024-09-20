import React from 'react';

const skills = [
  { name: 'JavaScript', icon: '/icons/javascript.png' },
  { name: 'TypeScript', icon: '/icons/typescript.png' },
  { name: 'React', icon: '/icons/react.png' },
  { name: 'Node.js', icon: '/icons/nodejs.png' },
  { name: 'Express.js', icon: '/icons/expressjs1.png' },
  { name: 'MongoDB', icon: '/icons/Mongodb.png' },
  { name: 'Sass/Scss', icon: '/icons/sass.png' },
  { name: 'Tailwindcss', icon: '/icons/tailwindcss.png' },
  { name: 'Bootstrap', icon: '/icons/bootstrap.png' },
  { name: 'HTML', icon: '/icons/html.png' },
  { name: 'CSS', icon: '/icons/css.png' },
  { name: 'Figma', icon: '/icons/figma.png' },
  { name: 'Git', icon: '/icons/git.png' }
];

const SkillItem = ({ skill }) => (
  <div className="flex flex-col items-center justify-center w-32 mx-4 my-2 transition-transform duration-75 ease-in-out transform hover:scale-105">
    <img 
      src={skill.icon}
      alt={skill.name} 
      className="w-16 h-16 mb-2 skill-icon rounded-lg"
    />
    <span className="text-sm text-center font-semibold text-blue-500">{skill.name}</span>
  </div>
);

export default function Skills() {
  return (
    <section id="skills" className="mb-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">
          <span className="inline-block px-4 py-2 bg-[#111827] dark:bg-white-700 rounded-md border border-gray-500">
            Skills
          </span>
        </h2>
        <p className="mb-4">The skills, tools and technologies I am really good at:</p>
      </div>
      <div className="skills-slider mb-8">
        <div className="skills-track">
          {[...skills, ...skills].map((skill, index) => (
            <SkillItem key={`${skill.name}-${index}`} skill={skill} />
          ))}
        </div>
      </div>
      <div className="skills-slider">
        <div className="skills-track reverse">
          {[...skills, ...skills].map((skill, index) => (
            <SkillItem key={`${skill.name}-${index}`} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}