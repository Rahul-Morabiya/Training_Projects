export function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      <span className={`mark ${value === "X" ? "x" : "o"}`}>
        {value}
      </span>
    </button>
  );
}