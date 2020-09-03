import React, { Component } from "react";

//import our service
import JeopardyService from "../../jeopardyService";
class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);
    this.client = new JeopardyService();
    this.state = {
      submitted: false,
      formData: {
        userAnswer: "",
      },
      data: {
        id: 0,
        answer: "",
        question: "",
        value: 0,
        airdate: "",
        created_at: "",
        updated_at: "",
        category_id: 0,
        game_id: null,
        invalid_count: null,
        category: {
          id: 0,
          title: "",
          created_at: "",
          updated_at: "",
          clues_count: 0,
        },
      },
      score: 0,
    };
  }
  handleChange = (event) => {
    let formData = this.state.formData;
    formData[event.target.name] = event.target.value;
    this.setState({ formData });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      submitted: true,
    });
  };
  resetForm = (event) => {
    this.getNewQuestion();
    this.setState({
      submitted: false,
      formData: {
        userAnswer: "",
      },
    });
  };

  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then((result) => {
      this.setState({
        data: result.data[0],
      });
    });
  }
  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }

  //display the results on the screen
  render() {
    if (this.state.submitted) {
      let theTruth;
      let theCorrectAnswer;
      const regex = /[a-z]/g;
      let userAnswerString = this.state.formData.userAnswer
        .toLowerCase()
        .match(regex);
      if (this.state.formData.userAnswer !== "") {
        userAnswerString = this.state.formData.userAnswer.toLowerCase().match(regex)
        {userAnswerString = userAnswerString.replace('',',')};
      } else {
        userAnswerString = "ENNNT";
      }
      console.log("user answer: ", userAnswerString.toString());

      if (userAnswerString === theCorrectAnswer) {
        theTruth = "Correctamundo!";
        this.state.score = this.state.score + this.state.data.value;
      } else {
        this.state.score = this.state.score - this.state.data.value;
        theTruth = "Wrongaroni!";
      }
      return (
        <div>
          Your answer is: {this.state.formData.userAnswer}, it is: {theTruth}
          <br />
          <button onClick={this.resetForm}>Get the next question </button>
        </div>
      );
    }
    return (
      <div>
        <strong>Question: </strong>
        {this.state.data.question} <br />
        <strong>Value: </strong>
        {this.state.data.value} <br />
        <strong>Category: </strong>
        {this.state.data.category.title} <br />
        <strong>Answer: </strong>
        {this.state.data.answer} <br />
        <strong>Score: </strong>
        {this.state.score}
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Who/what is:</label>
              <input
                onChange={this.handleChange}
                type="text"
                name="userAnswer"
                value={this.state.formData.userAnswer}
              />
            </div>
            <button>Submit Answer</button> <br />
            {this.state.formData.userAnswer}
          </form>
        </div>
      </div>
    );
  }
}
export default Jeopardy;
