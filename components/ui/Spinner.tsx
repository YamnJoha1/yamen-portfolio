export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-[300px]">
      <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}