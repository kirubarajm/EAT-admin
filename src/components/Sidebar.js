import logo200Image from '../assets/img/logo/tovo_logo.png'
import sidebarBgImage from '../assets/img/sidebar/sidebar-14.jpg'
import SourceLink from './SourceLink';
import React from 'react';
import {
  MdKeyboardArrowDown,
} from 'react-icons/md';

import { navBarItems} from '../utils/SidebarArray'
import { navBarMakeitItems} from '../utils/Sidebar_makeit'
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from '../utils/bemnames';
import {isLoggedInUser} from '../utils/ConstantFunction'
import { version } from '../../package.json';
import { navBarMoveitItems } from '../utils/SidebarMoveit';
import { navBarAdminItems } from '../utils/SidebarAdmin';
import { CURRENT_SELECTION_SIDE_NAV } from '../constants/actionTypes';
import { navBarSuperAdminItems } from '../utils/SidebarSuperAdmin';
import { navBarLogisticsItems } from '../utils/SidebarLogisticsManager';
const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};


var navItems= navBarMakeitItems;
const bem = bn.create('sidebar');

function NavItems(props) {
  if (props.submenu) {
    return (
    <div>
      <NavItem
        className={bem.e('nav-item')}
        onClick={props.handleClick(props.name)}>
        <BSNavLink className={bem.e('nav-item-collapse')}>
          <div className="d-flex">
            <props.Icon className={bem.e('nav-item-icon')} />
            <span className="text-uppercase align-self-start">{props.name}</span>
          </div>
          <MdKeyboardArrowDown
            className={bem.e('nav-item-icon')}
            style={{
              padding: 0,
              transform: props.state[`isOpen${props.name}`]
                ? 'rotate(0deg)'
                : 'rotate(-90deg)',
              transitionDuration: '0.3s',
              transitionProperty: 'transform',
            }}
          />
        </BSNavLink>
      </NavItem>
      <Collapse isOpen={props.state[`isOpen${props.name}`]} >
        {props.submenuItem.map(({ to, name, exact, Icon }, index) => (
          <NavItem key={index} className={bem.e('nav-item')} 
          onClick={props.handleColClick(props.name)}>
            <BSNavLink
              id={`navItem-${name}-${index}`}
              className="text-uppercase"
              tag={NavLink}
              to={to}
              activeClassName="active"
              exact={exact}>
              {/* <Icon className={bem.e('nav-item-icon')} /> */}
              <span className="nav-collapse-item">{name}</span>
            </BSNavLink>
          </NavItem>
        ))}
      </Collapse> 
    </div>
    )
  }

  return (
  <NavItem className={bem.e('nav-item')} onClick={props.handleColClick(props.name)}>
    <BSNavLink
      id={`navItem-${props.name}-${props.index}`}
      className="text-uppercase"
      tag={NavLink}
      to={props.to}
      activeClassName="active"
      exact={props.exact}>
      <props.Icon className={bem.e('nav-item-icon')} />
      <span className="">{props.name}</span>
    </BSNavLink>
  </NavItem>
  );
}

// const mapStateToProps = state => ({
//   ...state.sidebarredu,
// });
// const mapDispatchToProps = dispatch => ({
//   onSetSideNavSelection: (name,isOpen) =>
//       dispatch({ type: CURRENT_SELECTION_SIDE_NAV, name,isOpen}),
 

// })

class Sidebar extends React.Component {
  state = {
    isOpenSales: false,
    isOpenMakeIt: false,
    isOpenMoveIt: false,
    isOpenEat: false,
    isOpenCommon: false,
    isOpenAccounts: false,
    isAutoOpen:true,
  };
  
  componentWillMount() {
    
  }
  componentDidMount(){
    // if(this.props.side_selection_name){
    //   this.setState(prevState => {
    //     return {
    //       [`isOpen${this.props.side_selection_name}`]: this.props.iselectionOpen,
    //     };
    //   });
    // }
  }
  
  componentDidUpdate(nextProps, nextState) {
    var ptname=window.location.pathname;
    //order-refund
    if (
      (ptname.includes("/queries")|| ptname.includes("/kitchen-approval")
      || ptname.includes("/product-approved")) &&!this.state.isOpenCommon &&this.state.isAutoOpen
    ) {
      var name='Common'
      this.setState(prevState => {
        const isOpen = prevState[`isOpen${name}`];
        return {
          [`isOpen${name}`]: !isOpen,
        };
      });
      this.setState({
        isAutoOpen: false
      });
    }else if (ptname.includes("/orders-assign")&&!this.state.isOpenMoveit &&this.state.isAutoOpen
    ) {

      var name='Moveit'
      this.setState(prevState => {
        const isOpen = prevState[`isOpen${name}`];
        return {
          [`isOpen${name}`]: !isOpen,
        };
      });
      this.setState({
        isAutoOpen: false
      });
    }else if (ptname.includes("/appointment") &&!this.state.isOpenSales &&this.state.isAutoOpen
    ) {

      var name='Sales'
      this.setState(prevState => {
        const isOpen = prevState[`isOpen${name}`];
        return {
          [`isOpen${name}`]: !isOpen,
        };
      });
      this.setState({
        isAutoOpen: false
      });
    }else if (ptname.includes("/order-refund") &&!this.state.isOpenAccounts &&this.state.isAutoOpen
    ) {

      var name='Accounts'
      this.setState(prevState => {
        const isOpen = prevState[`isOpen${name}`];
        return {
          [`isOpen${name}`]: !isOpen,
        };
      });
      this.setState({
        isAutoOpen: false
      });
    }else if (ptname.includes("/orders") &&!ptname.includes("/orders-amounts") &&!this.state.isOpenEat &&this.state.isAutoOpen
    ) {

      var name='Eat'
      this.setState(prevState => {
        const isOpen = prevState[`isOpen${name}`];
        return {
          [`isOpen${name}`]: !isOpen,
        };
      });
      this.setState({
        isAutoOpen: false
      });
    }
  }
  handleClick = name => () => {
    
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];
     // this.props.onSetSideNavSelection(name,!isOpen);
      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
    this.setState({
      isAutoOpen: false
    });
  };

  handleColClick=  name => () => {
    this.setState({
      isAutoOpen: true
    });
  };

  ongetSideBar(){
    var roleid=isLoggedInUser();
    switch(roleid){
      case 1:
        return navBarSuperAdminItems;
      break;
      case 2:
          return navBarAdminItems;
      break;
      case 4:
      case 5:
        return navBarLogisticsItems;
      case 6:
        return navBarItems;
      break;
      case 3:
        return navBarMakeitItems;
      break;
      case 7:
        return navBarMoveitItems;
      break;
      default:
          return navBarItems;
        break;
    }
  }


  render() {
    navItems= this.ongetSideBar();
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">
                TOVO ADMIN
              </span>
            </SourceLink>
            <div className='admin-version'>version - {version}</div>
          </Navbar>

          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon, submenu, submenuItem }, index) => (
              <NavItems key={index} to={to} name={name} exact={exact} Icon={Icon} submenu={submenu} submenuItem={submenuItem} index={index} handleClick={this.handleClick}
                state={this.state} handleColClick={this.handleColClick}/>
            ))}
          </Nav>
        </div>
      </aside>
    );
  }
}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Sidebar);
export default Sidebar;
