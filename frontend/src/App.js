import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./pages/SignIn";
import "./index.css";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./State/State_Auth/authSlice";

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #F4F4F5, #EAEAEA)",
          backgroundSize: "300% 300%",
          animation: "gradientAnimation 10s ease infinite",
        }}
      >
        <BrowserRouter>
          <NavBar />
          <div style={{ padding: "20px" }}>
            <Routes>
              <Route path="/login" element={<SignIn />} />

              {!isAuthenticated ? (
                <Route path="*" element={<Navigate to="/login" />} />
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="warehouse/dashboard"
                    element={
                      <ProtectedRoute
                        allowedRoles={["Warehouse-Assistant"]}
                        element={<DashboardPage />}
                      />
                    }
                  />
                  <Route
                    path="warehouse/stats"
                    element={
                      <ProtectedRoute
                        allowedRoles={["Warehouse-Assistant"]}
                        element={<DashboardPage />}
                      />
                    }
                  />
                  <Route
                    path="warehouse/inventory"
                    element={
                      <ProtectedRoute
                        allowedRoles={["Warehouse-Assistant"]}
                        element={<DashboardPage />}
                      />
                    }
                  />
                  <Route
                    path="warehouse/inventory/beverage-details/:type"
                    element={
                      <ProtectedRoute
                        allowedRoles={["Warehouse-Assistant"]}
                        element={<DashboardPage />}
                      />
                    }
                  />
                  <Route
                    path="warehouse/bars"
                    element={
                      <ProtectedRoute
                        allowedRoles={["Warehouse-Assistant"]}
                        element={<DashboardPage />}
                      />
                    }
                  />
                  {"Bar Routes :"}
                  <Route
                    path="bar/dashboard"
                    element={
                      <ProtectedRoute
                        allowedRoles={["Bartender"]}
                        element={<DashboardPage />}
                      />
                    }
                  />
                  <Route
                    path="bar/bars/:barName"
                    element={
                      <ProtectedRoute
                        allowedRoles={["Bartender"]}
                        element={<DashboardPage />}
                      />
                    }
                  />
                  <Route
                    path="bar/bars/:barName/stats"
                    element={
                      <ProtectedRoute
                        allowedRoles={["Bartender"]}
                        element={<DashboardPage />}
                      />
                    }
                  />

                   <Route
                    path="bar/bars/:barName/inventory"
                    element={
                      <ProtectedRoute
                        allowedRoles={["Bartender"]}
                        element={<DashboardPage />}
                      />
                    }
                  />
                  {" "}
                </>
              )}
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
