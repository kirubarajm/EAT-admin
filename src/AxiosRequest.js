// import superagentPromise from 'superagent-promise';
// import _superagent from 'superagent';
// const superagent = superagentPromise(_superagent, global.Promise);
import axios from 'axios'

const API_ROOT = 'https://conduit.productionready.io/api';
//const BASE_URL_LIVE='http://13.232.246.20:3000/'
//const BASE_URL_LIVE='http://www.eatalltime.co.in:4000/'; // new server
//const BASE_URL_LIVE='http://eatalltime.co.in/'; // new server 5000
//const BASE_URL_LIVE='https://eatalltime.global:4433/'; // live server 5000
const BASE_URL_LIVE='http://157.245.104.126:3000/'; // live server 3000
//const BASE_URL_LIVE='http://68.183.87.233:4000/'; // live server 5000
//const BASE_URL_LIVE='http://eatalltime.global:4000/'; // new server 4000
//const BASE_URL_LIVE='http://eatalltime.global:6000/'; // new server 6000
//const BASE_URL_LIVE='http://localhost:4000/'; // new server
//const BASE_URL_LIVE='http://192.168.1.100:3000/';//DEV  Suresh
//const BASE_URL_LIVE='http://192.168.1.110:3000/';//DEV  praveen
//const BASE_URL_LIVE ='http://192.168.1.101:4000/';//DEV  Mysys eee
//const BASE_URL_LIVE ='http://192.168.42.75:4000/';//DEV  Mysys eee

//const BASE_URL_LIVE ='http://localhost:4000/';//DEV  Mysys wifi
//const BASE_URL_LIVE = 'http://192.168.43.103:4000/';//DEV  Mysys wifi
//const BASE_URL_LIVE = 'http://192.168.1.3:3000/';//DEV  Param
const API_BASE = BASE_URL_LIVE+'admin';//LIVE
const API_MASTER = BASE_URL_LIVE+'masters';
//Items already in cart
//Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?
//const encode = encodeURIComponent;
const responseBody = res => res.data;

let token = window.localStorage.getItem('jwt');
const tokenPlugin = req => {
  if (token) {
    req.set('headers', `Authorization: Token ${token}`);
  }
}

const fileUploadHeader= {'headers':{'Content-Type': 'multipart/form-data'}};
const AppVersion_1="1.0.0";
const AppVersion_2="2.0.0";
const AuthStr = {'headers':{ 'Authorization':'Token '.concat(token)}};

const requests = {
  del: url =>
  axios.del(`${API_ROOT}${url}`,tokenPlugin).then(responseBody),
  get: url =>
  axios.get(`${API_ROOT}${url}`,AuthStr).then(responseBody),
  put: (url, body) =>
  axios.put(`${API_ROOT}${url}`, body,tokenPlugin).then(responseBody),
  post: (url, body) =>
  axios.post(`${API_ROOT}${url}`, body, tokenPlugin).then(responseBody)
};


const setVersion=(version) =>{
  return ({headers: {'accept-version': version}});
}
  


const requestsAdmin = {
  del: (url,version) =>
  axios.delete(`${API_BASE}${url}`,setVersion(version)).then(responseBody),
  get: (url,version) =>
  axios.get(`${API_BASE}${url}`,setVersion(version)).then(responseBody),
  put: (url, body,version) =>
  axios.put(`${API_BASE}${url}`,body,setVersion(version)).then(responseBody),
  post: (url, body,version) =>
  axios.post(`${API_BASE}${url}`,body,setVersion(version)).then(responseBody)
};
const requestsMaster = {
  del: (url,version) =>
  axios.del(`${API_MASTER}${url}`,setVersion(version)).then(responseBody),
  get: (url,version) =>
  axios.get(`${API_MASTER}${url}`,setVersion(version)).then(responseBody),
  put: (url, body,version) =>
  axios.put(`${API_MASTER}${url}`,body,setVersion(version)).then(responseBody),
  post: (url, body,version) =>
  axios.post(`${API_MASTER}${url}`,body,setVersion(version)).then(responseBody)
};

