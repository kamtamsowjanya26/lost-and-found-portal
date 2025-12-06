// src/App.js
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import SignInPage from './pages/SignInPage';
import MyReportsPage from './pages/MyReportsPage';
import NotFoundPage from './pages/NotFoundPage';
import ReportItemPage from './pages/ReportItemPage';
import { useAuth } from './hooks/useAuth';

function ProtectedRoute({ children }) {
  const user = useAuth();
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

export default function App() {
  const user = useAuth();

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="navbar-left">
          <span className="navbar-brand">Campus Lost &amp; Found</span>
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/report" className="nav-link">
            Report Item
          </Link>
          <Link to="/me/reports" className="nav-link">
            My Reports
          </Link>
        </div>
        <div className="navbar-right">
          {user ? (
            <span className="nav-user">Signed in as {user.name}</span>
          ) : (
            <Link to="/signin" className="nav-link">
              Sign In
            </Link>
          )}
        </div>
      </header>

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items/:id" element={<ItemDetailsPage />} />
          <Route path="/signin" element={<SignInPage />} />

          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportItemPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/me/reports"
            element={
              <ProtectedRoute>
                <MyReportsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="footer">
        Campus Lost &amp; Found &middot; Web Server Programming Project
      </footer>
    </div>
  );
}
