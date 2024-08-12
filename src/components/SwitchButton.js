import React, { Component } from "react";
import Switch from "react-switch";
 
export default class SwitchButton extends Component {
  constructor() {
    super();
    //this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(checked) {
   // this.setState({ checked });
    this.props.handleSwitchChange(this.props.item);
  }
 
  render() {
    return (
      <Switch onChange={this.handleChange} checked={this.props.item.unservicable?false:true} height={20} width={35}/>
    );
  }
}