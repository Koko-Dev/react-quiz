import Header from './components/Header';
import Main from './components/Main';


function App() {
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