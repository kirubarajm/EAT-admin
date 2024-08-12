import {
    MdMotorcycle,
  } from 'react-icons/md';
import MoveitUserForm from '../pages/MoveitUserForm';
import MoveitUserList from '../pages/MoveitUserList';
import OrderAssignPage from '../pages/OrderAssignPage';
import ViewMoveitPage from '../pages/ViewMoveitPage';
import EditMovieitUserForm from '../pages/EditMovieitUserForm';
import MoveitCod from '../pages/MoveitCod';
import OrdersPage from '../pages/OrdersPage';
import ViewOrderPage from '../pages/ViewOrderPage';
import MoveitLocationMap from '../pages/MoveitLocationMap';

const navMoveIt = [
    { to: '/moveitadduser', name: 'Add User', exact: false, Icon: "false",component:MoveitUserForm },
    { to: '/moveit-detail', name: 'Moveit Detail', exact: false, Icon: "false",component:MoveitUserList},
    { to: '/orders-assign', name: 'Orders Assign to Moveit', exact: false, Icon: "false",component:OrderAssignPage},
    { to: '/orders', name: 'Orders', exact: false, Icon: "false",component:ViewMoveitPage},
  ];

export const navMovePathAndComponent = [
    { path: '/moveitadduser',components:MoveitUserForm },
    { path: '/moveit-detail',components:MoveitUserList},
    { path: '/orders-assign',components:OrderAssignPage},
    { path: '/viewmoveituser/:id',components:ViewMoveitPage},
    { path:  '/moveit-edit/:userid',components:EditMovieitUserForm},
    { path:  '/cashondelivery/:userid',components:MoveitCod},
    { path:  '/orders',components:OrdersPage},
    { path:  '/vieworder/:id',components:ViewOrderPage},
    { path:  '/moveit-current-location',components:MoveitLocationMap},
  ];
  
export const navBarMoveitItems = [
    { to: '/', name: 'Moveit', exact: true, Icon: MdMotorcycle, submenu: true, submenuItem: navMoveIt },
  ];


