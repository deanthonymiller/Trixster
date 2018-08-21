import React, { Component } from 'react';
import '../InfoPage/infopage.css'
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

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
            <textarea className="title" onChange={this.handleChangeInput('question_title')} type="text" placeholder="title" />
            <br />
            <br />
            <textarea className="question" onChange={this.handleChangeInput('question_text')} type="text" placeholder="Question" />
            <br />
            <br />
            <select className="sport" onChange={this.handleChangeInput('type_of_sport')}type="text" placeholder="type of Sport"> 
            <option selected>chose a sport</option>
            <option value="snowboarding">Snowboarding</option>
            <option value="rollerBlade">Rollerblade</option>
            <option value="skateboarding">Skateboarding</option>
            <option value="bmx">Bmx</option>
            </select>
            <br />
            <br />
            <button onClick={this.addQuestion}>Post!</button>
          </div>
           <p>{JSON.stringify(this.state.type_of_sport)}</p>
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
