import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import '../NavTwo/navTwo.css'

// import Nav from '../../components/Nav/Nav';

import { connect } from 'react-redux'

const styles = theme => ({
  bar: {
    // float:'left'
   
  },
  button: {
      margin:'10px'
  }
})

class NavTwo extends Component{
  constructor(props){
    super(props)
        this.state = {
            userInput:''
                
            
        }
   
    
  }

  componentDidMount(){
    //for the selector bar GET 'type_of_Sport'
   
  }

  handleChangeForSearch = propertyName => (event) => {
      
      this.setState({
           userInput: event.target.value
      });
    //   console.log('state:' + this.state.userInput);
  }

  handleGoButton = (event) => {
    event.preventDefault();
    this.props.dispatch({
      type:'GET_QUESTION',
      payload: this.state

    })
    window.location.href= `/#/search`;
  }

  

  render(){

      return(

  <div className="nav">
    <div className={this.props.classes.bar}>
        <input className='search' onChange={this.handleChangeForSearch('userInput')}  placeholder="search"/>
     
        <select>
            <option></option>
            <option selected>Snowboarding</option>
             <option>Skateboarding</option>
        </select>
        <button onClick={this.handleGoButton}>GO!</button>
    </div>
    {/* <p>{JSON.stringify(this.state.userInput)}</p> */}
  </div>
      )
  }
}
export default connect()(withStyles(styles)(NavTwo));