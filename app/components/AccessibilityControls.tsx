'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FontSize = 'normal' | 'large' | 'larger'
type Contrast = 'normal' | 'high' | 'inverted'

export default function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState<FontSize>('normal')
  const [contrast, setContrast] = useState<Contrast>('normal')
  const [dyslexicFont, setDyslexicFont] = useState(false)

  useEffect(() => {
    // Carregar configurações salvas
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
    // Aplicar tamanho da fonte
    document.documentElement.setAttribute('data-font-size', newFontSize)

    // Aplicar contraste
    document.documentElement.classList.remove('high-contrast', 'inverted-colors')
    if (newContrast === 'high') {
      document.documentElement.classList.add('high-contrast')
    } else if (newContrast === 'inverted') {
      document.documentElement.classList.add('inverted-colors')
    }

    // Aplicar fonte para dislexia
    if (newDyslexicFont) {
      document.documentElement.classList.add('dyslexic-font')
    } else {
      document.documentElement.classList.remove('dyslexic-font')
    }

    // Salvar configurações
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
    <div className="mb-6 mr-6 flex justify-end">
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color-dark)] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)]/50"
          aria-label="Controles de acessibilidade"
          aria-expanded={isOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </button>
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Acessibilidade
            <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-80 border-2 border-gray-100 dark:border-gray-700"
            role="dialog"
            aria-label="Opções de acessibilidade"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[var(--primary-color)]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Acessibilidade
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                aria-label="Fechar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                  </svg>
                  Tamanho da Fonte
                </h3>
                <div className="flex gap-2">
                  {(['normal', 'large', 'larger'] as FontSize[]).map((size) => (
                    <button
                      key={size}
                      onClick={() => updateFontSize(size)}
                      className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                        fontSize === size
                          ? 'bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color-dark)] text-white shadow-lg scale-105'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
                      }`}
                      aria-pressed={fontSize === size}
                    >
                      {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                  </svg>
                  Contraste
                </h3>
                <div className="flex flex-col gap-2">
                  {(['normal', 'high', 'inverted'] as Contrast[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => updateContrast(mode)}
                      className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        contrast === mode
                          ? 'bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color-dark)] text-white shadow-lg scale-105'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
                      }`}
                      aria-pressed={contrast === mode}
                    >
                      {mode === 'normal' ? 'Contraste Normal' : mode === 'high' ? 'Alto Contraste' : 'Cores Invertidas'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  Fonte para Dislexia
                </h3>
                <button
                  onClick={toggleDyslexicFont}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    dyslexicFont
                      ? 'bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color-dark)] text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
                  }`}
                  aria-pressed={dyslexicFont}
                >
                  {dyslexicFont ? '✓ Fonte para Dislexia Ativa' : 'Ativar Fonte para Dislexia'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
