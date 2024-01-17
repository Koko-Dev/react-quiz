import { createContext, useContext, useReducer } from 'react';


const QuizContext = createContext();

const initialState = {};

function reducer( state, action ) {
  const [ {}, dispatch ] = useReducer( reducer, initialState );
  switch ( action.type ) {
    default:
      throw new Error( 'Action unknown ' );
  }
}


function QuizProvider( { children } ) {
  return (
      <QuizContext.Provider value={ {} }>{ children }</QuizContext.Provider> );
}


function useQuiz() {
  const context = useContext( QuizContext );
  if ( context === undefined ) throw new Error( 'QuizContext was used outsie of the QuizProvider' );
  return context;
}


export { QuizProvider, useQuiz };