import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-950 to-blue-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="text-3xl font-bold mb-4 text-blue-400">&lt;AA /&gt;</div>
            <p className="text-sm text-gray-300">Crafting beautiful and functional web experiences</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-around gap-4">
            <a href="#about" className="hover:text-blue-400 transition-colors duration-300 relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#skills" className="hover:text-blue-400 transition-colors duration-300 relative group">
              Skills
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#experience" className="hover:text-blue-400 transition-colors duration-300 relative group">
              Experience
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#projects" className="hover:text-blue-400 transition-colors duration-300 relative group">
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="hover:text-blue-400 transition-colors duration-300 relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
          <div className="flex justify-center md:justify-end space-x-6">
            <a href="https://github.com/Azeez-Abiola" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              <GithubIcon className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/abiola-azeez-688865201?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              <LinkedinIcon className="w-6 h-6" />
            </a>
            <a href="https://x.com/darnyy_abiola?t=8Fi-SSB_4HcBafkXKTpXnA&s=09" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              <TwitterIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="mt-12 text-center text-sm text-gray-400 border-t border-gray-700 pt-8">
          <p>© 2023 Azeez Abiola. All rights reserved.</p>
          <p className="mt-2">Designed and built with ❤️ using React and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}