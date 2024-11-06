'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession} from 'next-auth/react';

import LogoutButton from './logoutButton';

function Header() {
  const { data: session } = useSession();
  
  function isLogin() {
    if (session) {
      return (
        <div className="flex justify-between items-center">
          <Link href="/" className="flex space-x-2">
            <Image
              className="rounded-full mx-2 object-contain" 
              src="https://links.papareact.com/jne" 
              alt="logo" 
              height={10} 
              width={50} 
            />
            <p>
              <span className="text-blue-400">Welcome </span>
              <span className="font-bold text-lg">John Doe</span>
            </p>
          </Link>
          <LogoutButton />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center space-y-5">
          <div className="flex space-x-2 items-center">
            <Image 
              src="https://links.papareact.com/jne" 
              alt="logo" 
              height={10} 
              width={50} 
            />
            <p className="text-blue-400">Welcome to Messenger</p>
          </div>
          <Link 
            href="/auth/signin" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </Link>
        </div>
      );
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-md shadow-sm p-5">      
      {isLogin()}
    </header>
  );
}

export default Header;