import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateNotif } from '../utils'
import { primary, danger, success, white, primaryLight } from '../utils/colors'
import { 
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native'

class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
    headerTitleStyle: {
      color: white
    },
    headerStyle: {
      backgroundColor: primary
    },
    headerTintColor: white
  }

  state = {
    currQuestionPos: 0,
    numCorrectAnswers: 0,
    showAnswer: false,
    deck: null
  }

  handleSubmitAnswer = async (answer) => {
    const { deck, currQuestionPos, numCorrectAnswers } = this.state
    
    if(answer === 'correct'){
      this.setState({numCorrectAnswers: numCorrectAnswers + 1})
    }

    this.setState({ 
      currQuestionPos: currQuestionPos + 1, 
      showAnswer: false
    })

    if(currQuestionPos+1 === deck.questions.length){
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
          <Text style={styles.gameOver}>🎉</Text>
          <Text style={styles.gameOver}>Game over</Text>
          <Text style={styles.summary}>You got {`${score}% correct answers.`}</Text>
          <TouchableOpacity 
            onPress={() => this.handleStartOver()}
            style={[Platform.OS === 'ios' 
              ? styles.iosSubmitBtn 
              : styles.androidPrimaryBtn
            ,{marginTop: 28}]}
          >
            <Text style={styles.textBtn}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.handleBack()}
            style={[Platform.OS === 'ios' 
              ? styles.iosSubmitBtn 
              : styles.androidPrimaryBtn
            ,{marginTop: 28}]}
          >
            <Text style={styles.textBtn}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      )
    }

    const currQuestion = deck.questions[currQuestionPos]
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>        
        <Text style={styles.title}>{currQuestion.question}</Text>
        {this.state.showAnswer && <Text style={[styles.answer]}>{currQuestion.answer}</Text>}
        <Text style={styles.textMuted}>{`${currQuestionPos}/${totalNumQuestions}`}</Text>
        {this.state.showAnswer && <TouchableOpacity 
          onPress={() => this.handleSubmitAnswer('correct')}
          style={[Platform.OS === 'ios' 
            ? styles.iosSubmitBtn 
            : styles.androidPrimaryBtn
          ,{backgroundColor: success, marginTop: 80}]}
        >
          <Text style={styles.textBtn}>Correct</Text>
        </TouchableOpacity>}
        {this.state.showAnswer && <TouchableOpacity 
          onPress={() => this.handleSubmitAnswer('incorrect')}
          style={[Platform.OS === 'ios' 
            ? styles.iosSubmitBtn 
            : styles.androidPrimaryBtn
          ,{backgroundColor: danger}]}
        >
          <Text style={styles.textBtn}>Incorrect</Text>
        </TouchableOpacity>}
        {!this.state.showAnswer &&<TouchableOpacity 
          onPress={() => this.handleShowAnswer()}
          style={[Platform.OS === 'ios' 
            ? styles.iosSubmitBtn 
            : styles.androidPrimaryBtn
          ,{marginTop: 28}]}
        >
          <Text style={styles.textBtn}>Show answer</Text>
        </TouchableOpacity>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iosSubmitBtn: {
    backgroundColor: primary,
    padding: 10,
    borderRadius: 7,
    height: 45,    
  },
  androidPrimaryBtn: {
    backgroundColor: primary,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    width: 250,
    height: 65,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'stretch',
    elevation:2,
    marginTop:8
  },
  title: {
    fontSize: 36,    
    width:'80%',
    textAlign:'center',
    marginBottom: 80
  },
  gameOver: {
    fontSize: 36,    
    width:'80%',
    textAlign:'center',
  },
  summary: {
    fontSize: 26,
    width:'80%',
    textAlign:'center',
    color: primaryLight
  },
  textBtn: {    
    fontSize:20,
    color: white,
    textAlign: 'center'
  },
  textMuted: {
    fontSize: 22,    
    textAlign: 'center',
    color: primaryLight
  },
  answer: {
    fontSize: 22    
  }
})

function mapStateToProps ({ state }) {
  return { state }
}

export default connect(mapStateToProps)(Quiz)