import React, { Component } from 'react';
// import FormData from 'form-data'
import { connect } from 'react-redux';
// import NavTwo from '../NavTwo/NavTwo'

import Nav from '../../components/Nav/Nav';


import '../../styles/main.css'

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { withStyles } from '@material-ui/core';


const mapStateToProps = state => ({
  user: state.user,
});
const styles = theme => ({

})

class UserPage extends Component {
  constructor(props){
    super(props)
    this.state ={
      profile_picture:null
    
  }
}
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }
    handleChangeFor = (propertyName) => (event) =>{
      console.log(event.target.files[0]);
        this.setState({
          update: {
            profile_picture: event.target.files[0]
          }
        });
    }

    postPicture = () =>{
      // let fd = new FormData();
      // fd.append('image', this.state.profile_picture)
      // axios.put(`/api/trick/profilePic`,fd)
      // this.props.history.push('search');
    }
    
  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          <p>Your ID is: {this.props.user.id}</p>
          
        </div>
      );
    }

    return (
      <div className="nav">
       
        <Nav />
      
        { content }
       <div>

         <img src={this.state.profile_picture} alt=""/>
         <br />
         <input type="file" onChange={this.handleChangeFor('profile_picture')}/>
         <button onClick={this.postPicture}>Upload</button>

       </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(UserPage))