const Admin ={
  login: (user) =>
  requestsAdmin.post('/login',user,AppVersion_1),
  update: (user) =>
  requestsAdmin.put('/pushupdate',user,AppVersion_1),
  logout: (user) =>
  requestsAdmin.post('/logout',user,AppVersion_1),
}

const Sales ={
  add: (user) =>
  requestsAdmin.post('/salesuser/add',user,AppVersion_1),
  userUpdate: (user) =>
  requestsAdmin.put('/salesuser/edit',user,AppVersion_1),
  getAll: (data) =>
  requestsAdmin.post('/salesusers',data,AppVersion_2),
  getsingle: (id) =>
  requestsAdmin.get('/salesuser/'+id,AppVersion_1),
  delete: (id) =>
  requestsAdmin.del('/'+id,AppVersion_1),
  getAppointments:()=>
  requestsAdmin.get('/appointments',AppVersion_1),
  appointmentReschedule:(data)=>
  requestsAdmin.post('/appointments/rescheduled',data,AppVersion_1),
  appointmentCancel:(data)=>
  requestsAdmin.post('/appointments/cancel',data,AppVersion_1),
  getAllAppointmentsFilter:(data)=>
  requestsAdmin.post('/appointmentlist',data,AppVersion_1),
  setAppointment:(allocationData)=>
  requestsAdmin.post('/appointment/assign',allocationData,AppVersion_1),
  fileUpload:(file)=>
  requestsAdmin.post('/sales/documentupload',file,fileUploadHeader,AppVersion_1)
}


const Makeit ={
  virtualUserAdd: (user) =>
  requestsAdmin.post('/makeituser/add',user,AppVersion_1),
  userEdit: (user) =>
  requestsAdmin.put('/makeituser/edit',user,AppVersion_1),
  getAll: (data) =>
  requestsAdmin.post('/makeitusers',data,AppVersion_1),
  getAllWithPercentage: (data) =>
  requestsAdmin.post('/makeit/kitchenpercentage',data,AppVersion_1),
  getUnapproved: (data) =>
  requestsAdmin.post('/unapproved/makeitlist',data,AppVersion_1),
  getsingle: (id) =>
  requestsAdmin.get('/makeituser/'+id,AppVersion_1),
  delete: (id) =>
  requestsAdmin.del('/'+id,AppVersion_1),
  unserviceable: (data) =>
  requestsAdmin.post('/makeit/unserviceable',data,AppVersion_1),
  onMakeitdelete: (data) =>
  requestsAdmin.put('/makeit/delete',data,AppVersion_1),
  fileUpload:(file)=>
  requestsAdmin.post('/makeit/documentupload',file,fileUploadHeader,AppVersion_1),
  getAllPackageMakeit: () =>
  requestsAdmin.get('/makeit/packagemakeitusers',AppVersion_1),
  
}

