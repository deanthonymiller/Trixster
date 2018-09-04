import React, { Component } from "react";
import Nav from '../Nav/Nav'
import TextField from '@material-ui/core/TextField';
import { withStyles, IconButton, Icon } from '@material-ui/core';
import * as filestack from 'filestack-js';
import { connect } from 'react-redux'
import MeetUpUpload from '../ImageUpload/MeetUpImageUpload'
import Send from '@material-ui/icons/Send';
import Tooltip from '@material-ui/core/Tooltip';
import AddAPhoto from '@material-ui/icons/AddAPhoto';






const mapStateToProps = state => ({
    user: state.user,
    state
  });


const styles = theme => ({
    text:{
    width:'500px'
        },
    h2:{
        textDecoration:'underline'
    }

})

class MeetUps extends Component{
    constructor(props){
        super(props)
        this.state = {meet_up_text:'', meet_up_location: ''};
        this.apiKey = 'AYeVFaMCCRnO8UwG8ZqIAz'
        this.client = filestack.init(this.apiKey);
        this.options = {
            uploadInBackground: false,
            onUploadDone: this.addMeetUp
        };
        
    }

    showFileData = (response) => {
        //    console.log(response);
           console.log(this.state);
           this.props.dispatch({
               type:'UPDATE_MEETUP_PHOTO',
               payload: response.filesUploaded[0]
         })
       }


    handleChangeInput = (propertyName) => (event) =>{
        this.setState({
            ...this.state,
          [propertyName]: event.target.value
        })
      }

      addMeetUp = (response) => {
          let state = this.state
          let filesUploaded = response.filesUploaded
        this.props.dispatch({
          type:'POST_MEETUP',
          payload: {
              state, filesUploaded
          }
        })
        // this.props.history.push('/user')
        console.log(state, filesUploaded);
        
    }




    render(){
        const { classes } = this.props;



        return(
            <div className="center">
                
                <Nav />
            <h1 className={this.props.classes.h2}>Post a Meet-up </h1>
            <TextField 
            classes={this.props.classes.location}
            onChange={this.handleChangeInput('meet_up_location')}
            multiline={true}
             type="text" label="location" 
             />
               {/* <p>{JSON.stringify(this.state.meet_up_location)}</p> */}
               <br />
              <br />
            <TextField 
            className={this.props.classes.text}
            onChange={this.handleChangeInput('meet_up_text')}
            multiline={true}
             type="text" label="meet-up" 
             />
             <br />
            <Tooltip title="post">
            <IconButton onClick={this.addMeetUp}><Send/></IconButton>
            </Tooltip>
         
            {/* <MeetUpUpload/> */}
            {/* <p>{JSON.stringify(this.state.meet_up_text)}</p> */}
            <IconButton size="small" onClick={() => this.client.picker(this.options).open()} variant="contained" color="default" className={classes.button}>
                  <AddAPhoto />
               </IconButton>
            </div>
            
        )
    }




}



export default connect(mapStateToProps)(withStyles(styles)(MeetUps))
// export default withRouter(connect(mapStateToProps)(withStyles(styles)(IndQuestionPage)));
