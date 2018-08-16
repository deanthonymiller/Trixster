import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavTwo from '../../components/NavTwo/NavTwo'
// import Nav from '../Nav/Nav'
// import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import { withStyles } from '@material-ui/core';

const styles = theme => ({
  nav: {
    float:'left'

  }
})

class Header extends Component{
  // constructor(props){
  //   super(props)
  // }


  logout = () => {
    this.props.dispatch(triggerLogout());
    window.location.href= `/#/home`;
  }

  render(){

    return(
      <div className="instructions">
         <div className="nav">
           
             <h1 className="lead">Trixster</h1>
             
             <NavTwo />
             
             <button
            onClick={this.logout}
          >
            Log Out
          </button>
            
         </div>
        </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Header))

