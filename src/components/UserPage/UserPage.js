import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import '../../styles/main.css'

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { withStyles } from '@material-ui/core';
import ImageUpload from '../ImageUpload/ImageUpload'
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Done from '@material-ui/icons/Done';
const mapStateToProps = state => ({
  user: state.user,
  state
});
const styles = theme => ({
  center:{
    paddingLeft: '1000px',
    float: 'left',
    position: 'absolute'
  },
  picture:{
    height: '300px',
    width:'400px',
    borderRadius: '10px',
    paddingTop: 'absolute'
  },
  askQuestion:{
    textDecoration: 'underline',
  },
    input:{
      width:'350px',
    },
   
})

class UserPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      toggle:{
        show: false,
        done: true,
      },
     bioText:''
    }
    
 }
  componentDidMount() {
    //fetching user
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    //getting user questions on user page
    //getting user profile picture
    this.props.dispatch({type:'GET_PICTURE'})
    this.props.dispatch({type:'GET_BIO'})
    console.log(this.props.state.getProfilePicture);
    this.props.dispatch({ type:'GET_USER_QUESTIONS'})
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
        this.setState({
          ...this.state,
         [propertyName]: event.target.value
          
        });
    }

  updateBio = () => {
this.props.dispatch({
  type:'UPDATE_BIO',
  payload: this.state
})
  
    this.props.dispatch({
      type:'GET_BIO'
    })
  }

    editBio = () => {
      console.log(this.state.show);
      this.setState(prevState => ({
        toggle:{
          show: !prevState.toggle.show
        }
    
      }));
    }

  toggleButtons = () =>{
    this.setState(prevState =>({
      toggle:{
        done: !prevState.toggle.done
      }
    }))
    this.updateBio()
  }

  render() {

    const userQuest = this.props.state.userQuestions.map((question, index) => {
        return <div key={index} >
          <br/>
            <Card  onClick={()=> this.props.history.push(`/question/${question.id}`)}>
              {question.question_text}              
            </Card>  
        </div>
    })
  

    let editButtons = null

    if( this.state.toggle.show === true){
      editButtons = (
        <div>
          <TextField 
            type="text"
            placeholder="Who are you?" 
            className={this.props.classes.input }
            onChange={this.handleChangeFor('bioText')}
            multiline={true}
           />
           {/* <p>{JSON.stringify(this.state.bioText)}</p> */}
           <div>
          <ImageUpload/>
          <IconButton variant="fab" onClick={this.toggleButtons}> <Done /> </IconButton>
          </div>
        </div>
       
          
      )
    }
    let edit = null
if(this.state.toggle.done === true){
  
  edit =(
    <div>
      <IconButton onClick={this.editBio}><Edit /></IconButton>
    </div>
  )
}



    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <h1 id="welcome">
            Welcome, { this.props.user.userName }!
          </h1>  
        </div>
      );
    }

    let bio = this.props.state.getAllBioStuff[0].profile_bio


    return (
      <div className="nav">
        <Nav />
        { content }
      
  

  <aside className={this.props.classes.center }>
      <h2 className={this.props.classes.askQuestion }>Asked Questions</h2>
            {userQuest}
  </aside>
       
        
         <div className={this.props.classes.position }>
       
         <img className={this.props.classes.picture } src={this.props.state.getProfilePicture[0].profile_picture} alt="Picture of DeaAnthony"/> 
          {editButtons}
         

          </div>  
       <section>
         {/* <p>{JSON.stringify(this.props.state.getProfilePicture[0].profile_bio)}</p> */}
         {bio}
         {edit}
       </section>
      </div>
      
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withStyles(styles)(UserPage))

