import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="w-full flex-grow mx-auto">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </main>
  );
}

export default App;
