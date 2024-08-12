import {
    MdInsertChart,
  } from 'react-icons/md';

const navKitchen = [
    { to: '/makeit-vorders/today', name: 'Orders', exact: false, Icon: "false" },
  
    { to: "/makeit-vorders/history", name: 'Order History', exact: false, Icon: "false" }
  ];
  
export const navBarMakeitItems = [
    { to: '/', name: 'Kitchen', exact: true, Icon: MdInsertChart, submenu: true, submenuItem: navKitchen },
  ];