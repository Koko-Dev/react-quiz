export default function Progress( { index, numQuestions, points, answer } ) {
  return (
      <header className='progress'>
        <p>Question <strong>{ index }</strong></p>
      </header> );
}