import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const MotionLink = motion(Link);

export default function Header({ isDarkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'projects', 'contact', 'blog'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define menu items
  const menuItems = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
  ];

  // Conditionally add admin links
  if (location.pathname === '/admin') {
    menuItems.push(
      { href: '/login', label: 'Login' },
      { href: '/signup', label: 'SignUp' },
      { href: '/admin', label: 'Admin Dashboard' }
    );
  }

  const menuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 }
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 }
  };

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-gray-950 to-blue-950 text-white">
      <div className="container mx-auto px-4 py-8 flex justify-between items-center">
        <div 
          className="text-3xl font-bold text-blue-400 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          &lt;AA/&gt;
        </div>
        <nav className="hidden md:flex md:space-x-6">
          {menuItems.map((item) => (
            <MotionLink
              key={item.href}
              to={item.href}
              onClick={(e) => item.href.startsWith('#') && handleSmoothScroll(e, item.href)}
              className={`inline-block py-2 hover:text-blue-400 transition-colors duration-300 relative ${
                activeSection === item.href.slice(1) ? 'text-blue-400' : ''
              }`}
              variants={menuItemVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {item.label}
            </MotionLink>
          ))}
        </nav>
        <div className="flex items-center space-x-6">
          <a href="/Azeez Abiola Quadri updated Cv.pdf" className="bg-[#111827] text-white px-5 py-2 rounded-md hover:bg-blue-500 transition-colors duration-300">Download CV</a>
          <div className="hidden md:flex space-x-4">
            <a href="https://github.com/Azeez-Abiola" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300">
              <FaGithub className="w-6 h-6" />
            </a>
            <a href="https://x.com/darnyy_abiola?t=8Fi-SSB_4HcBafkXKTpXnA&s=09" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/abiola-azeez-688865201?utm_source=share&utm_campaign=share_v" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300">
              <FaLinkedin className="w-6 h-6" />
            </a>
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-white bg-[#111827] hover:bg-white hover:text-[#111827] rounded-md transition-colors duration-300 p-2 z-50"
            style={{ border: '1px solid transparent' }}
            onMouseEnter={(e) => e.currentTarget.style.border = '1px solid #111827'}
            onMouseLeave={(e) => e.currentTarget.style.border = '1px solid transparent'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 z-40 bg-gray-900 bg-opacity-95"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              {menuItems.map((item, index) => (
                <MotionLink
                  key={item.href}
                  to={item.href}
                  className="text-2xl font-semibold my-4 text-white hover:text-blue-400 transition-colors duration-300"
                  onClick={(e) => {
                    item.href.startsWith('#') && handleSmoothScroll(e, item.href);
                    e.stopPropagation();
                  }}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.label}
                </MotionLink>
              ))}
              <div className="flex space-x-6 mt-6">
                <a href="https://github.com/Azeez-Abiola" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300">
                  <FaGithub className="w-8 h-8" />
                </a>
                <a href="https://x.com/darnyy_abiola?t=8Fi-SSB_4HcBafkXKTpXnA&s=09" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300">
                  <FaTwitter className="w-8 h-8" />
                </a>
                <a href="https://www.linkedin.com/in/abiola-azeez-688865201?utm_source=share&utm_campaign=share_v" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors duration-300">
                  <FaLinkedin className="w-8 h-8" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}