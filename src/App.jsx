import Signup from "./components/auth/Signup"
import Login from "./components/auth/LogIn"
import { Route, Routes } from "react-router-dom"
// import ProtectedRoute from './utils/Protected.Route.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/home/Home.jsx"
// import Profile from "./components/home/Profile.jsx";
import useAuth from "./hooks/useAuth.js";
function App() {
  const { token } = useAuth();
  return (
    <div className="min-h-auto h-screen w-full overflow-hidden">
    { token && <Home />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
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
