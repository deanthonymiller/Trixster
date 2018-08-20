import React, { Component } from 'react';
// import { USER_ACTIONS } from '../../redux/actions/userActions';
import { connect } from 'react-redux'
import Nav from '../../components/Nav/Nav';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core';

import '../SearchResults/SearchResults.css'

const mapStateToProps = state =>({
    state
})

const styles = theme => ({
    card:{
        width: 350,
        height: 200,
        margin: '30px',
        float: 'left'
,        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        borderRadius: '5px'
    }
   
})
class SearchResults extends Component{


componentDidMount(){
    console.log(this.props.state)
}

indQuestion = (id) =>{
    console.log(id);
    
    this.props.dispatch({
        type:'GET_THIS_QUESTION',
        payload: id
    })
    // window.location.href= `/#/question`;
    this.props.history.push('/question')
    // console.log(id)
    
}

    render(){

let questionList = this.props.state.questionItems.map((question, index) => {
        return <Card className={this.props.classes.card} key={index} onClick={this.indQuestion.bind(this,question.id)}>
                
                <li className="card">
                {question.question_text}
                </li>
               </Card>
               
})

        return(
            <div> <Nav />
            <h1>results</h1>
                <ul className="center">
                    {questionList}



                </ul>

            </div>
            
        )
    }
}


export default connect(mapStateToProps)(withStyles(styles)(SearchResults));
