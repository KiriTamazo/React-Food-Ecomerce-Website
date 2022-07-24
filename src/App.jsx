import Header from "./components/Header/Header";

function App() {
  return (
    <div className="w-screen h-auto flex flex-col bg-indigo-500">
      <Header />
      <main className="mt-24 p-8 w-full">MainContainer</main>
    </div>
  );
}

export default App;
