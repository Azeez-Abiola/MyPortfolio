import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Adjust the duration as needed
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#111827]">
        <div className="relative w-24 h-24">
          <div className={`absolute inset-0 border-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-full animate-spin`}></div>
          <div className={`absolute inset-2 border-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-400'} rounded-full animate-ping`}></div>
          <div className={`absolute inset-4 border-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-full animate-pulse`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${isDarkMode ? 'text-white' : 'text-white-800'} text-2xl font-bold animate-bounce`}>&lt;AA&gt;</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#111827] text-white' : 'bg-[#111827] text-gray-900'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto px-4 py-8">
        <Hero isDarkMode={isDarkMode} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}