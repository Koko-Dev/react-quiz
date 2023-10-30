import Header from './components/Header';
import Main from './components/Main';
import { useEffect, useReducer } from 'react';


const initialState = {
  questions: [],

//  'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading'
};

function reducer( state, action ) {
  switch ( action.type ) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    default:
      throw new Error( 'Action unknown' );
  }
}

function App() {
  const [ state, dispatch ] = useReducer( reducer, initialState );

//  Run the data on mount:  []
  useEffect( function () {
    fetch( 'http://localhost:8000/questions' )
        .then( ( res ) => res.json() )
        .then( ( data ) => dispatch( { type: 'dataReceived', payload: data } ) )
        .catch( ( err ) => dispatch( { type: 'dataFailed' } ) );
  }, [] );
  
  return (
      <div className='app'>
        <h1>
          <Header />
          <Main>
            <p>1/15</p>
            <p>Questions</p>
          </Main>
        </h1>
      </div> );
}


export default App;