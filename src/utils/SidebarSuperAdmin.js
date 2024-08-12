import {
    MdLocalDining,
    MdMotorcycle,
    MdFreeBreakfast,
    MdAssignment,
    MdInsertChart,
    MdBorderAll,
    MdNotifications,
    MdAttachMoney,
    MdDashboard
  } from 'react-icons/md';
import DashboardPage from '../pages/DashboardPage';
import SalesUserForm from '../pages/SalesUserForm';
import MakeitUserForm from '../pages/MakeitUserForm';
import EditMakeitUserForm from '../pages/EditMakeitUserForm';
import EatVirtualUserForm from '../pages/EatVirtualUserForm';
import MakeitUserList from '../pages/MakeitUserList';
import MoveitUserList from '../pages/MoveitUserList';
import AppointmentPage from '../pages/AppointmentPage';
import SalesmanPage from '../pages/SalesmanPage';
import MoveitUserForm from '../pages/MoveitUserForm';
import ViewSalesPage from '../pages/ViewSalesPage';
import ViewMakeitPage from '../pages/ViewMakeitPage';
import ViewMoveitPage from '../pages/ViewMoveitPage';
import EatUserList from '../pages/EatUserList';
import ViewEatPage from '../pages/ViewEatPage';
import ViewOrderPage from '../pages/ViewOrderPage';
import RestaurantsPage from '../pages/RestaurantsPage';
import LiveProductsPage from '../pages/LiveProductsPage';
import OrderAssignPage from '../pages/OrderAssignPage';
import OrdersPage from '../pages/OrdersPage';
import OrdersVirtualPage from '../pages/OrdersVirtualPage';
import CheckOutPage from '../pages/CheckOutPage';
import MakeitProcess from '../pages/MakeitProcess';
import QueriesUserPage from '../pages/QueriesUserPage';
import FAQPages from '../pages/FAQPages';
import Feedback from '../pages/Feedback';
import OrdersQueuePage from '../pages/OrdersQueuePage';
import CuisinePage from '../pages/CuisinePage';
import ApprovedPage from '../pages/ApprovedPage';
import ClusterPage from '../pages/ClusterPage';
import ApprovedProductDetail from '../pages/ApprovedProductDetail';
import KitchenApprovalPage from '../pages/KitchenApprovalPage';
import RefundPage from '../pages/RefundPage';
import EditSalesUserForm from '../pages/EditSalesUserForm';
import UnAcceptedOrders from '../pages/UnAcceptedOrders';
import MoveitCod from '../pages/MoveitCod';
import CashOnlinePage from '../pages/CashOnlinePage';
import StoriesCreate from '../pages/StoriesCreate';
import ReportPage from '../pages/ReportPage';
import OrderRating from '../pages/OrderRating';
import AppoinmentListPage from '../pages/AppoinmentListPage';
import MoveitLocationMap from '../pages/MoveitLocationMap';
import ZoneMapLocation from '../pages/ZoneMapLocation';
import QueriesPage from '../pages/QueriesPage';
import RegionPage from '../pages/RegionPage';
import PackageboxlistPage from '../pages/PackageboxlistPage';
import EditMovieitUserForm from '../pages/EditMovieitUserForm';
import PackageStockList from '../pages/PackageStockList';
import PackageInventoryPage from '../pages/PackageInventoryPage';
import PackageStockAlertList from '../pages/PackageStockAlertList';
import Pushnotification from '../pages/Pushnotification'
import DunzoOrderList from '../pages/DunzoOrderList';
import DunzoCodOrderAssign from '../pages/DunzoCodOrderAssign';
import ZoneXfatorlist from '../pages/ZoneXfatorlist';
import EatUserOrdersPage from '../pages/EatUserOrdersPage';
import VirtualProductList from '../pages/VirtualProductList';

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
    { to: '/virtualproduct', name: 'Virtual Products', exact: false, Icon: "false" },
  ];
  
  const navMoveIt = [
    { to: '/moveitadduser', name: 'Add User', exact: false, Icon: "false" },
    { to: '/moveit-detail', name: 'Moveit Detail', exact: false, Icon: "false" },
    { to: '/orders-assign', name: 'Orders Assign to Moveit', exact: false, Icon: "false" },
    { to: '/dunzocodorders', name: 'dunzo order', exact: false, Icon: "false" },
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
    // {
    //   to: '/makeit-package-inventrory',
    //   name: 'Package Inventory',
    //   exact: false,
    //   Icon: "false",
    // },
    // {
    //   to: '/package-stock-inventory',
    //   name: 'Package Stock',
    //   exact: false,
    //   Icon: "false",
    // },
    // {
    //   to: '/package-alert',
    //   name: 'PackagingAlert',
    //   exact: false,
    //   Icon: "false",
    // },
  
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
    ,
    {
      to:'/packaging-box',
      name:'Package Box',
      exact: false,
      Icon: "false",
    },
    {
      to:'/zonexfactors',
      name:'ZONE XFACATOR',
      exact: false,
      Icon: "false",
    }
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

  
  
  export const navBarSuperAdminItems = [
    { to: '/', name: 'Dashboard', exact: true, Icon: MdDashboard, submenu: false, submenuItem: null },
    { to: '/', name: 'Sales', exact: true, Icon: MdInsertChart, submenu: true, submenuItem: navSales },
    { to: '/', name: 'Makeit', exact: true, Icon: MdLocalDining, submenu: true, submenuItem: navMakeIt },
    { to: '/', name: 'Moveit', exact: true, Icon: MdMotorcycle, submenu: true, submenuItem: navMoveIt },
    { to: '/', name: 'Eat', exact: true, Icon: MdFreeBreakfast, submenu: true, submenuItem: navEat },
    { to: '/', name: 'Common', exact: true, Icon: MdAssignment, submenu: true, submenuItem: navCommon },
    { to: '/', name: 'Accounts', exact: true, Icon: MdAttachMoney, submenu: true, submenuItem: navAccounts },
    { to: '/', name: 'Master', exact: true, Icon: MdBorderAll, submenu: true, submenuItem: navMaster },
    { to: '/push-notification', name: 'Notification', exact: true, Icon: MdNotifications, submenu: false, submenuItem: null },
    { to: '/reports', name: 'Reports', exact: true, Icon: MdNotifications, submenu: false, submenuItem: null }
  ];


  export const navSuperAdminPathAndComponent = [
    { path: '/',components:DashboardPage },
    { path: '/salesadduser',components:SalesUserForm},
    { path: '/makeitadduser',components:MakeitUserForm},
    { path: '/makeit-edit/:userid',components:EditMakeitUserForm},
    { path:  '/eatvirtualuser',components:EatVirtualUserForm},
    { path:  '/makeit-detail',components:MakeitUserList},
    { path:  '/moveit-detail',components:MoveitUserList},
    { path:  '/appointment',components:AppointmentPage},
    { path:  '/sales-man-detail',components:SalesmanPage},
    { path:  '/moveitadduser',components:MoveitUserForm},
    { path:  '/viewsalesuser/:id',components:ViewSalesPage},
    { path:  '/viewmakeituser/:id',components:ViewMakeitPage},
    { path:  '/viewmoveituser/:id',components:ViewMoveitPage},
    { path:  '/eat-users-detail',components:EatUserList},
    { path:  '/vieweatuser/:id',components:ViewEatPage},
    { path:  '/vieworder/:id',components:ViewOrderPage},
    { path:  '/live-product',components:RestaurantsPage},
    { path:  '/restaurant/:restaurant',components:LiveProductsPage},
    { path:  '/orders-assign',components:OrderAssignPage},
    { path:  '/orders',components:OrdersPage},
    { path:  '/makeit-vorders',components:OrdersVirtualPage},
    { path:  '/checkout',components:CheckOutPage},
    { path:  '/makeitproduct/:makeitid',components:MakeitProcess},
    { path:  '/queries',components:QueriesPage},
    { path:  '/queries/:userid',components:QueriesPage},
    { path:  '/queries-user',components:QueriesUserPage},
    { path:  '/faq',components:FAQPages},
    { path:  '/feed-back',components:Feedback},
    { path:  '/order-queue',components:OrdersQueuePage},
    { path:  '/region',components:RegionPage},
    { path:  '/cuisine',components:CuisinePage},
    { path:  '/product-approved',components:ApprovedPage},
    { path:  '/cluster',components:ClusterPage},
    { path:  '/product-detail/:productid',components:ApprovedProductDetail},
    { path:  '/kitchen-approval',components:KitchenApprovalPage},
    { path:  '/order-refund',components:RefundPage},
    { path:  '/sales-edit/:id',components:EditSalesUserForm},
    { path:  '/waitingorders',components:UnAcceptedOrders},
    { path:  '/cashondelivery/:userid',components:MoveitCod},
    { path:  '/orders-amounts',components:CashOnlinePage},
    { path:  '/stories-create',components:StoriesCreate},
    { path:  '/reports',components:ReportPage},
    { path:  '/order-rating',components:OrderRating},
    { path:  '/makeit-appoinments',components:AppoinmentListPage},
    { path:  '/moveit-current-location',components:MoveitLocationMap},
    { path:  '/zone-draw',components:ZoneMapLocation},
    { path:  '/moveit-edit/:userid',components:EditMovieitUserForm},
    { path:  '/packaging-box',components:PackageboxlistPage},
    { path:  '/package-stock-inventory',components:PackageStockList},
    { path:  '/makeit-package-inventrory',components:PackageInventoryPage},
    { path:  '/package-alert',components:PackageStockAlertList},
    { path:  '/dunzoorders',components:DunzoOrderList},
    { path:  '/dunzocodorders',components:DunzoCodOrderAssign},
    { path:  '/push-notification',components:Pushnotification},
    { path:  '/zonexfactors',components:ZoneXfatorlist},
    { path:  '/user/order/:userid/:name',components:EatUserOrdersPage},
    { path:  '/virtualproduct',components:VirtualProductList},
    
  ];
  