import {
    MdInsertChart,
  } from 'react-icons/md';

  const navSales = [
    { to: '/salesadduser', name: 'Add User', exact: false, Icon: "false" },
    { to: '/sales-man-detail', name: 'Sales Man Detail', exact: false, Icon: "false" },
    { to: '/makeit-appoinments', name: 'Appoinments', exact: false, Icon: "false" },
    {to: '/appointment',
      name: 'Appointment Assign to Sales ',
      exact: false,
      Icon: "false",
    },
    {to: '/reports',
      name: 'Reports',
      exact: false,
      Icon: "false",
    },
  ];
  
export const navBarSalesItems = [
    { to: '/', name: 'Sales', exact: true, Icon: MdInsertChart, submenu: true, submenuItem: navSales },
  ];