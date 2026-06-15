import React from 'react'
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/store/slices/userSlice';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { FaChevronDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { LOGO, USER_AVATAR } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName} = user;
        dispatch(addUser({uid, email, displayName}));
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });

  }, []);

  const isAuthPage = location.pathname === '/';
  const isBrowsePage = location.pathname === '/browse';

  

  const headerClass = isAuthPage
    ? 'bg-gradient-to-b to-transparent from-black'
    : isBrowsePage
      ?'bg-black' : '';

  return (
    <div className={`fixed top-0 left-0 flex items-center justify-between px-4 py-3 w-full z-50 h-16 transition-colors duration-300 ${headerClass}`}>
      <img className="w-36" src={LOGO} alt='netflix-logo' />
      { user && 
      <>
      <ul className='text-white flex gap-3 p- flex-start justify-start align-start'>
        <li>Home</li>
        <li>Shows</li>
        <li>Movies</li>
        <li>Games</li>
        <li>New  & Popular</li>
        <li>My List</li>
        <li>Browse By Languages</li>
      </ul>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-4 py-2"
        >
          <img className="w-8 h-8 rounded-md" src={ USER_AVATAR } alt="User Avatar" />

          {/* Single icon that rotates */}
          <FaChevronDown
            className={` ml-2
              text-gray-400
              transition-transform duration-300 
              ${isOpen ? 'rotate-180' : 'rotate-0'}
            `}
          />
        </button>

        {isOpen &&
        <div className="flex flex-col p-2 absolute right-0 mt-2 -translate-x-2 text-white bg-black/80 rounded-md border border-white/40 w-56 shadow-lg">
          <div className="flex items-center gap-3 px-2 py-2">
            <img className="w-10 h-10 rounded-md" src={USER_AVATAR} alt="User Avatar" />
            <div className="text-sm">
              <div className="font-semibold">{user?.displayName || 'Guest'}</div>
              <div className="text-gray-400 text-xs truncate">{user?.email}</div>
            </div>
          </div>
          <div className="border-t border-white/40 my-2" />
          <button
            className="text-left px-2 py-2 hover:bg-white/40 rounded-md"
            onClick={() => {
              signOut(auth).then(() => {
                navigate('/');
              }).catch(() => {
                navigate('/error');
              });
            }}
          >
            Logout
          </button>
        </div>
        }
      </div>
      </>
    }
    </div>
  )
}

export default Header
