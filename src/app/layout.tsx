import type { Metadata } from 'next'
import './globals.css'
import { ApolloProviderWrapper } from '@/lib/apollo-provider'

export const metadata: Metadata = {
  title: 'PokeDex - Nilo Challenge',
  description: 'Explora el mundo de Pokémon, descubre sus habilidades únicas y construye tu colección',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <ApolloProviderWrapper>
          {children}
        </ApolloProviderWrapper>
      </body>
    </html>
  )
}
