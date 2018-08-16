import React, { Component } from 'react';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { connect } from 'react-redux'
import Nav from '../../components/Nav/Nav';
import '../SearchResults/SearchResults.css'

const mapStateToProps = state =>({
    state
})

class SearchResults extends Component{


componentDidMount(){
    // this.props.dispatch(())
}



    render(){

let questionList = this.props.state.questionItems.map((question, index) => {
        return <div key={index}>
                
                <li className="card">
                {question.question_text}
                </li>
                
               </div>
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


export default connect(mapStateToProps)(SearchResults);