'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const href = path.startsWith('/') ? path : `/${path}`;
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href} className={`group ${isActive ? 'text-primary' : ''}`}>
      {children}
      <span
        className={`block h-0.5 max-w-0 bg-black transition-all duration-300 group-hover:max-w-full dark:bg-white ${
          isActive ? 'max-w-full' : ''
        }`}
      ></span>
    </Link>
  );
}
