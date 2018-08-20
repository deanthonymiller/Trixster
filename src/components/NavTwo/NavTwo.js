import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// import createHistory from 'history/createBrowserHistory'

import '../NavTwo/navTwo.css'

// import Nav from '../../components/Nav/Nav';


const mapStateToProps = state => ({
  user: state.user,
});

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


  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
    //   // this.props.history.push('home');
    }
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

    });
    // window.location.href= `/#/search`;
    this.props.history.push('/search')
  }

  

  render(){

      return(

  <div className="nav">
    <div className={this.props.classes.bar}>
        <input className='search' onChange={this.handleChangeForSearch('userInput')}  placeholder="search"/>
     
        {/* <select>
            <option></option>
            <option selected>Snowboarding</option>
             <option>Skateboarding</option>
        </select> */}
        <button  onClick={this.handleGoButton}>Go!</button>
        
    </div>
    {/* <p>{JSON.stringify(this.state.userInput)}</p> */}
  </div>
      )
  }
}
export default withRouter(connect(mapStateToProps)(withStyles(styles)(NavTwo)))