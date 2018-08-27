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
import { withStyles, Icon } from '@material-ui/core';
import ThumbUp from '@material-ui/icons/ThumbUp';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Send from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = state =>({
    state
})


const styles = theme => ({
    card: {
    
        maxWidth: '350px',
        maxHeight: '300px',
        margin: 'auto',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        borderRadius: '5px',
        textAlign:'center',
       
      },
      media: {
       textAlign:'center',  
       margin:'auto',
       
      },
      color:{
         
          margin: 'auto',
          MaxWidth: 300,
          padding: '10px'
      },
      btn:{
          height:3000,
          width:500
      },
      align:{
        verticalAlign: 'middle'
      },
      h2:{
          textDecoration:'underline'
      }
      
})



class IndMeetUp extends Component{
    constructor(props){
        super(props)
        this.state={
            comments:'',
            show: false,
            counter: 0

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

    incrementOneLike = (id) => {
        console.log(id);
        let questionLike = this.props.state.correctStuff[0].question_likes += 1
        console.log(questionLike);
        this.props.dispatch({
            type:'INCREMENT_ONE_MEETUP',
            payload:{
                questionLike, id
            }
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
        alert('Thanks for answering !')
    }

    deleteQuestion = (id) =>{
        console.log(id);
        let questionId = this.props.match.params.id
        
        this.props.dispatch({
            type:'DELETE_QUESTION',
            payload:{questionId}    
        })
        this.props.history.push('/user')
    }

    deleteAnswer = (id) => {
        console.log(id);
        let questionId = this.props.match.params.id
        this.props.dispatch({
            type:'DELETE_MEET_UP_ANSWER',
            payload:{
                
            } 
        })
       
    }
    
    render(){
        let questionList = this.props.state.correctStuff.map((question, index) => {
            return <div key={index}>
                    <p>{this.props.state.correctStuff[0].question_likes} likes</p>
                    <Card className={this.props.classes.card}>
                    {question.question_text}
                    </Card>
                   
                    <br />
                   
                    <div className={this.props.classes.media}>
                    {/* {this.getComments.bind(this,question.id)}  */}
                    <TextField type="text"
                    className={this.props.classes.media} 
                    multiline={true}
                    onChange={this.handleChangeFor('comments')}
                     label="answer that question"/>
                      <br />
                    <IconButton onClick={this.addAnswer.bind(this,question.id)} ><Send/></IconButton>
                    <IconButton onClick={this.deleteQuestion.bind(this, question.id)}><DeleteIcon/></IconButton>
                    <IconButton onClick={this.incrementOneLike.bind(this, question.id)}><ThumbUp /></IconButton>
                    </div>
                    <hr />
                   </div>        
    })
    


    const answerOfQuestion = this.props.state.answerItems.map((answer, index) => {       
        return <div className="center" key={index}>
                <Card className={this.props.classes.color}> {answer.comments}
                </Card>
                <IconButton onClick={this.deleteAnswer.bind(this, answer.id)}><DeleteIcon/></IconButton>
               </div>
               
    })
        
        return(
            <div className={this.props.classes.align}> 

                <Nav />
            <h1>Welcome to your question!</h1>
            <form className={this.props.classes.btn}>
                <h2 className={this.props.classes.h2}>{this.props.state.correctStuff[0].question_title}</h2>
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


export default withRouter(connect(mapStateToProps)(withStyles(styles)(IndMeetUp)));
