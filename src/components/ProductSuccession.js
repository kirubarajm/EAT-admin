import React from 'react';
import { Table } from 'reactstrap';
export default class ProductSuccession extends React.Component {
    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Total Product Count</th>
                            <th>Soldout Count</th>
                            <th>Succession Rate %</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.products.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.product_id}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.total_quantity}</td>
                                    <td>{item.sold_quantity}</td>
                                    <td>{item.product_percentage}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </Table>

            </div>
        );
    }
}
