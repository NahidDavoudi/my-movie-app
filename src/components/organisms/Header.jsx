'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Clock, User } from 'lucide-react';
import Button from '../atoms/Button';

const Header = () => {
  const pathname = usePathname();

  const mobileNavItems = [
    { href: '/', label: 'خانه', icon: Home },
    { href: '/genres', label: 'دسته‌بندی', icon: Grid },
    { href: '/watch-history', label: 'تاریخچه', icon: Clock },
    { href: '/profile', label: 'پروفایل', icon: User },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex dir-rtl justify-between items-center p-4 bg-primary-light/60 backdrop-blur-sm rounded-lg m-4">
        <Link href="/">
          <div className="dir-rtl text-2xl font-bold">Movie App</div>
        </Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/movies">Movies</Link>
            </li>
            <li>
              <Link href="/tv-shows">TV Shows</Link>
            </li>
            <li>
              <Link href="/genres">Genres</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/saved">Saved Movies</Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-4">
          <Button color="primary">Login</Button>
          <Button color="primary-light">Register</Button>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.3)] pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Header - Simplified */}
      <header className="md:hidden flex justify-between items-center p-4 bg-primary-light/60 backdrop-blur-sm m-4 rounded-lg">
        <Link href="/">
          <div className="text-xl font-bold">Movie App</div>
        </Link>
        <div className="flex gap-2">
          <Button color="primary">ورود</Button>
        </div>
      </header>
    </>
  );
};

export default Header;