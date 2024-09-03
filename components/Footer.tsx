import { logoutAccount } from '@/lib/actions/user.actions';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();
  const HandleLogOut = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) redirect('/sign-in');
  };
  return (
    <footer className='footer'>
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'mobile-name'}>
        <p className='text-xl text-gray-700 font-bold'>{user?.firstName[0]}</p>
      </div>
      <div
        className={type === 'mobile' ? 'footer_email-mobile' : 'footer-name'}
      >
        <h1 className='text-14 truncate font-normal text-gray-700 '>
          {user?.firstName}
        </h1>
        <p className=' text-14 truncate font-normal text-gray-600'>
          {user.email}
        </p>
      </div>
      <div className='footer_image' onClick={HandleLogOut}>
        <Image src='/icons/logout.svg' fill alt='jsm' />
      </div>
    </footer>
  );
};

export default Footer;
