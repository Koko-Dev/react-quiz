import Header from './components/Header';
import Main from './components/Main';
import { useEffect } from 'react';


function App() {

//  Run the data on mount:  []
  useEffect( function () {
    fetch( 'http://localhost:8000/questions' )
        .then( ( res ) => res.json() )
        .then( ( data ) => console.log( data ) )
        .catch( ( err ) => console.log( 'Error' ) );
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