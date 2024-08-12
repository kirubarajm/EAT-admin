import React from 'react';
export default class MakeitSubmenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
    }

    handleClick(index, props) {
        this.setState({ activeIndex: index });
        this.props.showList(index);
    }

    render() {
        return (
            <div className='pd-0'>
                {
                    this.props.menu.map(function (menu, index) {
                        const className = this.state.activeIndex === index ? 'active' : '';
                        return (
                            <div className={className} key={index} onClick={this.handleClick.bind(this, index, this.props)}>
                                {menu.name}
                            </div>
                        );
                    }, this)
                }
            </div>
        );
    }
}
