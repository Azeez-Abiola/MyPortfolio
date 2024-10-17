import React from 'react';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';

const MainHome = () => {
  return (
    <div>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
};

export default MainHome;