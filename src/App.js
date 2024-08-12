import React from "react";
import "./App.css";
import MainLayout from "./components/MainLayout";
import EmptyLayout from "./components/EmptyLayout";
import "./styles/reduction.css";
import { Switch, withRouter, Redirect } from "react-router-dom";
import LayoutRoute from "./components/LayoutRoute";
import Signup from "./pages/Signup";
import { connect } from "react-redux";
import { APP_LOAD, REDIRECT } from "./constants/actionTypes";
import { loadProgressBar } from "axios-progress-bar";
import Notifications from "react-notify-toast";
import OrdersVirtualPage from "./pages/OrdersVirtualPage";

import {
  ADMIN_LOGIN,
  DEFULT_LOGIN,
  Eat_Assistant_LOGIN,
  SUPER_ADMIN_LOGIN,
  MOVEIT_LOGIN,
  Logistics_Manager_LOGIN
} from "./utils/constant";
import { isLoggedInUser } from "./utils/ConstantFunction";
import ViewVirtualOrderPage from "./pages/ViewVirtualOrderPage";
import OrdersHistoryVirtualPage from "./pages/OrdersHistoryVirtualPage";
import {navMovePathAndComponent} from "./utils/SidebarMoveit"
import { navAdminPathAndComponent } from "./utils/SidebarAdmin";
import {navSuperAdminPathAndComponent} from "./utils/SidebarSuperAdmin";
import {navLogisticsPathAndComponent} from "./utils/SidebarLogisticsManager";
const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo,
    cartcount: state.common.cartcount
  };
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  // onLogout: (data) => dispatch({ type: LOGOUT,payload: AxiosRequest.Admin.logout(data)}),
  onRedirect: () => dispatch({ type: REDIRECT })
});
class App extends React.Component {
  async componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    loadProgressBar();
    if (nextProps.redirectTo) {
      this.props.history.push(nextProps.redirectTo);
      this.props.onRedirect();
    }
  }
  componentWillMount() {
    if (this.props.redirectTo) {
      this.props.history.push(this.props.redirectTo);
    }
  }

  render() {
    if (isLoggedInUser() === DEFULT_LOGIN) {
      return (
        <div>
          <Notifications options={{ zIndex: 1052, top: "0px" }} />
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={Signup}
            />
            <Redirect to="/login" />
          </Switch>
        </div>
      );
    } else if (
      isLoggedInUser() === SUPER_ADMIN_LOGIN
    ) {
      return (
        <div>
          <Notifications options={{ zIndex: 1052, top: "0px" }} />
          <Switch>
          {navSuperAdminPathAndComponent.map((item, i) => (
            <LayoutRoute 
              exact
              path={item.path}
              layout={MainLayout}
              component={item.components}
            />
          ))}
           <Redirect to="/" />
          </Switch>
          </div>
      )
    }else if (
      isLoggedInUser() === ADMIN_LOGIN
    ) {
      return (
        <div>
          <Notifications options={{ zIndex: 1052, top: "0px" }} />
          <Switch>
          {navAdminPathAndComponent.map((item, i) => (
            <LayoutRoute 
              exact
              path={item.path}
              layout={MainLayout}
              component={item.components}
            />
          ))}
           <Redirect to="/" />
          </Switch>
          }
        </div>
      );
    }else if (
      isLoggedInUser() === Logistics_Manager_LOGIN
    ) {
      return (
        <div>
          <Notifications options={{ zIndex: 1052, top: "0px" }} />
          <Switch>
          {navLogisticsPathAndComponent.map((item, i) => (
            <LayoutRoute 
              exact
              path={item.path}
              layout={MainLayout}
              component={item.components}
            />
          ))}
           <Redirect to="/" />
          </Switch>
          }
        </div>
      );
    } else if (isLoggedInUser() === Eat_Assistant_LOGIN) {
      return (
        <div>
          <Notifications options={{ zIndex: 1052, top: "0px" }} />
          <Switch>
            <LayoutRoute
              exact
              path="/vieworder/:id"
              layout={MainLayout}
              component={ViewVirtualOrderPage}
            />
            <LayoutRoute
              exact
              path="/makeit-vorders/today"
              layout={MainLayout}
              component={OrdersVirtualPage}
            />

            <LayoutRoute
              exact
              path="/makeit-vorders/history"
              layout={MainLayout}
              component={OrdersHistoryVirtualPage}
            />

            <LayoutRoute
              exact
              path="/makeit-vorders"
              layout={MainLayout}
              component={OrdersVirtualPage}
            />

            <Redirect to="/makeit-vorders" />
          </Switch>
        </div>
      );
    } else if (isLoggedInUser() === MOVEIT_LOGIN) {
      return (
        <div>
          <Notifications options={{ zIndex: 1052, top: "0px" }} />
          <Switch>
          {navMovePathAndComponent.map((item, i) => (
            <LayoutRoute key={i}
              exact
              path={item.path}
              layout={MainLayout}
              component={item.components}
            />
          ))}
           <Redirect to="/moveit-detail" />
          </Switch>
          {/* <Switch>
            <LayoutRoute
              exact
              path="/moveitadduser"
              layout={MainLayout}
              component={MoveitUserForm}
            />
            <LayoutRoute
              exact
              path="/moveit-detail"
              layout={MainLayout}
              component={MoveitUserList}
            />

            <LayoutRoute
              exact
              path="/orders-assign"
              layout={MainLayout}
              component={OrderAssignPage}
            />

            <LayoutRoute
              exact
              path="/viewmoveituser/:id"
              layout={MainLayout}
              component={ViewMoveitPage}
            />

            <LayoutRoute
              exact
              path="/moveit-edit/:userid"
              layout={MainLayout}
              component={EditMovieitUserForm}
            />

            <LayoutRoute
              exact
              path="/cashondelivery/:userid"
              layout={MainLayout}
              component={MoveitCod}
            />

            <LayoutRoute
              exact
              path="/orders"
              layout={MainLayout}
              component={OrdersPage}
            />

            <LayoutRoute
              exact
              path="/vieworder/:id"
              layout={MainLayout}
              component={ViewOrderPage}
            />

            <Redirect to="/moveit-detail" />
          </Switch> */}
        </div>
      );
    } else {
      return (
        <div>
          <Notifications options={{ zIndex: 1052, top: "0px" }} />
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={Signup}
            />
            <Redirect to="/login" />
          </Switch>
        </div>
      );
    }
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
