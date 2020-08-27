import React, { Component } from 'react';

//import our service
import JeopardyService from "../../jeopardyService";
class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props){
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data:{
        "id": 0,
        "answer": "",
        "question": "",
        "value": 0,
        "airdate": "",
        "created_at": "",
        "updated_at": "",
        "category_id": 0,
        "game_id": null,
        "invalid_count": null,
        "category": {
          "id": 0,
          "title": "",
          "created_at": "",
          "updated_at": "",
          "clues_count": 0
        }
      } ,
      score: 0
    }
  }
   //get a new random question from the API and add it to the data object in state
   getNewQuestion() {
    return this.client.getQuestion().then(result => {
      this.setState({
        data: result.data[0]
      })
    })
  }
  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }


  //display the results on the screen
  render() {
    return (
      <div>
        {/* {JSON.stringify(this.state.data)} */}
        <strong>Question: </strong>{this.state.data.question} <br/>
        <strong>Value: </strong>{this.state.data.value} <br/>
        <strong>Category: </strong>{this.state.data.category.title} <br/>
        <strong>Answer: </strong>{this.state.data.answer} <br/>
        <strong>Score: </strong>{this.state.data.score}
        
      </div>
    );
  }
}
export default Jeopardy;