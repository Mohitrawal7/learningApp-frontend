import { useState, useEffect } from 'react';
import { ArrowLeft, ClipboardList, CircleDashed } from 'lucide-react';
import { fetchAssignmentsByGroup } from '../api.js';

/**
 * GroupPage Component
 * This component displays the details of a specific group, including its assignments.
 * It fetches the assignments from the mock API.
 */
const GroupPage = ({ group, navigateToDashboard, navigateToAssignment }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (group) {
      const loadAssignments = async () => {
        try {
          setLoading(true);
          const fetchedAssignments = await fetchAssignmentsByGroup(group.id);
          setAssignments(fetchedAssignments);
        } catch (err) {
          setError('Failed to load assignments. Please try again.');
          console.error('Error fetching assignments:', err);
        } finally {
          setLoading(false);
        }
      };
      loadAssignments();
    }
  }, [group]);

  // Display a loading indicator while the data is being fetched.
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 text-gray-500">
        <CircleDashed size={48} className="animate-spin" />
        <p className="text-lg">Loading assignments for {group.name}...</p>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={navigateToDashboard}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          title="Back to Dashboard"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800">{group.name}</h2>
      </div>

      <p className="text-gray-600">
        Here are the assignments for this group.
      </p>

      {assignments.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No assignments found for this group.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignments.map(assignment => (
            <div
              key={assignment.id}
              onClick={() => navigateToAssignment(assignment)}
              className="group cursor-pointer bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out border-l-4 border-emerald-500 hover:border-emerald-600"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                  <ClipboardList size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {assignment.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Due: <span className="font-medium">{assignment.dueDate}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupPage;

