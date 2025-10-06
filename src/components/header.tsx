'use client';

import Link from 'next/link';
import { useSeenPokemon } from '@/hooks/use-seen-pokemon';
import { WORDINGS } from '@/lib/wordings';
import type { HeaderProps } from '@/types';

export const Header = ({ fixed = true }: HeaderProps) => {
  const { seenCount } = useSeenPokemon();

  return (
    <div className={`w-full z-50 ${fixed ? 'sticky top-0' : ''}`}>
      <header className="w-full bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-4 md:py-6">
            <Link href="/" className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#275FBB] to-[#932482] bg-clip-text text-transparent">
                {WORDINGS.HEADER.TITLE}
              </h1>
              <p className="text-sm text-gray-700 mt-1">
                {WORDINGS.HEADER.SUBTITLE}
              </p>
            </Link>

            <Link
              href="/seen"
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-md transition-colors"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="text-xs md:text-sm font-semibold">
                {WORDINGS.HEADER.SEEN_BUTTON} ({seenCount})
              </span>
            </Link>
          </div>
        </div>
      </header>
      <div
        className="w-full h-4 bg-transparent rounded-tl-[12px] rounded-tr-[12px]"
        style={{
          boxShadow: 'inset 0 4px 4px -1px rgba(0,0,0,0.1), -4px -4px 2px 0 rgba(255,255,255,1), 4px -4px 2px 0 rgba(255,255,255,1)'
        }}
      />
    </div>
  );
}