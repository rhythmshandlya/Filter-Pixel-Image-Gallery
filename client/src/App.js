import "./App.css";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
      <Layout>
        <Home />
      </Layout>
    </div>
  );
}

export default App;
