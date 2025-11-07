import React from 'react';
import Link from 'next/link';
import Button from '../atoms/Button';
const Header = () => {
  return (
    <header className=" dir-rtl flex justify-between items-center p-4 bg-primary-light/60 backdrop-blur-sm rounded-lg m-4">
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
        <Button color="primary">Login</Button>
        <Button color="primary-light">Register</Button>
      </div>
    </header>
  );
};

export default Header;