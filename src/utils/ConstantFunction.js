
import { MasterOrderStatus,MasterOrderStatusV,MasterOrderStatusColor,LoginType, MasterPaymentTypeColor, MasterPaymentStatusColor } from './constant';

export const isFoodCycle = (item) => {
    var foodcycle = ''
    if (item.breakfast) foodcycle = foodcycle + 'Breakfast';
    if (item.lunch) foodcycle = foodcycle.length !== 0 ?foodcycle + ', Lunch':'Lunch';
    if (item.dinner) foodcycle = foodcycle.length !== 0 ?foodcycle + ', Dinner':'Dinner';
    return foodcycle;
}

export const isFoodCycleShort = (item) => {
    var foodcycle = ''
    if (item.breakfast) foodcycle = foodcycle + 'B';
    if (item.lunch) foodcycle = foodcycle.length !== 0 ?foodcycle + ', L':'L';
    if (item.dinner) foodcycle = foodcycle.length !== 0 ?foodcycle + ', D':'D';
    return foodcycle;
}

export const isDaysCycle = (item) => {
    var dayscycle = ''
    if (item.monday) dayscycle = dayscycle + 'Mon';
    if (item.tuesday) dayscycle = dayscycle.length === 0 ? 'Tues' : dayscycle + ', Tues';
    if (item.wednesday) dayscycle = dayscycle.length === 0 ? 'Wed' : dayscycle + ', Wed';
    if (item.thrusday) dayscycle = dayscycle.length === 0 ? 'Thr' : dayscycle + ', Thr';
    if (item.friday) dayscycle = dayscycle.length === 0 ? 'Fri' : dayscycle + ', Fri';
    if (item.saturday) dayscycle = dayscycle.length === 0 ? 'Sat' : dayscycle + ', Sat';
    if (item.sunday) dayscycle = dayscycle.length === 0 ? 'Sun' : dayscycle + ', Sun';
    return dayscycle;
}


export const getOrderStatus=(orderstatus) =>{
    orderstatus = orderstatus || 0;
    orderstatus = orderstatus > 7 ? 0 : orderstatus;
    var morder = MasterOrderStatus[orderstatus];
    return morder;
}

export const getOrderNextStatusValue=(orderstatus) =>{
    var morder = MasterOrderStatus[getOrderNextStatus(orderstatus)]
    return morder;
}
export const getOrderNextStatusValueV=(orderstatus) =>{
    var morder = MasterOrderStatusV[getOrderNextStatus(orderstatus)]
    return morder;
}

export const getOrderNextStatus=(orderstatus) =>{
    orderstatus = orderstatus || 0;
    orderstatus = orderstatus > 7 ? 0 : orderstatus;
    orderstatus = orderstatus+1;
    orderstatus = orderstatus ===2 ? 3:orderstatus; 
    return orderstatus;
}

export const getOrderStatusColor=(orderstatus) =>{
    orderstatus = orderstatus || 0;
    orderstatus = orderstatus > 7 ? 0 : orderstatus;
    return MasterOrderStatusColor[orderstatus];
}

export const isLoggedInUser=()=>{
    var loginDetail=getLoginDetail();
    var type=0;
    if(loginDetail&&loginDetail.loginsuccess) {
      type=loginDetail.logindetail.user_roleid;
    }
    return type;
}

export const getHubId=()=>{
    var loginDetail=getLoginDetail();
    var type=0;
    if(loginDetail) {
      type=loginDetail.logindetail.makeit_hubid;
    }
    return type;
}

export const getAdminId=()=>{
    var loginDetail=getLoginDetail();
    var type=0;
    if(loginDetail) {
      type=loginDetail.logindetail.admin_userid;
    }
    return type;
}

export const getpaymentStatusColor=(paymentstatus) =>{
    paymentstatus = paymentstatus || 0;
    return MasterPaymentStatusColor[paymentstatus];
}

export const getpaymentTypeColor=(paymenttype) =>{
    paymenttype = paymenttype || 0;
    return MasterPaymentTypeColor[paymenttype];
}

  export const getLoginTypeName=(login_type)=>{
      if(login_type) return LoginType[login_type];
      return LoginType[isLoggedInUser()];
  }

  export const getLoginDetail=()=>{
    let token = window.localStorage.getItem("login_detail")||false;
    var loginDetail=null;
    if(token) {
      loginDetail = JSON.parse(token);
    }
    return loginDetail;
}