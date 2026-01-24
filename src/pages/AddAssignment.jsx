import { useState } from "react";
import Modal from "./Modal";
import api from "../api/axiosConfig"
import { useNavigate } from "react-router-dom";


const AddAssignment= ({ open, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const[error,setError]=useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    subjectId: "",
    maxMarks: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
   e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...form,
      };
     
      console.log("Registration values:", payload);

      await api.post("/api/assignments", payload);

       onSuccess?.(); 
      onClose(); 
      setForm({
    title: "", description: "",  subjectId: "", maxMarks: "", dueDate: "",
  });

  // navigate("/dashboard");

    
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");  
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Assignment">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          placeholder="Assignment Title"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
        />

        <input
          name="subjectId"
          placeholder="Subject ID"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="maxMarks"
          placeholder="Maximum Marks"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="dueDate"
          type="date"
          placeholder="Due Date"
          className="w-full border px-3 py-2 rounded"
          onChange={handleChange}
          required
        />
        

        <div className="flex justify-end gap-2 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-indigo-600 text-white"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}



export default AddAssignment;