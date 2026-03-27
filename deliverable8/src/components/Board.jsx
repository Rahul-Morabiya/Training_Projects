import { Square } from "./Square";

export function Board({ squares, onClick }) {
  return (
    <div className="board">
      {squares.map((sq, i) => (
        <Square key={i} value={sq} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}