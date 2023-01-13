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

  handleGuess = (e) => {
    // set guessed to true, and set guess to the selected answer
    e.preventDefault();
    console.log(e['target']['innerText']);
    this.setState({ guessed: true, guess: e['target']['innerText']});
  };

  render() {
    return (
      <div className='card p-2 mb-4'>
        <h3 className='fw-lighter fs-5 mb-4'>{this.props.question.category}</h3>
        <h4 className='fw-light fs-5 mb-4'>
          {decodeHTML(this.props.question.question)}
        </h4>

        <div>
          {this.answers.map((answer) => (
            <AnswerButton
              handleGuess={this.handleGuess}
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
