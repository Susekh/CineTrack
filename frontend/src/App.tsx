// App.tsx
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NewEntry from "./pages/NewEntry";
import EditEntryPage from "./pages/EditEntry";
import AuthContainer from "./components/auth/AuthContainer";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col  bg-[#14181C]"
    >
      <Navbar/>

      <main className="flex-1 container mx-auto">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home/>} />
          
          <Route path="/auth" element={<Auth />} />
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <AuthContainer>
                <Dashboard />
              </AuthContainer>
            }
          />
          <Route
            path="/entry/new"
            element={
              <AuthContainer>
                <NewEntry />
              </AuthContainer>
            }
          />
          <Route
            path="/entry/edit/:id"
            element={
              <AuthContainer>
                <EditEntryPage />
              </AuthContainer>
            }
          />

          {/* ❌ 404 / Wildcard Route */}
          <Route
            path="*"
            element={
              <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                <h1 className="text-5xl font-bold text-gray-100">404</h1>
                <p className="text-gray-400 text-lg">
                  Oops! The page you’re looking for doesn’t exist.
                </p>
                <a
                  href="/"
                  className="mt-4 inline-block px-5 py-2 bg-[#00A878] text-white rounded-md hover:bg-[#01996e] transition"
                >
                  Go Home
                </a>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer/>
    </div>
  );
}

export default App;
