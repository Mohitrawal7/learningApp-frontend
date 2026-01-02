import { useState, useEffect } from 'react';
import { BookOpen, Users, CircleDashed } from 'lucide-react';
import { fetchGroupsByTeacher } from '../api.js';

/**
 * DashboardPage Component
 * This component displays the user's dashboard, including a list of their groups.
 * It fetches data from the mock API and handles loading and error states.
 */
const DashboardPage = ({ currentUser, navigateToGroup }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch groups if the user is a teacher.
    if (currentUser && currentUser.type === 'teacher') {
      const loadGroups = async () => {
        try {
          setLoading(true);
          const fetchedGroups = await fetchGroupsByTeacher(currentUser.id);
          setGroups(fetchedGroups);
        } catch (err) {
          setError('Failed to load groups. Please try again.');
          console.error('Error fetching groups:', err);
        } finally {
          setLoading(false);
        }
      };
      loadGroups();
    } else {
      setLoading(false);
      setError('You are not authorized to view this page.');
    }
  }, [currentUser]);

  // Display a loading indicator while the data is being fetched.
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 text-gray-500">
        <CircleDashed size={48} className="animate-spin" />
        <p className="text-lg">Loading your dashboard...</p>
      </div>
    );
  }

  // Display an error message if the API call fails.
  if (error) {
    return (
      <div className="text-center p-8 bg-red-100 text-red-700 rounded-lg">
        <p className="font-semibold">{error}</p>
      </div>
    );
  }
  
  // Display the dashboard content once the data is loaded.
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">My Dashboard</h2>
      <p className="text-gray-600">
        Welcome, <span className="font-medium text-indigo-600">{currentUser.name}</span>! Here are your groups.
      </p>

      {groups.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You don't have any groups yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map(group => (
            <div
              key={group.id}
              onClick={() => navigateToGroup(group)}
              className="group cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border-t-4 border-indigo-500 hover:border-indigo-600"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                  <Users size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {group.name}
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-500">Teacher: {currentUser.name}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigating to group page on button click
                  navigateToGroup(group);
                }}
                className="mt-4 w-full text-center py-2 px-4 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                View Group
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
