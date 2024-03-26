// import React from 'react';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaMicrophone } from 'react-icons/fa';

function NavBar(): JSX.Element {
  return (
    <>
      <nav>
        <h2>Model Store</h2>
        <ul>
          <li>
            <IoSettingsOutline />
          </li>
          <li>
            <FaMicrophone />
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
