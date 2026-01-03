/**
 * Mock API for the Learning App.
 * This file simulates asynchronous data fetching with a delay to mimic network latency.
 */

// A simple utility function to simulate an API delay.
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data for the application.
const mockData = {
  users: [
    { id: '1', name: 'Alice Johnson', type: 'student' },
    { id: '2', name: 'Bob Williams', type: 'teacher' },
  ],
  groups: [
    { id: 'grp1', name: 'Algebra I', teacherId: '2' },
    { id: 'grp2', name: 'Biology 101', teacherId: '2' },
    { id: 'grp3', name: 'World History', teacherId: '2' },
  ],
  assignments: [
    { id: 'asg1', groupId: 'grp1', title: 'Chapter 1 Quiz', dueDate: '2025-09-15' },
    { id: 'asg2', groupId: 'grp1', title: 'Homework Set 2', dueDate: '2025-09-20' },
    { id: 'asg3', groupId: 'grp2', title: 'Lab Report: Cell Structure', dueDate: '2025-09-18' },
  ],
};

/**
 * Simulates user authentication.
 * @param {string} username The username to authenticate.
 * @param {string} password The password for authentication.
 * @returns {Promise<object | null>} A promise that resolves with user data on success, or null on failure.
 */
export const login = async (username, password) => {
  await delay(1000); // Simulate network delay
  const user = mockData.users.find(u => u.name.toLowerCase() === username.toLowerCase());
  
  if (user) {
    // In a real app, we would validate a password here.
    return {
      id: user.id,
      name: user.name,
      type: user.type,
    };
  }
  return null;
};

/**
 * Fetches groups associated with a teacher.
 * @param {string} teacherId The ID of the teacher.
 * @returns {Promise<Array>} A promise that resolves with an array of group objects.
 */
export const fetchGroupsByTeacher = async (teacherId) => {
  await delay(500);
  return mockData.groups.filter(group => group.teacherId === teacherId);
};

export const fetchGroupsByStudent = async (studentId) => {
  await delay(500);
  return mockData.groups.filter(group =>
    group.studentIds.includes(studentId)
  );
};


/**
 * Fetches assignments for a specific group.
 * @param {string} groupId The ID of the group.
 * @returns {Promise<Array>} A promise that resolves with an array of assignment objects.
 */
export const fetchAssignmentsByGroup = async (groupId) => {
  await delay(500);
  return mockData.assignments.filter(assignment => assignment.groupId === groupId);
};
