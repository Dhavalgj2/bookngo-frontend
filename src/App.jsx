import { Route, Routes } from "react-router";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import OrderReview from "./components/Review/OrderReview";
import AttendForm from "./components/AttendForm/AttendForm";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="">
      <NavBar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attendance" element={<AttendForm />} />
          <Route path="/review" element={<OrderReview />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
