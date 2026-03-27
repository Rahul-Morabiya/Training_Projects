export function Button({ children, onClick, variant = "primary" }) {
  return (
    <button className={`btn ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}