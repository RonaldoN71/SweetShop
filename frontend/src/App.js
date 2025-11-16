import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import SweetList from "./pages/SweetList";
import CreateSweet from "./pages/CreateSweet";
import EditSweet from "./pages/EditSweet";
import PurchaseSweet from "./pages/PurchaseSweet";
import RestockSweet from "./pages/RestockSweet";

function App() {
  return (
    <Router>
      {/* AuthProvider keeps user + token available across the app */}
      <AuthProvider>
        <Navbar />

        {/* Application Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Pages */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <SweetList />
              </PrivateRoute>
            }
          />

          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateSweet />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditSweet />
              </PrivateRoute>
            }
          />

          <Route
            path="/purchase/:id"
            element={
              <PrivateRoute>
                <PurchaseSweet />
              </PrivateRoute>
            }
          />

          <Route
            path="/restock/:id"
            element={
              <PrivateRoute>
                <RestockSweet />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
