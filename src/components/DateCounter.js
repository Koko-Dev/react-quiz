import { useState } from 'react';


function DateCounter() {
  const [ count, setCount ] = useState( 0 );
  const [ step, setStep ] = useState( 1 );

//  This mutates the date object.
  const date = new Date( 'june 21, 2027' );
  date.setDate( date.getDate() + count );
  
  const dec = function () {
//    setCount( ( prevState ) => prevState - 1 );
    setCount( prevState => prevState - step );
  };
  
  const inc = function () {
//    setCount( ( prevState ) => prevState + 1 );
    setCount( prevState => prevState + step );
  };
  
  const defineCount = function ( e ) {
    setCount( Number( e.target.value ) );
  };
  
  const defineStep = function ( e ) {
    setStep( Number( e.target.value ) );
  };
  
  const reset = function () {
    setCount( 0 );
    setStep( 1 );
  };
  
  return (
      <div className='counter'>
        <div>
          <input
              type='text'
              min='0'
              max='10'
              value={ step }
              onChange={ defineStep }
          />
          <span>{ step }</span>
        </div>
        
        <div>
          <button onClick={ dec }>-</button>
          <input
              type='text'
              value={ count }
              onChange={ defineCount }
          />
          <button onClick={ inc }>+</button>
        </div>
        
        <p>{ date.toDateString() }</p>
        
        <div>
          <button onClick={ reset }>Reset</button>
        </div>
      </div> );
}


export default DateCounter;