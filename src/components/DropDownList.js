import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class DropDownList extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        const filterList = this.props.filterList;
        const filterSelected=this.props.filterSelected;
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                {filterSelected}
                </DropdownToggle>
                <DropdownMenu>
                    {filterList.map((item, i) => (
                        <DropdownItem key={i} onClick={this.props.filterTable(item)}>{item}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        );
    }
}