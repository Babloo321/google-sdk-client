import Signup from "./components/auth/Signup"
import Login from "./components/auth/LogIn"
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from './utils/Protected.Route.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/home/Home.jsx"
import Products from "./components/you/Products.jsx";
import useAuth from "./hooks/useAuth.js";
import Header from "./components/header/Header.jsx";
import AddProducts from './pages/header/AddProducts.jsx';
import ViewProducts from './pages/header/ViewProducts.jsx';
import Profile from './pages/header/Profile.jsx';
function App() {
  const { token } = useAuth();
  return (
    <div className="min-h-auto h-screen w-full overflow-hidden">
    { token && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-products" element={<ProtectedRoute><AddProducts /></ProtectedRoute>} />
        <Route path="/view-products" element={<ProtectedRoute><ViewProducts /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="colored"
      />
      </div>
  )
}

export default App
