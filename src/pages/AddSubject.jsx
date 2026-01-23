import { useState } from "react";
import Modal from "./Modal";
import api from "../api/axiosConfig"
import { useNavigate } from "react-router-dom";


const AddSubject = ({ open, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const[error,setError]=useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    teacherId: "",
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

      await api.post("/api/subjects", payload);

       onSuccess?.(); 
      onClose(); 
      setForm({
    name: "",description: "",  teacherId: "",
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
    <Modal open={open} onClose={onClose} title="Add Subject">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Subject Name"
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
          name="teacherId"
          placeholder="Teacher ID"
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



export default AddSubject;