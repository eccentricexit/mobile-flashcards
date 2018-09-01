import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { updateNotif } from '../utils'

class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',    
  }

  state = {
    currQuestionPos: 0,
    numCorrectAnswers: 0,
    showAnswer: false,
    deck: null
  }

  handleSubmitAnswer = async (answer) => {
    const { deck, currQuestionPos, numCorrectAnswers } = this.state
    
    if(answer === deck.questions[currQuestionPos].answer.toLowerCase()){
      this.setState({numCorrectAnswers: numCorrectAnswers + 1})
    }

    this.setState({ 
      currQuestionPos: currQuestionPos + 1, 
      showAnswer: false
    })

    if(currentQuestionPos+1 === deck.questions.length){
      await updateNotif()
    }
  }

  handleShowAnswer = () => {
    this.setState({showAnswer: true})
  }

  handleStartOver = () => {
    this.setState({
      currQuestionPos: 0,
      numCorrectAnswers: 0,
      showAnswer: false 
    })
  }

  handleBack = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  componentDidMount () {
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
      const score = ((numCorrectAnswers/totalNumQuestions)*100).toFixed(0)
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Game over</Text>
          <Text>You got {`${score}% correct answers.`}</Text>
          <Button title='Restart Quiz' onPress={() => this.handleStartOver()} />
          <Button title='Back to Deck' onPress={() => this.handleBack()} />
        </View>
      )
    }

    const currQuestion = deck.questions[currQuestionPos]
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{`${currQuestionPos}/${totalNumQuestions}`}</Text>
        <Text>{currQuestion.question}</Text>
        {this.state.showAnswer && <Text>{currQuestion.answer}</Text>}
        <Button title='Yes' onPress={() => this.handleSubmitAnswer('yes')} />
        <Button title='No' onPress={() => this.handleSubmitAnswer('no')} />
        <Button title='Show answer' onPress={() => this.handleShowAnswer()} />
      </View>
    )
  }
}

function mapStateToProps ({ state }) {
  return { state }
}

export default connect(mapStateToProps)(Quiz)