import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTwo from '../../components/NavTwo/NavTwo'
// import Nav from '../Nav/Nav'
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Tooltip from '@material-ui/core/Tooltip';

// import {
//   HashRouter as Router,
//   Route,
//   Redirect,
//   Switch,
// } from 'react-router-dom';
import { withStyles, Icon, IconButton } from '@material-ui/core';
const mapStateToProps = state => ({
  user: state.user,
});


const styles = theme => ({
  nav: {
    float:'left'

  }
})

class Header extends Component{
  // constructor(props){
  //   super(props)
  // }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
    //   // this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('/home')
    window.location.href= `/#/home`;
  
  }

  render(){

    return(
      <div className="instructions">
        
         <div className="nav">
           
             <h1 className="lead">Trixster</h1> 
             <NavTwo />
             <Tooltip title="logout">
             <IconButton
            onClick={this.logout}
          >
            <ExitToApp/>
          </IconButton>  
          </Tooltip>      
         </div>
         
        </div>
    )
  }

}


export default connect(mapStateToProps)(withStyles(styles)(Header))

