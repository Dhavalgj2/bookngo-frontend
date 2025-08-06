import { Route, Routes } from "react-router";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import OrderReview from "./components/Review/OrderReview";
import AttendForm from "./components/AttendForm/AttendForm";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Signup/Signup";
import AdminReview from "./components/AdminReview/AdminReview";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <div className="app-container">
      <NavBar />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attendance" element={<AttendForm />} />
          <Route path="/review" element={<OrderReview />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin-review"
            element={
              <ProtectedRoute>
                <AdminReview />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