const MakeitProcess ={
  addItem: (Itemdata) =>
  requestsAdmin.post('/menuitem/add',Itemdata,AppVersion_1),
  addProduct: (productdata) =>
  requestsAdmin.post('/product/add',productdata,AppVersion_1),
  editItem: (Itemdata) =>
  requestsAdmin.put('/menuitem/edit',Itemdata,AppVersion_1),
  editProduct: (productdata) =>
  requestsAdmin.put('/product/edit',productdata,AppVersion_1),
  getAllItem: (user_id) =>
  requestsAdmin.get('/menuitems/'+user_id,AppVersion_1),
  getUnApprovedItem: (approveddata) =>
  requestsAdmin.post('/menuitem/unapprove',approveddata,AppVersion_1),
  getAllMenu: (productdata) =>
  requestsAdmin.post('/product',productdata,AppVersion_1),
  getKitchenProdcutPercentage: (data) =>
  requestsAdmin.post('/makeit/kitchenliveproductstatus',data,AppVersion_1),
  getUnApprovedProducts: (approveddata) =>
  requestsAdmin.post('/product/unapprove',approveddata,AppVersion_1),
  getAllLive: (user_id) =>
  requestsAdmin.get('/liveproduct/'+user_id,AppVersion_1),
  getsingleItem: (itemId) =>
  requestsAdmin.get('/menuitem/view/'+itemId,AppVersion_1),
  getsingleProdcut: (productId) =>
  requestsAdmin.get('/product/view/'+productId,AppVersion_1),
  movetolive: (productdata) =>
  requestsAdmin.post('/product/movetolive',productdata,AppVersion_1),
  editQuantity:(productdata) =>
  requestsAdmin.put('/product/addquantity',productdata,AppVersion_1),
  approvedProduct:(productdata) =>
  requestsAdmin.put('/product/approvestatus',productdata,AppVersion_1),
  approvedItems:(itemdata) =>
  requestsAdmin.put('/menuitem/approve',itemdata,AppVersion_1),
  orderStatusUpdate:(orderdata) =>
  requestsAdmin.put('/orderstatus/update',orderdata,AppVersion_1),
  orderCancel:(orderdata) =>
  requestsAdmin.put('/order/cancel',orderdata,AppVersion_1),
  preparedOrderCancel:(orderdata) =>
  requestsAdmin.put('/order/preparedcancel',orderdata,AppVersion_1),
  pickedupOrderCancel:(orderdata) =>
  requestsAdmin.put('/order/pickupcancel',orderdata,AppVersion_1),
  orderItemMissing:(orderdata) =>
  requestsAdmin.put('/order/refundcreate',orderdata,AppVersion_1),
  delete: (id) =>
  requestsAdmin.del('/product/'+id,AppVersion_1),
  getAllVirtualProduct: (data) =>
  requestsAdmin.post('/virtualproduct',data,AppVersion_1),
}


const Moveit ={
  userAdd: (user) =>
  requestsAdmin.post('/moveituser/add',user,AppVersion_1),
  userUpdate: (user) =>
  requestsAdmin.put('/moveituser/edit',user,AppVersion_1),
  getAll: (data) =>
  requestsAdmin.post('/moveitusers',data,AppVersion_1),
  getNearByMoveit: (data) =>
  requestsAdmin.post('/moveit/nearbyuser',data,AppVersion_1),
  getOrders:(filter_id)=>
  requestsAdmin.get('/orders/unassign/'+filter_id,AppVersion_1),
  assignOrder:(orderData)=>
  requestsAdmin.put('/order/assign',orderData,AppVersion_1),
  reassignOrder:(data)=>
  requestsAdmin.post('/orders/reassign',data,AppVersion_1),
  orderUnassign:(data)=>
  requestsAdmin.put('/order/movetoqueue',data,AppVersion_1),
  ordermovetoDunzo:(data)=>
  requestsAdmin.post('/dunzoorder/assign',data,AppVersion_1),
  orderunassigntoDunzo:(data)=>
  requestsAdmin.post('/dunzoorder/unassign',data,AppVersion_1),
  getsingle: (id) =>
  requestsAdmin.get('/moveituser/'+id,AppVersion_1),
  getcod: (data) =>
  requestsAdmin.post('/moveit/todayincome',data,AppVersion_1),
  getMoveitCurrentLocation: () =>
  requestsAdmin.post('/moveit/current_location',{data:1},AppVersion_1),
  forceLogout: (data) => 
  // {  "userid":11,"phoneno":"9751795821","login_status":3 }	
  requestsAdmin.post('/moveit/logout',data,AppVersion_1),
  delete: (id) =>
  requestsAdmin.del('/'+id,AppVersion_1),
  fileUpload:(file)=>
  requestsAdmin.post('/moveit/documentupload',file,fileUploadHeader,AppVersion_1),
  getDunzocodOrders:(data) =>
  requestsAdmin.post('/dunzovendor/orderlist',data,AppVersion_1),
  dunzoassignOrder:(orderData)=>
  requestsAdmin.post('/dunzoorder/assign',orderData,AppVersion_1),
}

