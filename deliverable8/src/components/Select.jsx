export function Select({ value, onChange }) {
  return (
    <select className="select" value={value} onChange={onChange}>
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  );
}