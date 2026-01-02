import { ArrowLeft } from 'lucide-react';

/**
 * AssignmentPage Component
 * This component displays the details of a specific assignment.
 */
const AssignmentPage = ({ assignment, currentUser }) => {
  // Simple check to ensure we have an assignment to display.
  if (!assignment) {
    return (
      <div className="text-center p-8 bg-red-100 text-red-700 rounded-lg">
        <p className="font-semibold">Assignment not found.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => window.history.back()}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          title="Back to Group"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800">{assignment.title}</h2>
      </div>

      <p className="text-gray-600">
        This is the detail page for the assignment. Here you would find the assignment description,
        submission form, and any other relevant information.
      </p>
      
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <span className="text-gray-500 font-medium">Due Date:</span>
          <span className="text-gray-800 font-semibold">{assignment.dueDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Assigned To:</span>
          <span className="text-gray-800 font-semibold">{currentUser.name}</span>
        </div>
      </div>
      
      {/* You can add more assignment details here */}
      <div className="p-6 bg-white border border-gray-200 rounded-xl">
        <h3 className="font-semibold text-lg mb-2">Description</h3>
        <p className="text-gray-700">
          This is a placeholder for the assignment's detailed description.
          A detailed explanation of the task, including any required files, format, and rubric, would go here.
        </p>
      </div>
    </div>
  );
};

export default AssignmentPage;
