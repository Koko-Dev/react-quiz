export default function FinishScreen( { points, dispatch, maxPossiblePoints } ) {
  const percentage = (
                         points / maxPossiblePoints ) * 100;
  return (
      <p>You scored <strong>{ points }</strong> out of {maxPossiblePoints}</p> );
}