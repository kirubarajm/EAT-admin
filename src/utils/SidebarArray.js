import {
    MdLocalDining,
    MdMotorcycle,
    MdFreeBreakfast,
    MdAssignment,
    MdInsertChart,
    MdBorderAll,
    MdAttachMoney,
    MdDashboard
  } from 'react-icons/md';
 

const navSales = [
    { to: '/salesadduser', name: 'Add User', exact: false, Icon: "false" },
    { to: '/sales-man-detail', name: 'Sales Man Detail', exact: false, Icon: "false" },
    { to: '/makeit-appoinments', name: 'Appoinments', exact: false, Icon: "false" },
    {
      to: '/appointment',
      name: 'Appointment Assign to Sales ',
      exact: false,
      Icon: "false",
    },
  ];
  
  const navMakeIt = [
    { to: '/makeitadduser', name: 'Add Virtual User', exact: false, Icon: "false" },
    { to: '/makeit-detail', name: 'MakeIt Detail', exact: false, Icon: "false" },
    { to: '/makeit-vorders', name: 'Virtual Orders', exact: false, Icon: "false" },
  ];
  
  const navMoveIt = [
    { to: '/moveitadduser', name: 'Add User', exact: false, Icon: "false" },
    { to: '/moveit-detail', name: 'Moveit Detail', exact: false, Icon: "false" },
    { to: '/orders-assign', name: 'Orders Assign to Moveit', exact: false, Icon: "false" },
    { to: '/zone-draw', name: 'Draw Zone', exact: false, Icon: "false" },
  ]
  
  const navCommon = [
    
    {
      to: '/kitchen-approval',
      name: 'Kitchen Approval',
      exact: false,
      Icon: "false",
    },
    {
      to: '/product-approved',
      name: 'Product Approval',
      exact: false,
      Icon: "false",
    },
    {
      to: '/waitingorders',
      name: 'Waiting Orders',
      exact: false,
      Icon: "false",
    },
    {
      to: '/order-queue',
      name: 'Queue Orders',
      exact: false,
      Icon: "false",
    },
    { to: '/queries-user', name: 'Queries', exact: false, Icon: "false" },
    { to: '/faq', name: 'FAQ', exact: false, Icon: "false" },
  
  ]
  
  const navEat = [
    { to: '/eatvirtualuser', name: 'New Virtual Eat User', exact: false, Icon: "false" },
    { to: '/eat-users-detail', name: 'Eat User Details', exact: false, Icon: "false" },
    {
      to: '/live-product',
      name: 'Virtual Order',
      exact: false,
      Icon: "false",
    },
    { to: '/orders', name: 'Orders', exact: false, Icon: "false" },
    { to: '/feed-back', name: 'Feedback', exact: false, Icon: "false" },
    { to: '/order-rating', name: 'Order Rating', exact: false, Icon: "false" }
    
  ];
  //{ to: '/stories-create', name: 'Stories', exact: false, Icon: "false" },
  const navMaster = [
    {
      to: '/region',
      name: 'Region',
      exact: false,
      Icon: "false",
    },
    { to: '/cuisine', name: 'Cuisine', exact: false, Icon: "false" },
    // { to: '/cluster', name: 'Cluster', exact: false, Icon: "false" },
  ]

  const navAccounts = [
    {
      to: '/order-refund',
      name: 'Refund',
      exact: false,
      Icon: "false",
    },

    {
      to: '/orders-amounts',
      name: 'Cod/online',
      exact: false,
      Icon: "false",
    }
  ]
  
  export const navBarItems = [
    { to: '/', name: 'Dashboard', exact: true, Icon: MdDashboard, submenu: false, submenuItem: null },
    { to: '/', name: 'Sales', exact: true, Icon: MdInsertChart, submenu: true, submenuItem: navSales },
    { to: '/', name: 'Makeit', exact: true, Icon: MdLocalDining, submenu: true, submenuItem: navMakeIt },
    { to: '/', name: 'Moveit', exact: true, Icon: MdMotorcycle, submenu: true, submenuItem: navMoveIt },
    { to: '/', name: 'Eat', exact: true, Icon: MdFreeBreakfast, submenu: true, submenuItem: navEat },
    { to: '/', name: 'Common', exact: true, Icon: MdAssignment, submenu: true, submenuItem: navCommon },
    { to: '/', name: 'Accounts', exact: true, Icon: MdAttachMoney, submenu: true, submenuItem: navAccounts },
    { to: '/', name: 'Master', exact: true, Icon: MdBorderAll, submenu: true, submenuItem: navMaster }
  ];