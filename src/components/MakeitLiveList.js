import React from 'react';
import { Table } from 'reactstrap';
import { FaExternalLinkAlt } from 'react-icons/fa'
import { isFoodCycleShort } from '../utils/ConstantFunction';
export default class MakeitLiveList extends React.Component {
    handleClick(index, productID) {
        this.props.itemView(productID,true);
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
                            <th>Quantity</th>
                            <th>Food Cycle</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.products.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.productid}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{isFoodCycleShort(item)}</td>
                                    <td>{item.vegtype==="0"? 'Veg' : 'Non Veg'}</td>
                                    <td className='makeit-process-action'><FaExternalLinkAlt onClick={this.handleClick.bind(this, index, item.productid)}/></td>
                                </tr>
                            ))
                        }
                    </tbody>

                </Table>

            </div>
        );
    }
}
