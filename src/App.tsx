import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";

function App() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="w-full container flex-grow mx-auto">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default App;
