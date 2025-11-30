'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FontSize = 'normal' | 'large' | 'larger'
type Contrast = 'normal' | 'high' | 'inverted'

export default function AccessibilityButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState<FontSize>('normal')
  const [contrast, setContrast] = useState<Contrast>('normal')
  const [dyslexicFont, setDyslexicFont] = useState(false)

  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings')
    if (savedSettings) {
      const { fontSize: savedFontSize, contrast: savedContrast, dyslexicFont: savedDyslexicFont } = JSON.parse(savedSettings)
      setFontSize(savedFontSize)
      setContrast(savedContrast)
      setDyslexicFont(savedDyslexicFont)
      applySettings(savedFontSize, savedContrast, savedDyslexicFont)
    }
  }, [])

  const applySettings = (newFontSize: FontSize, newContrast: Contrast, newDyslexicFont: boolean) => {
    document.documentElement.setAttribute('data-font-size', newFontSize)

    document.documentElement.classList.remove('high-contrast', 'inverted-colors')
    if (newContrast === 'high') {
      document.documentElement.classList.add('high-contrast')
    } else if (newContrast === 'inverted') {
      document.documentElement.classList.add('inverted-colors')
    }

    if (newDyslexicFont) {
      document.documentElement.classList.add('dyslexic-font')
    } else {
      document.documentElement.classList.remove('dyslexic-font')
    }

    localStorage.setItem('accessibility-settings', JSON.stringify({
      fontSize: newFontSize,
      contrast: newContrast,
      dyslexicFont: newDyslexicFont
    }))
  }

  const updateFontSize = (newSize: FontSize) => {
    setFontSize(newSize)
    applySettings(newSize, contrast, dyslexicFont)
  }

  const updateContrast = (newContrast: Contrast) => {
    setContrast(newContrast)
    applySettings(fontSize, newContrast, dyslexicFont)
  }

  const toggleDyslexicFont = () => {
    const newDyslexicFont = !dyslexicFont
    setDyslexicFont(newDyslexicFont)
    applySettings(fontSize, contrast, newDyslexicFont)
  }

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`nav-link flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-all w-full ${
          isOpen ? 'bg-white/10' : ''
        }`}
        aria-label="Controles de acessibilidade"
        aria-expanded={isOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        <span className="flex-1 text-left">Acessibilidade</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-3 mt-2 bg-black/20 rounded-xl space-y-4">
              {/* Tamanho da Fonte */}
              <div>
                <h3 className="text-xs font-semibold mb-2 text-white/80 flex items-center gap-2 uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                  </svg>
                  Fonte
                </h3>
                <div className="flex gap-2">
                  {(['normal', 'large', 'larger'] as FontSize[]).map((size) => (
                    <button
                      key={size}
                      onClick={() => updateFontSize(size)}
                      className={`flex-1 px-2 py-2 rounded font-semibold text-sm transition-all duration-200 ${
                        fontSize === size
                          ? 'bg-white text-[var(--primary-color)] shadow-md'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                      aria-pressed={fontSize === size}
                    >
                      {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contraste */}
              <div>
                <h3 className="text-xs font-semibold mb-2 text-white/80 flex items-center gap-2 uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                  </svg>
                  Contraste
                </h3>
                <div className="flex flex-col gap-2">
                  {(['normal', 'high', 'inverted'] as Contrast[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => updateContrast(mode)}
                      className={`px-3 py-2 rounded font-medium text-xs text-left transition-all duration-200 ${
                        contrast === mode
                          ? 'bg-white text-[var(--primary-color)] shadow-md'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                      aria-pressed={contrast === mode}
                    >
                      {mode === 'normal' ? 'Normal' : mode === 'high' ? 'Alto Contraste' : 'Invertido'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dislexia */}
              <div>
                <button
                  onClick={toggleDyslexicFont}
                  className={`w-full px-3 py-2 rounded font-medium text-xs flex items-center gap-2 transition-all duration-200 ${
                    dyslexicFont
                      ? 'bg-white text-[var(--primary-color)] shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  aria-pressed={dyslexicFont}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  {dyslexicFont ? 'Fonte Dislexia Ativa' : 'Fonte para Dislexia'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
