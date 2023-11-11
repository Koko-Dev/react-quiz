import Header from './Header';
import Main from './Main';
import { useEffect, useReducer } from 'react';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import FinishScreen from './FinishScreen';
import Progress from './Progress';


const initialState = {
  questions: [],

//  'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading', index: 0, answer: null, points: 0,
};

function reducer( state, action ) {
  switch ( action.type ) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state, status: 'active'
      };
    case 'newAnswer':
      const question = state.questions.at( state.index );
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
                ? state.points + question.points
                : state.points,
      };
    case 'nextQuestion':
      return {
        ...state, index: state.index + 1, answer: null
      };
    case 'finish':
      return {
        ...state, status: 'finished',
      };
    case 'restart':
      return {
        ...state, questions: state.questions, status: 'ready'
      };
    default:
      throw new Error( 'Action unknown' );
  }
}


function App() {
  const [
    { questions, status, index, answer, points }, dispatch
  ] = useReducer( reducer, initialState );
  
  //  Todo:  Calculate the length of the questions array;
  //   this will be displayed in StartScreen component's h2
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce( ( prev, cur ) => prev + cur.points, 0 );

//  Run the data on mount:  []
//  Note: Run npm run server on a separate terminal
  useEffect( function () {
    fetch( 'http://localhost:8000/questions' )
        .then( ( res ) => res.json() )
        .then( ( data ) => dispatch( { type: 'dataReceived', payload: data } ) )
        .catch( ( err ) => dispatch( { type: 'dataFailed' } ) );
  }, [] );
  
  return (
      <div className='app'>
        <Header />
        <Main>
          { status === 'loading' && <Loader /> }
          { status === 'error' && <Error /> }
          { status === 'ready' && (
              <StartScreen
                  numQuestions={ numQuestions }
                  dispatch={ dispatch }
              /> ) }
          { status === 'active' && (
              <>
                <Progress
                    index={ index }
                    numQuestions={ numQuestions }
                    points={ points }
                    answer={ answer }
                    maxPossiblePoints={ maxPossiblePoints }
                />
                <Question
                    question={ questions[ index ] }
                    dispatch={ dispatch }
                    answer={ answer }
                />
                <NextButton
                    dispatch={ dispatch }
                    answer={ answer }
                    numQuestions={ numQuestions }
                    index={ index }
                />
              </> ) }
          { status === 'finished' && (
              <FinishScreen
                  points={ points }
                  dispatch={ dispatch }
                  maxPossiblePoints={ maxPossiblePoints }
              /> ) }
        </Main>
      </div> );
}


export default App;