const Eat ={
  virtualUserAdd: (user) =>
  requestsAdmin.post('/eatuser/add',user,AppVersion_1),
  getAll: (filter) =>
  requestsAdmin.post('/eatusers',filter,AppVersion_1),
  getAddress: () =>
  requestsAdmin.get('/addresslist',AppVersion_1),
  postOrder: (data) =>
  requestsAdmin.post('/order/add',data,AppVersion_1),
  getOrders:(data) =>
  requestsAdmin.post('/orders',data,AppVersion_1),
  getOrdersforUser:(data) =>
  requestsAdmin.post('/user/orderlist',data,AppVersion_1),
  getvOrders:(data) =>
  requestsAdmin.post('/vorders',data,AppVersion_1),
  getvOrdersHistory:(data) =>
  requestsAdmin.post('/vorders/history',data,AppVersion_1),
  getOrder:(id) =>
  requestsAdmin.get('/order/'+id,AppVersion_1),
  OrderQualityCheck:(data)=>
  requestsAdmin.post('/qualitychecklist',data,AppVersion_1),
  getsingle: (id) =>
  requestsAdmin.get('/eatuser/'+id,AppVersion_1),
  delete: (id) =>
  requestsAdmin.del('/eatuser/'+id,AppVersion_1),
  getWaitingOrders:() =>
  requestsAdmin.get('/orders/waitinglist',AppVersion_1),
  getOrdersQUEUE:(data) =>
  requestsAdmin.post('/orders',data,AppVersion_1),
  getDunzoOrders:(data) =>
  requestsAdmin.post('/dunzoorderlist',data,AppVersion_1),
}

const Liveproducts ={
  getAllProducts: (data) =>
  requestsAdmin.post('/product',data,AppVersion_1),
  getAllRestaurants: (data) =>
  requestsAdmin.post('/makeitusers',data,AppVersion_1),
  postApproval: (data) =>
  requestsAdmin.put('/makeituser/approval',data,AppVersion_1),
  getAllOrders:()=>
  requestsAdmin.get('/orders',AppVersion_1),
  checkAddCartDetail:(data)=>
  requestsAdmin.post('/cartdetails',data,AppVersion_1),
}

const Queries ={
  getAllQueriesUsers: (type) =>
  requestsAdmin.get('/query/userlist/'+type,AppVersion_1),
  getAllQueries: (data,AppVersion_1) =>
  requestsAdmin.post('/querylist',data,AppVersion_1),
  getAllReplies: (qid) =>
  requestsAdmin.get('/queryreplies/'+qid,AppVersion_1),
  readReplies: (qid) =>
  requestsAdmin.put('/queryread',qid,AppVersion_1),
  postReplies: (data) =>
  requestsAdmin.post('/queryanswer/',data,AppVersion_1),
  getQueriesUserDetail: (data,AppVersion_1) =>
  requestsAdmin.post('/query/userdetail',data,AppVersion_1),
}

const FAQ ={
  getAllFAQ: (type) =>
  requestsAdmin.get('/faqs/'+type,AppVersion_1),
  postFAQ: (data) =>
  requestsAdmin.post('/faq',data,AppVersion_1),
  deleteFAQ: (faqid) =>
  requestsAdmin.del('/faq/'+faqid,AppVersion_1),
}

const Accounts ={
  getRefundList: () =>
  requestsAdmin.get('/refundlist',AppVersion_1),
  repayment:(orderdata) =>
  requestsAdmin.post('/repayment',orderdata,AppVersion_1),
}

const Feedback ={
  getFeedback: () =>
  requestsAdmin.get('/feedback',AppVersion_1),
}

const Rating ={
  getOrderRating: (data) =>
  requestsAdmin.post('/ordersrating',data,AppVersion_1),
}

