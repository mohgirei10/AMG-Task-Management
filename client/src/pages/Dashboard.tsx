import { useEffect, useState } from "react";
import api from "../utility/api"
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Task{
  _id: string;
  title: string;
  description: string;
  state: string;
  createdAt:string
};

const Dashboard = () => {
  const navigate = useNavigate()

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ongoing");


  
  const fetchTask = async () => {
    try {
      const res = await api.get('/task/all-tasks')
      setTasks(res.data.tasks);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message)
      }
    }  
    }
    
  const handleAddTask = async () => {
    try {
      await api.post("/task/add-task", {title, description})
      setTitle("");
      setDescription("");
      await fetchTask()
      setIsModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message)
      }
    }
  };
  
  
  const markAsCompleted = async (id: string) => {
    try {
      await api.put(`/task/update-task/${id}`)
      fetchTask()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message)
      } 
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/task/delete-task/${id}`)
      fetchTask()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message)
      } 
    }
  };
  const logout = async () => {
    localStorage.removeItem("token")
  };

  useEffect(()=>{
    if (!(localStorage.getItem("token"))) {
      navigate("/login")
    }
    fetchTask()
  })

  return (
    <div className="flex h-screen bg-gray-100">
    
      <aside className="w-64 bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">LeoTasks-TMA</h1>
        <nav className="flex flex-col gap-4">
          <a href="#" className="text-gray-700 hover:text-blue-600">Tasks</a>
        </nav>
        <p onClick={logout} className="cursor-pointer hover:text-blue-600">Logout</p>
      </aside>

  
      <main className="flex-1 p-8">
     
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">My Tasks</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Task
          </button>
        </div>

      
        <div className="grid gap-4">
          {error && <p className="text-red-600"> {error}</p>}
          <div className="flex">
            <div className="w-full text-center py-4 bg-red-400 text-white" onClick={()=>setFilter("ongoing")}>
              Ongoing Tasks
            </div>
            <div className= "w-full text-center py-4 bg-green-400 text-white" onClick={()=>setFilter("Completed")}>
              Completed Tasks
            </div>
          </div>
          {tasks.filter(task=>task.state===filter).map((task) => (
            <div key={task._id} className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-md font-semibold text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <span className={`text-xs font-medium mt-2 inline-block ${
                    task.state=="Completed" ? "text-green-600" : "text-yellow-600"
                  }`}>
                    {task.state}
                  </span>
                </div>
                <div className="flex flex-col gap-2">

                {task.state==="ongoing" && (
                  <button
                    onClick={() => markAsCompleted(task._id)}
                    className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                  >
                    Mark as Completed
                  </button>
                )}
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete Task
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </main>

      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-lg font-bold mb-4 text-gray-700">Add New Task</h3>
            <input
              type="text"
              placeholder="Title"
              className="w-full mb-3 p-2 border border-gray-300 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;