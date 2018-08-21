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
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core';

const mapStateToProps = state =>({
    state
})


const styles = theme => ({
    card: {
    
        width: 350,
        height: 50,
        margin: 'auto',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        borderRadius: '5px',
        textAlign:'center'
      },
      media: {
       textAlign:'center',  
       margin:'auto',
       
      },
      color:{
         
          margin: 'auto',
          width: 300
      },
      btn:{
          height:800,
          width:500
      }
      
})



class IndQuestionPage extends Component{
    constructor(props){
        super(props)
        this.state={
            comments:'',
            show: false

        }
    }

    componentDidMount(state){ 
       console.log(this.props.match.params.id);
       this.getComments()
        let question_id = this.props.match.params.id
       this.props.dispatch({
           type:'ANOTHER_QUESTION',
           payload: question_id
       })
       
    }

    handleChangeFor= (propertyName) => (event) =>{  
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        }) 
        console.log(this.state);
    }

    getComments = (state) =>{
        let id = this.props.match.params.id
        console.log('hello', id);
        this.props.dispatch({
            type:'GET_IND_QUESTION_RESPONSE',
            payload: id

        })
    }

    

    addAnswer = (id) =>{
        console.log(id);
    
        let state = this.state
        this.props.dispatch({
           type:'POST_ANSWER',
           payload:{
                state,
                id
           } 
        })
    }

    deleteQuestion = (id) =>{
        console.log(id);
        let questionId = this.props.match.params.id
        
        this.props.dispatch({
            type:'DELETE_QUESTION',
            payload:{
                 questionId,
            }    
        })
        this.props.history.push('/user')
    }

    deleteAnswer = (id) => {
        console.log(id);
        let questionId = this.props.match.params.id
        this.props.dispatch({
            type:'DELETE_ID_ANSWER',
            payload:{
                id, questionId
            } 
        })
       
    }
    
    render(){
        let questionList = this.props.state.correctStuff.map((question, index) => {
            return <div key={index}>
                    
                    <Card className={this.props.classes.card}>
                    {question.question_text}
                    
                    </Card>
                    <br />
                   
                    <div className={this.props.classes.media}>
                    {/* {this.getComments.bind(this,question.id)}  */}
                    <textarea type="text"
                    className={this.props.classes.media} onChange={this.handleChangeFor('comments')}
                     placeholder="answer that question"/>
                      <br />
                    <button onClick={this.addAnswer.bind(this,question.id)} >post</button>
                    <button onClick={this.deleteQuestion.bind(this, question.id)}>delete</button>
                    </div>
                    <hr />
                   </div>        
    })


    const answerOfQuestion = this.props.state.answerItems.map((answer, index) => {
        return <div key={index}>
                 <br /> 
                <Card className={this.props.classes.color}> {answer.comments}</Card>
             
                <button onClick={this.deleteAnswer.bind(this, answer.id)}>delete</button>
                <br />
            
               </div>
               
    })
        
        return(
            <div> 

                <Nav />
            <p>Welcome to your question!</p>
            <form className={this.props.classes.btn}>
            <ul>
                            {questionList}
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


export default withRouter(connect(mapStateToProps)(withStyles(styles)(IndQuestionPage)));
