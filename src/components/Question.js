import React from 'react';
import { AnswerButton } from './';
import { decodeHTML, randomizeArray } from '../lib';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guessed: false,
      guess: '',
    };

    // convert all answers into a single array, and randomize the array
    this.answers = randomizeArray([
      ...props.question.incorrect_answers,
      props.question.correct_answer,
    ]);
  }

  handleGuess = (answer) => {
    this.setState({ guessed: true, guess: answer});
  };

  render() {
    return (
      <div className='card p-2 mb-4'>
        <h3 className='fw-lighter fs-5 mb-4'>{this.props.question.category}</h3>
        <h4 className='fw-light fs-5 mb-4'>
          {decodeHTML(this.props.question.question)}
        </h4>

        <div>
          {
            this.state.guessed
            ? (
              <React.Fragment>
                {
                  this.state.guess === this.props.question.correct_answer
                  ? <h3>Correct!</h3>
                  : <h3>Incorrect! The correct answer is {this.props.question.correct_answer}</h3>
                }
              </React.Fragment>
            )
            : null
          }
          {this.answers.map((answer) => (
            <AnswerButton
              handleGuess={()=>this.handleGuess(answer)}
              key={answer}
              answer={answer}
            />
          ))}
        </div>

        {/* Dynamically render correct/incorrect here! */}
      </div>
    );
  }
}

export { Question };
