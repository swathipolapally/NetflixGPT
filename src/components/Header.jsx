import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName} = user;
        console.log(user);
        dispatch(addUser({uid, email, displayName}));
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });

  }, []);

  return (
    <div className="flex justify-between absolute p-2 w-full bg-gradient-to-b to-transparent from-black z-10">
      <img className="w-36" src= { LOGO}
      alt='netflix-logo' />
      { user && 
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-content px-4 py-3"
        >
          <div className="p-2 px-2 ">{user?.displayName}</div>
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
        <div className="flex flex-col p-2 absolute bg-black text-white rounded-md cursor:pointer w-32" >
        
        <div className="p-2 hover:bg-gray-700">  
          <button onClick={() => {
            signOut(auth).then(() => {
              navigate('/');
            }).catch((error) => {
              navigate('/error');
            });
          }}>Logout</button>
          </div>
        </div>
        }
      </div>
    }
    </div>
  )
}

export default Header
