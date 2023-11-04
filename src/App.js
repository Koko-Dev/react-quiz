import Header from './components/Header';
import Main from './components/Main';
import { useEffect, useReducer } from 'react';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';


const initialState = {
  questions: [],

//  'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
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
    default:
      throw new Error( 'Action unknown' );
  }
}


function App() {
  const [ { questions, status }, dispatch ] = useReducer( reducer, initialState );

//  Todo:  Calculate the length of the questions array;
//   this will be displayed in StartScreen component's h2
  const numQuestions = questions.length;


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
          { status === 'active' && <Question /> }
        </Main>
      </div> );
}


export default App;