import React from 'react'
import ReactAutocomplete from 'react-autocomplete'
var Items = [];
class RegionAutoCompleteInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '', isLoad: false
    }
  }

  componentWillMount() {
    this.setState({ isLoad: false })
  }

  componentDidUpdate(nextProps, nextState) {
    // if (this.props.Items.length>0&&!this.state.isLoad) {
    //   this.setState({ isLoad: true })
    //   if (this.props.isRegion) {
    //     Items = this.props.Items.forEach(function (item) {
    //       item.id = item.regionid;
    //       item.name = item.regionname
    //     })
    //   } else if (this.props.isCusine) {
    //     Items = this.props.Items.forEach(function (item) {
    //       item.id = item.cusineid;
    //       item.name = item.cusinename
    //     })
    //   }
    // }
  }

  render() {
    return (
      <ReactAutocomplete placeholder='Add Item'
        items={Items}
        shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.name}
        renderItem={(item, highlighted) =>
          <div
            key={item.id}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}>
            {item.name}
          </div>
        }
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        onSelect={(value, item) => {
          this.setState({ value: value })
          this.props.selectedItem(item);
        }}
      />
    )
  }
}


export default RegionAutoCompleteInput;