'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'

interface FooterProps {
  isNavbarVisible: boolean;
}

export default function Footer({ isNavbarVisible }: FooterProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const links = {
    institucional: [
      { label: 'Sobre a UFC', href: 'https://www.ufc.br/a-universidade' },
      { label: 'Campus Sobral', href: 'https://sobral.ufc.br/' },
      { label: 'Notícias', href: 'https://www.ufc.br/noticias' },
      { label: 'Contato', href: '/contato' },
    ],
    acesso_rapido: [
      { label: 'Portal do Aluno', href: 'https://si3.ufc.br/sigaa/' },
      { label: 'Biblioteca', href: 'https://biblioteca.ufc.br/' },
      { label: 'Calendário Acadêmico', href: 'https://www.ufc.br/calendario-universitario/2025' },
      { label: 'Documentos', href: '/documentos' },
    ],
    redes_sociais: [
      { label: 'Instagram', href: 'https://www.instagram.com/ufcinforma/', icon: '📸' },
      { label: 'Facebook', href: 'https://facebook.com/ufcsobral', icon: '👥' },
      { label: 'Twitter', href: 'https://twitter.com/ufcsobral', icon: '🐦' },
      { label: 'YouTube', href: 'https://youtube.com/ufcsobral', icon: '▶️' },
    ]
  }

  return (
    <footer className={`
      relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800
      transition-all duration-500 transform
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
      ${isNavbarVisible ? 'ml-64' : 'ml-0'}
      border-t border-gray-200 dark:border-gray-700
    `}>
      {/* Faixa decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>

      {/* Efeito de brilho */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo e Informações */}
          <div className="space-y-4">
            <Image
              src="/Imagem1.png"
              alt="UFC Sobral Logo"
              width={200}
              height={60}
              className="h-auto w-auto object-contain mb-4 opacity-90"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Formando profissionais e gerando conhecimento para o desenvolvimento do país.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Links Institucionais */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 relative">
              Institucional
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
            </h3>
            <ul className="space-y-3">
              {links.institucional.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-600/50 dark:bg-blue-400/50"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Acesso Rápido */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 relative">
              Acesso Rápido
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
            </h3>
            <ul className="space-y-3">
              {links.acesso_rapido.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-600/50 dark:bg-blue-400/50"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 relative">
              Redes Sociais
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {links.redes_sociais.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:translate-x-1"
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="text-sm">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} UFC Sobral. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-500">
              <Link href="/privacidade" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Termos de Uso
              </Link>
              <Link href="/mapa" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Mapa do Site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 