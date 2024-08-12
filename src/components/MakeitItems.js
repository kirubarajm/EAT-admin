import React from 'react';
import { Table } from 'reactstrap';
import {FaEdit} from 'react-icons/fa'
export default class MakeitItems extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    handleClick(index, item) {
        //if(item.approved_status!==1)
        this.props.itemEdit(item.menuitemid);
    }

    render() {
        var Items = this.props.Items||[];
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            Items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.menuitemid}</td>
                                    <td>{item.menuitem_name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.vegtype==='0'? 'Veg' : 'Non Veg'}</td>
                                    <td className='makeit-process-action'><FaEdit onClick={this.handleClick.bind(this, index, item)} color={item.approved_status===1?'green':'grey'}/></td>
                                </tr>
                            ))
                        }
                    </tbody>

                </Table>

            </div>
        );
    }
}
