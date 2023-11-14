import { useEffect } from 'react';


export default function Timer( { dispatch, secondsRemaining } ) {
  useEffect( () => {
    setInterval( () => {
//      console.log( 'tick' );
    }, 1000 );
  }, [] );
  return (
      <div className='timer'>Timer</div> );
}