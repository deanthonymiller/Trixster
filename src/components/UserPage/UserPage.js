import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import '../../styles/main.css'
import * as filestack from 'filestack-js';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { withStyles } from '@material-ui/core';


const mapStateToProps = state => ({
  user: state.user,
  state
});
const styles = theme => ({
  center:{
    paddingLeft: '1000px'
  }
})

class UserPage extends Component {
  constructor(props){
    super(props)
    this.state ={
      file:''
    
  }
}
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({
      type:'GET_USER_QUESTIONS'
    })
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

    getUserQuestions = () => {
     console.log(this.props.state.userQuestions);
     
    }


    postPicture = () =>{
  const apiKey = 'ARzYlU4xfRaiK1QMTe6Qpz';
  const client = filestack.init(apiKey);
  let file = this.state


  client.upload(file)
  .then(res => {
    console.log('success:', res);
  }).catch(err => {
    console.log(err);
    
  })
      
    }
    
  render() {

    const userQuest = this.props.state.userQuestions.map((question, index) => {
        return <div key={index} >
            <div className={this.props.classes.center } onClick={()=> this.props.history.push(`/question/${question.id}`)}>
              {question.question_text}              
            </div>
              
             
            
        </div>
    })



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
       <div className="container">
   
  </div>
         <section>
              <img src={this.state.profile_picture} alt=""/>
              <br />
              <input type="file" onChange={this.handleChangeFor('file')}/>
              <button onClick={this.postPicture}>Upload</button>
              <button onClick={this.getUserQuestions}>go</button>
             
          
          {userQuest}
          </section>
          <button onClick={this.postPicture}></button>
       </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(UserPage))

