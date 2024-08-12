import auth from './reducers/auth';
import { combineReducers } from 'redux';
import common from './reducers/common';
import home from './reducers/home';
import salesuser from './reducers/salesuser'
import makeituser from './reducers/makeituser'
import eatvirtualuser from './reducers/eatvirtualuser'
import makeituserlist from './reducers/makeituserlist'
import appointment from './reducers/appointment'
import salesman from './reducers/salesman'
import viewsales from './reducers/viewsales'
import viewmakeit from './reducers/viewmakeit'
import viewmoveit from './reducers/viewmoveit'
import moveituser from './reducers/moveituser'
import moveituserlist from './reducers/moveituserlist'
import eatuserlist from './reducers/eatuserlist'
import vieweatuser from './reducers/vieweatuser'
import liveproduct from './reducers/liveproduct'
import orders from './reducers/orders'
import restaurants from './reducers/restaurants'
import checkout from './reducers/checkout'
import ordersassign from './reducers/ordersassign'
import vieworder from './reducers/vieworder'
import makeitprocess from './reducers/makeitprocess'
import editmakeitform from './reducers/editmakeitform'
import iteminventory from './reducers/iteminventory'
import product from './reducers/product'
import productdetail from './reducers/productdetail'
import queries from './reducers/queries'
import faq from './reducers/faq'
import feedback from './reducers/feedback'
import makeitapproved from './reducers/makeitapproved'
import productapprovedetail from './reducers/productapprovedetail'
import makeitunapproved from './reducers/makeitunapproved'
import refund from './reducers/refund'
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import mobileverify from './reducers/mobileverify'
import queriesUsers from './reducers/queriesUsers'
import unacceptedorders from './reducers/unacceptedorders'
import moveitcod from './reducers/moveitcod'
import cashonline from './reducers/cashonline'
import storiescreate from './reducers/storiescreate'
import reports from './reducers/reports'
import appointmentlist from './reducers/appointmentlist'
import orderrating from './reducers/orderrating'
import moveitmaplocation from './reducers/moveitmaplocation'
import orderqueue from './reducers/orderqueue'
import packageadddetail from './reducers/packageadddetail'
import packageboxlist from './reducers/packageboxlist'
import packageinventory from './reducers/packageinventory'
import packagestocklist from './reducers/packagestocklist'
import packageinventorylist from './reducers/packageinventorylist'
import packagestockalertlist from './reducers/packagestockalertlist'
import pushnotificationlist from './reducers/pushnotificationlist'
import dunzoorders from './reducers/dunzoorders'
import dunzocodorders from './reducers/dunzocodorders'
import zonexfactorupdate from './reducers/zonexfactorupdate'
import zonexfactorlist from './reducers/zonexfactorlist'
import eatuserorders from './reducers/eatuserorders'
import virtualproductlist from './reducers/virtualproductlist'

export default combineReducers({
  auth,
  common,
  home,
  salesuser,
  makeituser,
  eatvirtualuser,
  makeituserlist,
  appointment,
  salesman,
  viewsales,
  viewmakeit,
  viewmoveit,
  moveituser,
  moveituserlist,
  eatuserlist,
  vieweatuser,
  liveproduct,
  orders,
  restaurants,
  checkout,
  ordersassign,
  vieworder,
  makeitprocess,
  iteminventory,
  product,
  editmakeitform,
  productdetail,
  queries,
  faq,
  feedback,
  makeitapproved,
  productapprovedetail,
  makeitunapproved,
  refund,
  mobileverify,
  queriesUsers,
  unacceptedorders,
  moveitcod,
  cashonline,
  storiescreate,
  reports,
  orderrating,
  appointmentlist,
  moveitmaplocation,
  orderqueue,
  packageadddetail,
  packageboxlist,
  packageinventory,
  packagestocklist,
  packageinventorylist,
  packagestockalertlist,
  pushnotificationlist,
  dunzoorders,
  dunzocodorders,
  zonexfactorlist,
  zonexfactorupdate,
  eatuserorders,
  virtualproductlist,
  router: routerReducer,
  form: formReducer
});
