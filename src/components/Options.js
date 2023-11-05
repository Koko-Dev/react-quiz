export default function Options( { question, dispatch, answer }) {
  return (
      <div>
        { question.options.map((option, index) => (
            <buttonOptions></buttonOptions>
        ))}
        
      </div>
  )
}