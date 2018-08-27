import React, { Component } from 'react';
import '../InfoPage/infopage.css'
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Send from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import FormControl from '@material-ui/core/FormControl';


import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Icon } from '@material-ui/core';

const mapStateToProps = state => ({
  user: state.user,
});

class InfoPage extends Component {
  constructor(props){
    super(props)
      this.state = {
        question_text:'',
        type_of_sport:'',
        question_title:''
      }
  }

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleChangeInput = (propertyName) => (event) =>{
    this.setState({
        ...this.state,
      [propertyName]: event.target.value
    })
  }

  addQuestion = () => {
    this.props.dispatch({
      type:'POST_QUESTION',
      payload: this.state
      
    })

    
    this.props.history.push('/user')
  }





  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="center">
          <h1 className='ask'>
            Ask a Question
          </h1>
          <div>
            
            <TextField className="title" onChange={this.handleChangeInput('question_title')} type="text" label="title" />
            <br />
            <br />
            <TextField className="question" 
            onChange={this.handleChangeInput('question_text')}
            multiline={true}
             type="text" label="Question" />
          
            <br />
            
           <FormControl>
           <InputLabel htmlFor="demo-controlled-open-select">Choose a Sport</InputLabel>
            <Select className="sport" 
            value={this.state.type_of_sport}
            onChange={this.handleChangeInput('type_of_sport')}type="text" 
            label="type of Sport">
            <MenuItem value="snowboarding">Snowboarding</MenuItem>
            <MenuItem value="rollerBlade">Rollerblade</MenuItem>
            <MenuItem value="skateboarding">Skateboarding</MenuItem>
            <MenuItem value="bmx">Bmx</MenuItem>
            </Select>
            </FormControl>
            <br />
            <br />
            <Tooltip title="post!">
            <IconButton onClick={this.addQuestion}><Send/></IconButton>
            </Tooltip>
          </div>
           {/* <p>{JSON.stringify(this.state.type_of_sport)}</p> */}
        </div>
      );  
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
