export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-16">
          Welcome to Quick Colleague Recommendation
        </h1>
        <button className="w-fit bg-blue-300 p-2 rounded-md text-white">
          New Recommendation
        </button>{" "}
      </div>
    </main>
  );
}
