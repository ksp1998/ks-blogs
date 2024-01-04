import { Footer, Header } from "./components";
import Posts from "./components/home/Posts";

function App() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="w-full container flex-grow mx-auto">
        <Posts />
      </div>
      <Footer />
    </main>
  );
}

export default App;
