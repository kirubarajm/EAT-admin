import React from "react";
import { Table } from "reactstrap";
import Moment from "moment";

export default class PackageInventory extends React.Component {
  render() {
      const packageInventorylist= this.props.productsInventorylist|| []
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Package Id</th>
              <th>Package Name</th>
              <th>Date</th>
              <th>Count</th>
            </tr>
          </thead>

          <tbody>
            {packageInventorylist.map((item, index) => (
              <tr key={index}>
                <td>{item.packageid}</td>
                <td>{item.name}</td>
                <td>{Moment(item.created_at).format("DD-MMM-YYYY/hh:mm a")}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
