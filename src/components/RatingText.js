import React from 'react';

class RatingText extends React.Component {
    constructor() {
      super();
      this.onChange = this.onChange.bind(this);
    }

    componentWillMount(){
        this.setState({value: '',isPrefill:true})
    }
    componentDidUpdate(nextProps, nextState) {
        if(this.state.isPrefill&&this.props.input.value){
            this.setState({isPrefill:false})
            this.setState({value:this.props.input.value})
        }
    }
  
    onChange(e) {
      this.setState({value: e.target.value})
      //const re = /^[0-5\b]+$/;
      // var re= /^[0-5]{1}([.][0-9]{1})?$/
      // if(parseInt(e.target.value)>4) re= /^[0-5]{1}([.][0]{1})?$/
      // if (e.target.value == '' || (re.test(e.target.value)&&e.target.value.length<4)) {
      //     this.setState({value: e.target.value})
      // }
    }

    

    
  
    render() {
     const { input,label ,required,meta} = this.props
     const { touched, error, warning} =meta;
      return (<div>
          <label className="label">{ label } <span className='must' hidden={!required}>*</span></label>
          <div><input {...input} autoComplete="off" type="number" value={this.state.value} onChange={this.onChange} placeholder={label}/>
          {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
          </div> </div>
          );
    }
  }

  export default RatingText;