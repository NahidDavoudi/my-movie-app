import React from 'react';
import Link from 'next/link';
import Button from '../atoms/Button';
const Header = () => {
  return (
    <header className=" dir-rtl flex justify-between items-center p-4 bg-primary-light">
      <Link href="/">
        <div className=" dir-rtl text-2xl font-bold">Movie App</div>
      </Link>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
      <div className="flex gap-4">
        <Button variant="primary">Login</Button>
        <Button variant="#1a1a1a">Register</Button>
      </div>
    </header>
  );
};

export default Header;