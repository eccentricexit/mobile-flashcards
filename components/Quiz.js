import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'

class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',    
  }

  state = {
    currQuestionPos: 0,
    numCorrectAnswers: 0,
    deck: null
  }

  handleSubmitAnswer = (answer) => {
    const { deck, currQuestionPos, numCorrectAnswers } = this.state
    console.info('answer clicked: ',answer)
    console.info('correct ans', deck.questions[currQuestionPos].answer)

    if(answer === deck.questions[currQuestionPos].answer.toLowerCase()){
      this.setState({numCorrectAnswers: numCorrectAnswers + 1})
    }
    this.setState({ currQuestionPos: currQuestionPos + 1})
  }

  async componentDidMount () {
    const deck = this.props.navigation.getParam('deck',{})
    this.setState({ deck })
  }

  render () {
    const { currQuestionPos, deck, numCorrectAnswers } = this.state
    if (!deck || !deck.questions) {
      return <View><Text>No deck loaded.</Text></View>
    }

    const totalNumQuestions = deck.questions.length
    if(currQuestionPos >= totalNumQuestions){
      // game is over
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Game over</Text>
          <Text>You got {`${numCorrectAnswers}/${totalNumQuestions} correct answers.`}</Text>
        </View>
      )
    }

    const currQuestion = deck.questions[currQuestionPos]
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{`${currQuestionPos}/${totalNumQuestions}`}</Text>
        <Text>{currQuestion.question}</Text>
        <Button title='Yes' onPress={() => this.handleSubmitAnswer('yes')} />
        <Button title='No' onPress={() => this.handleSubmitAnswer('no')} />
      </View>
    )
  }
}

function mapStateToProps ({ state }) {
  return { state }
}

export default connect(mapStateToProps)(Quiz)