import React from 'react'
import { FaChevronUp,FaChevronDown,FaCheck } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
class SelectOption extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      values: [],
      selected: [],
      focusedValue: -1,
      isFocused: false,
      isOpen: false,
      isError:false,
      isPrefill:true,
      typed: ''
    }
  }

  componentWillMount(){
    // if(this.state.isPrefill&&this.props.values){
    //   this.setState({values:this.props.values})
    //   this.setState({selected:this.props.cids})
    // }
    
    this.setState({isError:this.props.isError});
    
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClick = this.onClick.bind(this);

    this.onDeleteOption = this.onDeleteOption.bind(this);
    this.onHoverOption = this.onHoverOption.bind(this);
    this.onClickOption = this.onClickOption.bind(this);
    this.renderOption = this.renderOption.bind(this);
  }

  componentDidUpdate(nextProps, nextState) {
    if(this.state.isPrefill&&this.props.values){
      this.setState({isPrefill:false})
      this.setState({values:this.props.values})
      this.setState({selected:this.props.cids})
    }
  }
  
  onFocus() {
    this.setState({
      isFocused: true
    })
  }
  
  onBlur() {
    const { options, multiple } = this.props
    
    this.setState(prevState => {
      const { values } = prevState
      
      if (multiple) {
        return {
          focusedValue: -1,
          isFocused: false,
          isOpen: false
        }
      } else {
        const value = values[0]
        
        let focusedValue = -1 
        
        if (value) {
          focusedValue = options.findIndex(option => option.value === value)
        }

        return {
          focusedValue,
          isFocused: false,
          isOpen: false
        }
      }
    })
  }
  
  onKeyDown(e) {
    const { options, multiple } = this.props
    const { isOpen } = this.state
    
    switch (e.key) {
      case ' ':
        e.preventDefault()
        if (isOpen) {
          if (multiple) {
            this.setState(prevState => {
              const { focusedValue } = prevState

              if (focusedValue !== -1) {
                const [ ...values ] = prevState.values
                const value = options[focusedValue].value
                const index = values.indexOf(value)

                if (index === -1) {
                  values.push(value)
                } else {
                  values.splice(index, 1)            
                }

                return { values }
              }
            })
          }
        } else {
          this.setState({
            isOpen: true
          })
        }
        break
      case 'Escape':
      case 'Tab':
        if (isOpen) {
          e.preventDefault()
          this.setState({
            isOpen: false
          })
        }
        break
      case 'Enter':
        this.setState(prevState => ({
          isOpen: !prevState.isOpen
        }))
        break
      case 'ArrowDown':
        e.preventDefault()
        this.setState(prevState => {
          let { focusedValue } = prevState
          
          if (focusedValue < options.length - 1) {
            focusedValue++

            if (multiple) {
              return {
                focusedValue
              }
            } else {
              return {
                values: [ options[focusedValue].value ],
                focusedValue
              }
            }
          }
        })
        break
      case 'ArrowUp':
        e.preventDefault()
        this.setState(prevState => {
          let { focusedValue } = prevState
          
          if (focusedValue > 0) {
            focusedValue--

            if (multiple) {
              return {
                focusedValue
              }
            } else {
              return {
                values: [ options[focusedValue].value ],
                focusedValue
              }
            }
          }
        })
        break
      default:
        if (/^[a-z0-9]$/i.test(e.key)) {
          const char = e.key
          
          clearTimeout(this.timeout)
          this.timeout = setTimeout(() => {
            this.setState({
              typed: ''
            })
          }, 1000)
          
          this.setState(prevState => {
            const typed = prevState.typed + char
            const re = new RegExp(`^${typed}`, 'i')
            const index = options.findIndex(option => re.test(option.value))

            if (index === -1) {
              return {
                typed
              }
            }
            
            if (multiple) {
              return {
                focusedValue: index,
                typed
              }
            } else {
              return {
                values: [ options[index].value ],
                focusedValue: index,
                typed
              }
            }
          })
        }
        break
    }
  }

  onClick() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }
  
  onDeleteOption(e) {
    const { selectedItem} = this.props
    const { value } = e.currentTarget.dataset

    this.setState(prevState => {
      const [ ...values ] = prevState.values
      const [ ...selected ] = prevState.selected
      const index = values.indexOf(value)

      if(selectedItem)
      selectedItem(selected[index]);

      values.splice(index, 1)
      selected.splice(index, 1)

      return { values,selected }
    })
  }
  
  onHoverOption(e) {
    const { options } = this.props
    
    const { value } = e.currentTarget.dataset
    const index = options.findIndex(option => option.value === value)

    this.setState({
      focusedValue: index
    })
  }
  
  onClickOption = opation => {
    console.log("opation-->"+opation);
    const { multiple,selectedItem} = this.props
    
    const value  =  opation.value;
    const id  =  opation.cuisineid;
    
    this.setState(prevState => {
      if (!multiple) {
        return {
          values: [ value ],
          isOpen: false
        }
      }
      
      const [ ...values ] = prevState.values
      const [ ...selected ] = prevState.selected
      const index = values.indexOf(value)
      
      if (index === -1) {
        values.push(value)
        selected.push(opation.cuisineid)
      } else {
        values.splice(index, 1)   
        selected.splice(index, 1)         
      }
      if(selectedItem)
      selectedItem(id);

      return { values ,selected}
    });
    
  }
  
  stopPropagation(e) {
    e.stopPropagation()
  }
  
  renderValues() {
    const { placeholder, multiple } = this.props
    const { values } = this.state
    
    if (values.length === 0) {
      return (
        <div className="placeholder">
          { placeholder }
        </div>
      )
    }
    
    if (multiple) {
      return values.map(value => {
        return (
          <span
            key={ value }
            onClick={ this.stopPropagation }
            className="multiple value">
            { value }
            <span
              data-value={ value }
              onClick={ this.onDeleteOption }
              className="delete">
              <IoIosClose size={20}/>
            </span>
          </span>
        )
      })
    }
    
    return (
      <div className="value">
        { values[0] }
      </div>
    )       
  }
  
  renderOptions() {
    const { options } = this.props
    const { isOpen } = this.state;
    
    if (!isOpen) {
      return null
    }
    
    return (
      <div className="options">
        { options.map(this.renderOption) }
      </div>
    )
  }
  
  renderOption(option, index) {
    const { multiple } = this.props
    const { values, focusedValue } = this.state
    
    const { value } = option;
    
    const selected = values.includes(value)
    
    let className = "option"
    if (selected) className += " selected"
    if (index === focusedValue) className += " focused"
    
    return (
      <div
        key={ value }
        data-value={ value }
        className={ className }
        onMouseOver={ this.onHoverOption }
        onClick={ (e)=>this.onClickOption(option) }
        >
        { multiple ?
          <span className="checkbox">
            { selected ? <FaCheck /> : null }
          </span> :
          null
        }
        { value }
      </div>
    )
  }
  
  render() {
    const { label ,required,isError} = this.props
    const { isOpen } = this.state
    
    return (
      <div>
      <label className="label">{ label } <span className='must' hidden={!required}>*</span></label>
      <div>
      <div
        className="select"
        onFocus={ this.onFocus }
        onBlur={ this.onBlur }
        onKeyDown={ this.onKeyDown }>
        
        <div className="selection" onClick={ this.onClick }>
          { this.renderValues() }
          <span className="arrow">
            { isOpen ? <FaChevronUp /> : <FaChevronDown /> }
          </span>
        </div>
        { this.renderOptions() }
      </div>
      {!isError && <span style={{ color: "red", fontSize: "smaller" }}>Please select option</span>}
      </div>
      </div>
      
    )
  }
}





export default SelectOption;