const MobileNumberVerify ={
  MobileOtpSend: (data,roleType) =>
  roleType===1?requestsAdmin.post('/sales/sendotp',data,AppVersion_1):requestsAdmin.post('/moveituser/sendotp',data,AppVersion_1),
  MobileOtpVerify: (data,roleType) =>
  roleType===1?requestsAdmin.post('/sales/otpverification',data,AppVersion_1):requestsAdmin.post('/moveituser/otpverification',data,AppVersion_1),
}

const Dashboard ={
  getDashboard:()=>
  requestsAdmin.get('/dashboard',AppVersion_1),
}

const Zone ={
  postZone:(data)=>
  requestsAdmin.post('/dashboard',data,AppVersion_1),
  getAllZone:(data)=>
  requestsAdmin.post('/zone/getall',data,AppVersion_1),
  updateZoneBoundaries:(data)=>
  requestsAdmin.put('/zone/update',data,AppVersion_1),
  updateZoneXfactors:(data)=>
  requestsAdmin.post('/zone/xfactorupdate',data,AppVersion_1),
}

const Orders ={
  getOrdersAmount:(data)=>
  requestsAdmin.post('/orders/amount',data,AppVersion_1),
  getOrdersProductCount:(data)=>
  requestsAdmin.post('/products/salescount',data,AppVersion_1),
  ordersPaymentSuccess:(data)=>
  requestsAdmin.put('/order/paymentstatus',data,AppVersion_1),
  ordersDelivedByAdmin:(data)=>
  requestsAdmin.put('/order/delivery',data,AppVersion_1),
  getOrdersMoveitReport:(data)=>
  requestsAdmin.post('/reports/moveitorders',data,AppVersion_1),
  getOrdersTurnaroundtimeMakeitReport:(data)=>
  requestsAdmin.post('/reports/orderturnaroundtime/makeit',data,AppVersion_1),
  getOrdersTurnaroundtimeMoveitReport:(data)=>
  requestsAdmin.post('/reports/orderturnaroundtime/moveit',data,AppVersion_1),
  getOrdersCanceledReport:(data)=>
  requestsAdmin.post('/reports/virtualkitchenordercanceled',data,AppVersion_1),
  getRealkitchenOrdersCanceledReport:(data)=>
  requestsAdmin.post('/reports/realkitchenordercanceled',data,AppVersion_1),
  getOrdersCostReport:(data)=>
  requestsAdmin.post('/reports/ordercost',data,AppVersion_1),
  getOrdersAdminDeliveryReport:(data)=>
  requestsAdmin.post('/reports/adminviadelivery',data,AppVersion_1),
  getnewUserReport:(data)=>
  requestsAdmin.post('/reports/newusersreport',data,AppVersion_1),
  getnewUserOrderReport:(data)=>
  requestsAdmin.post('/reports/newusersordersreport',data,AppVersion_1),
  getretainedCustomerReport:(data)=>
  requestsAdmin.post('/reports/retainedcustomerreport',data,AppVersion_1),
  getUserOrderhistoryReport:(data)=>
  requestsAdmin.post('/reports/userorderhistoryreport',data,AppVersion_1),
  getOrderReport:(data)=>
  requestsAdmin.post('/reports/ordersreport',data,AppVersion_1),
  getVirtualOrderReport:(data)=>
  requestsAdmin.post('/reports/virtualordersreport',data,AppVersion_1),
  getOriginalOrderReport:(data)=>
  requestsAdmin.post('/reports/realordersreport',data,AppVersion_1),
  getDriverCODReport:(data)=>
  requestsAdmin.post('/reports/driverwisecodreport',data,AppVersion_1),
  getAccountsReport:(data)=>
  requestsAdmin.post('/reports/salesaccountreport',data,AppVersion_1),
  getKitchenReport:(data)=>
  requestsAdmin.post('/reports/kitchenwisereport',data,AppVersion_1),
  getVirtualKitchenReport:(data)=>
  requestsAdmin.post('/reports/virtualmakeitearningsreport',data,AppVersion_1),
  getOriginalKitchenReport:(data)=>
  requestsAdmin.post('/reports/realmakeitearningsreport',data,AppVersion_1),
  getProducteport:(data)=>
  requestsAdmin.post('/reports/productwisereport',data,AppVersion_1),
  getVirtualProducteport:(data)=>
  requestsAdmin.post('/reports/productwisevirtualreport',data,AppVersion_1),
  getOriginalProducteport:(data)=>
  requestsAdmin.post('/reports/productwiserealreport',data,AppVersion_1),
  getOriginalKitchenPreparedAfterCancelreport:(data)=>
  requestsAdmin.post('/reports/realkitchenprepareaftercancel',data,AppVersion_1),
  getVirtualKitchenPreparedAfterCancelreport:(data)=>
  requestsAdmin.post('/reports/virtualkitchenprepareaftercancel',data,AppVersion_1),
  getOriginalKitchenPreparedBeforeCancelreport:(data)=>
  requestsAdmin.post('/reports/realkitchenpreparebeforecancel',data,AppVersion_1),
  getVirtualKitchenPreparedBeforeCancelreport:(data)=>
  requestsAdmin.post('/reports/virtualkitchenpreparebeforecancel',data,AppVersion_1),
  getKitchenWiseSuccessionRatereport:(data)=>
  requestsAdmin.post('/reports/kitchenpercentage_report',data,AppVersion_1),
  getVirtualordersPurchased:(data)=>
  requestsAdmin.post('/reports/virtualorderpurchased_report',data,AppVersion_1),
  getLostCustomerReport:(data)=>
  requestsAdmin.post('/reports/lostcustomerlist_report',data,AppVersion_1),
  getFunnelOrdersReport:(data)=>
  requestsAdmin.post('/reports/funnelorders_report',data,AppVersion_1),
  getXFatorsOrdersReport:(data)=>
  requestsAdmin.post('/reports/xfactororders_report',data,AppVersion_1),
  getMoveitOrdersDeliveryReport:(data)=>
  requestsAdmin.post('/reports/moveitordersdeliveryreport',data,AppVersion_1),
  getMileBasedMoveitOrdersDeliveryReport:(data)=>
  requestsAdmin.post('/reports/milebasedmoveitordersdeliveryreport',data,AppVersion_1),
  getMileBasedMoveitAverageDeliveryReport:(data)=>
  requestsAdmin.post('/reports/milebasedmoveitaveragedeliveryreport',data,AppVersion_1),
  getOnlineRefundedOrdersReport:(data)=>
  requestsAdmin.post('/reports/onlinerefundedcouponreport',data,AppVersion_1),
  getCouponUsedOrdersReport:(data)=>
  requestsAdmin.post('/reports/funnelrefundedcouponreport',data,AppVersion_1),
  getOrdersFinancialReport:(data)=>
  requestsAdmin.post('/reports/orderreport',data,AppVersion_1),
  getItemsWiseFinancialReport:(data)=>
  requestsAdmin.post('/reports/Itemwisereport',data,AppVersion_1),
  getMoveitMasterReport:(data)=>
  requestsAdmin.post('/reports/moveit_master_report',data,AppVersion_1),
  getMakeitMasterReport:(data)=>
  requestsAdmin.post('/reports/makeit_master_report',data,AppVersion_1),
  getCancelOrdersFollowUpReport:(data)=>
  requestsAdmin.post('/reports/cancelled_report_follow_up',data,AppVersion_1),
  getUnclosedOrdersReport:(data)=>
  requestsAdmin.post('/reports/unclosed_orders',data,AppVersion_1),
  getCustomerExperienceReport:(data)=>
  requestsAdmin.post('/reports/customerexperience',data,AppVersion_1),
  getZoneLevelPerformance:()=>
  requestsAdmin.get('/reports/zonelevelperformancereport',AppVersion_1),
  getUserGrowth:(data)=>
  requestsAdmin.post('/reports/eatusergrowth',data,AppVersion_1),
  onGetRawDataForLiveProduct:(data)=>
  requestsAdmin.post('/reports/liveproducthistoryrawreport',data,AppVersion_1),
  onGetRawDataForMakeitTimeLog:(data)=>
  requestsAdmin.post('/reports/makeitlograwreport',data,AppVersion_1),
  onGetRawDataForMoveitTimeLog:(data)=>
  requestsAdmin.post('/reports/moveitlograwreport',data,AppVersion_1),
  ordersCreateTicket:(data)=>
  requestsAdmin.post('/request_zendesk_ticket',data,AppVersion_1),
  getZendeskIssues:(data)=>
  requestsAdmin.post('/zendesk/issues',data,AppVersion_1),
}

