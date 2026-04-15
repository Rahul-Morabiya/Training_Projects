export default function Card({ children }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md p-4">
      {children}
    </div>
  );
}