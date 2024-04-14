import React from 'react';
import * as FaIcons from 'react-icons/fa6';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io5';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiOutlineHome />,
    cName: 'nav-text'
  },
  {
    title: 'Devices',
    path: '/devices',
    icon: <FaIcons.FaComputer />,
    cName: 'nav-text'
  },
  {
    title: 'Bulbs',
    path: '/bulbs',
    icon: <IoIcons.IoBulbOutline />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <IoIcons.IoSettingsOutline />,
    cName: 'nav-text'
  },
];