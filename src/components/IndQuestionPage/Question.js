import React, { Component } from 'react';
// import { USER_ACTIONS } from '../../redux/actions/userActions';
import { connect } from 'react-redux'
import Nav from '../../components/Nav/Nav';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const mapStateToProps = state =>({
    state
})


const styles = theme => ({
   
      
})

class Question extends Component{
    constructor(props){
        super(props)
       
    }

    componentDidMount(){
       this.getComments()
    }

    getComments = (state) =>{
        let id = this.props.state.questionItems[0].id
        console.log('hello', id);
        this.props.dispatch({
            type:'GET_IND_QUESTION_RESPONSE',
            payload: id

        })
    }

    // handleChangeFor= (propertyName) => (event) =>{
    //     this.setState({
    //         ...this.state,
    //         [propertyName]: event.target.value
    //     }) 
    //     console.log(this.state);
    // }

    // addAnswer = (id) =>{
    //     console.log(id);
    
    //     let state = this.state
    //     this.props.dispatch({
    //        type:'POST_ANSWER',
    //        payload:{
    //             state,
    //             id
    //        } 
    //     })
    //     this.getComments()
    // }

    deleteQuestion = (id) =>{
        // console.log(this.props.state.user.id);
        // console.log(this.props.state.questionItems[0].id);

        let userId = this.props.state.user.id
        console.log(userId);
        console.log(id);
        let questionId = this.props.state.questionItems[0].id
        
        this.props.dispatch({
            type:'DELETE_QUESTION',
            payload:{
                 questionId,
            }
               
            
            
            
        })

        
    }

    
    render(){
    //     let questionList = this.props.state.questionItems.map((question, index) => {
    //         return <div key={index}>
                    
    //                 <Card className={this.props.classes.card}>
    //                 {question.question_text}
                    
    //                 </Card>
    //                 <br />
                   
    //                 <div className={this.props.classes.media}>
    //                 {/* {this.getComments.bind(this,question.id)}  */}
    //                 <textarea type="text"
    //                 // className={this.props.classes.media} onChange={this.handleChangeFor('comments')}
    //                  placeholder="answer that question"/>
    //                   <br />
                  
    //                 <button onClick={this.addAnswer.bind(this,question.id)}  >post</button>
    //                 <button onClick={this.deleteQuestion.bind(this, question.id)}></button>
    //                 </div>
    //                 <hr />
    //                </div>        
    // })


    const answerOfQuestion = this.props.state.answerItems.map((answer, index) => {
        return <div key={index}>
                <Card className={this.props.classes.color}> {answer.comments}</Card>
                <br />
               </div>
               
    })
        
        return(
            <div> 

                <Nav />
            <p>Welcome to your question!</p>
            <form className={this.props.classes.btn}>
            <ul>
                            {/* {questionList} */}
            </ul>
            
            <br />
            <br />

            <div className={this.props.classes.media}>
             <ol>
             {answerOfQuestion}
             </ol>
            
            </div> 
            </form>
           
            </div>
            
        )
    }
}


export default connect(mapStateToProps)(withStyles(styles)(Question));
