import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import GroupPage from './pages/GroupPage.jsx';
import AssignmentPage from './pages/AssignmentPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import TeacherDashboard from './pages/TeacherDashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { useAuth } from './services/authServices.jsx';
import AddSubject from './pages/AddSubject.jsx';
import AddAssignment from './pages/AddAssignment.jsx';

const App = () => {
  const { user } = useAuth();

  const renderRole = () => {
    console.log('Current User:', user?.role.toLowerCase());
    if (user?.role.toLowerCase() === 'admin') return <AdminDashboard />;
    if (user?.role.toLowerCase() === 'teacher') return <TeacherDashboard />;
    return <DashboardPage currentUser={user} />;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans antialiased">
      <header className="flex items-center justify-between p-4 bg-white shadow-md rounded-xl mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Learning Portal
        </h1>

        {user && (
          <div className="text-sm font-medium text-gray-600">
            Logged in as: <span className="text-indigo-600">{user.username}</span>
          </div>
        )}
      </header>

      <main className="mx-auto p-6 bg-white rounded-xl shadow-md">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                {renderRole()}
              </PrivateRoute>
            }
          />

          <Route
            path="/group"
            element={
              <PrivateRoute>
                <GroupPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/assignment"
            element={
              <PrivateRoute>
                <AssignmentPage />
              </PrivateRoute>
            }
          />
          <Route path="/add-subject" element={
            <PrivateRoute>
              <AddSubject />
            </PrivateRoute>
          } />
          <Route path="/add-assignment" element={
            <PrivateRoute>
              <AddAssignment />
            </PrivateRoute>
          } />
        </Routes>
      </main>
    </div>
  );
};

export default App;
