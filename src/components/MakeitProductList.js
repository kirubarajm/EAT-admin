import React from 'react';
import { Table } from 'reactstrap';
import {FaEdit,FaExternalLinkAlt,FaTrashAlt} from 'react-icons/fa'
import SwitchButtonCommon from "./SwitchButtonCommon";

export default class MakeitProductList extends React.Component {
    handleClick(index, item) {
        if(item.active_status!==1)
        this.props.itemEdit(item.productid);
    }
    handleViewClick(index, productID) {
        this.props.itemView(productID,false);
    }

    handleDeleteClick(index, item) {
        if(item.active_status!==1)
        this.props.productDelete(item.productid,false);
    }

    handleLiveChange(index, item) {
        this.props.addCount(item);
    }


    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Selling Price</th>
                            <th>Quantity</th>
                            <th>Type</th>
                            <th>Live</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.products.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.productid}</td>
                                    <td>{item.product_name} <span hidden={item.active_status!==1}><span className={item.active_status===1?'mr-l-10 live-bg':''}> </span> <span className='color-grey font-size-10'>live</span></span></td>
                                    <td>{item.original_price}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.vegtype==='0'? 'Veg' : 'Non Veg'}</td>
                                    <td><SwitchButtonCommon  handleSwitchChange={this.handleLiveChange.bind(this, index, item)} checked={item.active_status===1?true:false}></SwitchButtonCommon> </td>
                                    <td className='makeit-process-action'>
                                    <FaExternalLinkAlt className='mr-r-10' onClick={this.handleViewClick.bind(this, index, item.productid)}/>
                                    <FaEdit className='mr-r-10' onClick={this.handleClick.bind(this, index, item)} color={item.active_status===1?'grey':''}/>
                                    {/* <FaTrashAlt onClick={this.handleDeleteClick.bind(this, index, item)} size={18} color={item.active_status===1?'grey':''}/>*/}</td> 
                                </tr>
                            ))
                        }
                    </tbody>

                </Table>

            </div>
        );
    }
}