const Master ={
  getRegion: () =>
  requestsMaster.get('/regionlist',AppVersion_1),
  getCuisine: () =>
  requestsMaster.get('/cuisinelist',AppVersion_1),
  getCluster: () =>
  requestsMaster.get('/clusterlist',AppVersion_1),
  getHomeDown: () =>
  requestsMaster.get('/homedownlist',AppVersion_1),
  getMovieitHub: () =>
  requestsMaster.get('/makeithub',AppVersion_1),
  getProductTag: () =>
  requestsMaster.get('/producttag',AppVersion_1),
 
}

const Stories ={
  storiesCreate: () =>
  requestsMaster.Post('/storiescreate',AppVersion_1),
}

const PackageBox ={
  getTypesofPackageList: () =>
  requestsAdmin.get('/packagingbox/getlist',AppVersion_1),
  getSingleTypeofPackage: (packageid) =>
  requestsAdmin.get('/packagingbox/getlist/'+packageid,AppVersion_1),
  addTypeOfPackage: (packagedata) =>
  requestsAdmin.post('/packagingbox/add',packagedata,AppVersion_1),
  editTypeOfPackage: (packagedata) =>
  requestsAdmin.put('/packagingbox/update',packagedata,AppVersion_1),
}

const PackageInventory ={
  getPackageInvetoryList: (userid) =>
  requestsAdmin.get('/packageinventory/getlist/'+userid,AppVersion_1),
  getPackageInvetoryMappedList: (userid) =>
  requestsAdmin.get('/packageinventory/getpackagemaplist/'+userid,AppVersion_1),
  getPackageInvetorysingle: (inventoryid) =>
  requestsAdmin.get('/packageinventory/'+inventoryid,AppVersion_1),
  getPackageInvetoryAllList: (data) =>
  requestsAdmin.post('/packageinventory/getallpackagelist',data,AppVersion_1),
  addPackageInventory: (packagedata) =>
  requestsAdmin.post('/packageinventory/add',packagedata,AppVersion_1),
  getPackageStockInvetoryList: (packagedata) =>
  requestsAdmin.post('/packageinventory/stocklist',packagedata,AppVersion_1),
  editPackageInventory: (packagedata) =>
  requestsAdmin.put('/packageinventory/update',packagedata,AppVersion_1),
}

const PushNotification ={
  getPushUserList: (data) =>
  requestsAdmin.post('/makeithub/user',data,AppVersion_1),
  sendPushNotification: (data) =>
  requestsAdmin.post('/user/sendnotification',data,AppVersion_1),
  getCoupon: () =>
  requestsAdmin.get('/coupon',AppVersion_1),
}




const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};



export default {
  Auth,
  Sales,
  Makeit,
  MakeitProcess,
  Moveit,
  Eat,
  Liveproducts,
  Queries,
  FAQ,
  Feedback,
  Accounts,
  Master,
  MobileNumberVerify,
  Dashboard,
  Orders,
  Stories,
  Admin,
  Rating,
  PackageBox,
  PackageInventory,
  Zone,
  PushNotification,
  setToken: _token => { token = _token; }
};