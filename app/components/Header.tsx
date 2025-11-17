'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    
    if (pathname === '/') {
      setIsLoaded(true)
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  if (pathname !== '/') {
    return null
  }

  return (
    <header 
      className={`
        relative bg-white dark:bg-gray-900
        transition-all duration-500
        ${isScrolled ? 'py-6' : 'py-12'}
        ${isLoaded ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            {/* Logo Principal */}
            <div className="group">
              <Link href="/">
                <div className="
                  relative
                  bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950 dark:to-transparent
                  rounded-2xl p-8
                  transition-all duration-500
                  group-hover:scale-110
                  group-hover:-translate-y-4
                  group-hover:shadow-[0_20px_80px_-20px_rgba(29,78,216,0.5)]
                  dark:group-hover:shadow-[0_20px_80px_-20px_rgba(29,78,216,0.3)]
                ">
                  <Image
                    src="/Imagem1.png"
                    alt="UFC Sobral Logo"
                    width={450}
                    height={160}
                    priority
                    className="
                      transition-all duration-500
                      group-hover:brightness-110
                      drop-shadow-xl
                    "
                  />
                </div>
              </Link>
            </div>

            {/* Logo 70 Anos */}
            <div className="group">
              <div className="
                relative
                bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-950 dark:to-transparent
                rounded-2xl p-6
                transition-all duration-500
                group-hover:scale-110
                group-hover:-translate-y-4
                group-hover:shadow-[0_20px_80px_-20px_rgba(245,158,11,0.5)]
                dark:group-hover:shadow-[0_20px_80px_-20px_rgba(245,158,11,0.3)]
              ">
                <Image
                  src="/UFC-70-Horizontal-Cor-2048x463.png"
                  alt="UFC 70 Anos"
                  width={320}
                  height={72}
                  className="
                    transition-all duration-500
                    group-hover:brightness-110
                    drop-shadow-xl
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 