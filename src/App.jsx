import { useState } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import GroupPage from './pages/GroupPage.jsx';
import AssignmentPage from './pages/AssignmentPage.jsx';

/**
 * App Component
 * This is the main component of the application. It manages the user's
 * authentication state and controls which page is currently displayed.
 */
const App = () => {
  // State to store the current user, or null if not logged in.
  const [currentUser, setCurrentUser] = useState(null);
  // State to track the currently viewed page.
  const [currentPage, setCurrentPage] = useState('login');
  // State to hold data for the current group.
  const [currentGroup, setCurrentGroup] = useState(null);
  // State to hold data for the current assignment.
  const [currentAssignment, setCurrentAssignment] = useState(null);

  /**
   * Handles a successful login.
   * @param {object} user The user object returned from the API.
   */
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  /**
   * Navigates to the GroupPage with a specific group.
   * @param {object} group The group object to navigate to.
   */
  const navigateToGroup = (group) => {
    setCurrentGroup(group);
    setCurrentPage('group');
  };

  /**
   * Navigates back to the Dashboard.
   */
  const navigateToDashboard = () => {
    setCurrentPage('dashboard');
    setCurrentGroup(null);
    setCurrentAssignment(null);
  };

  /**
   * Navigates to the AssignmentPage with a specific assignment.
   * @param {object} assignment The assignment object to navigate to.
   */
  const navigateToAssignment = (assignment) => {
    setCurrentAssignment(assignment);
    setCurrentPage('assignment');
  };
  
  // Conditionally render the correct page based on the current state.
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage currentUser={currentUser} navigateToGroup={navigateToGroup} />;
      case 'group':
        return <GroupPage group={currentGroup} navigateToDashboard={navigateToDashboard} navigateToAssignment={navigateToAssignment} />;
      case 'assignment':
        return <AssignmentPage assignment={currentAssignment} currentUser={currentUser} />;
      case 'login':
      default:
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }
  };

  

  // Main application layout with a consistent header and the rendered page.
  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans antialiased">
      <header className="flex items-center justify-between p-4 bg-white shadow-md rounded-xl mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Learning Portal
        </h1>
        {currentUser && (
          <div className="text-sm font-medium text-gray-600">
            Logged in as: <span className="text-indigo-600">{currentUser.name}</span>
          </div>
        )}
      </header>
      <main className="container mx-auto p-6 bg-white rounded-xl shadow-md">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;