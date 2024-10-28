import Image from 'next/image';
import Link from 'next/link';

function Header() {
  return (
    <header>
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
      </div>
      <Link href="/auth/signin">Sign In</Link>
    </header>
  );
}

export default Header;