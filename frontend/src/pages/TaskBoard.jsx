import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import Layout from "../components/Layout";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";
import { apiCall } from "../utils/api";


function TaskBoard() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);


const handleAddTask = async () => {
  if (!newTaskTitle.trim()) return;

  try {
    const response = await apiCall(
      //`http://localhost:8080/projects/${projectId}/tasks/createTask`,
      `${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks/createTask`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: newTaskTitle
        })
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create task");
    }

    const createdTask = await response.json();

    setTasks(prev => [...prev, createdTask]);
    setNewTaskTitle("");

  } catch (err) {
    console.error(err);
  }
};



const updateStatus = async (taskId, newStatus) => {
  try {
    const response = await apiCall(
      //`http://localhost:8080/projects/${projectId}/tasks/${taskId}/status?status=${newStatus}`,
      `${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks/${taskId}/status?status=${newStatus}`, 
      {
        method: "PUT"
      }
    );

    const updatedTask = await response.json();

    setTasks(prev =>
      prev.map(t =>
        t.id === taskId ? updatedTask : t
      )
    );

  } catch (err) {
    console.error(err);
  }
};



const handleDragEnd = async (result) => {
  const { source, destination, draggableId } = result;

  if (!destination) return;

  if (source.droppableId === destination.droppableId) return;

  const taskId = parseInt(draggableId);
  const newStatus = destination.droppableId;

  try {
    const response = await apiCall(
      //`http://localhost:8080/projects/${projectId}/tasks/${taskId}/status?status=${newStatus}`,
      `${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks/${taskId}/status?status=${newStatus}`,
      {
        method: "PUT"
      }
    );

    const updatedTask = await response.json();

    setTasks(prev =>
      prev.map(t =>
        t.id === taskId ? updatedTask : t
      )
    );

  } catch (err) {
    console.error(err);
  }
};



useEffect(() => {
  const fetchTasks = async () => {
    setLoading(true);

    try {
      const response = await apiCall(
        //`http://localhost:8080/projects/${projectId}/tasks/getTask`
        `${import.meta.env.VITE_API_URL}projects/${projectId}/tasks/getTask`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchTasks();
}, [projectId]);



const deleteTask = async (taskId) => {
  try {
    await apiCall(
      //`http://localhost:8080/projects/${projectId}/tasks/${taskId}`,
      `${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks/${taskId}`, 
      {
        method: "DELETE"
      }
    );

    setTasks(prev =>
      prev.filter(t => t.id !== taskId)
    );

  } catch (err) {
    console.error(err);
  }
};



return (
  <Layout>

    <div className="mb-6 flex gap-2">
      <input
        type="text"
        placeholder="New Task Title"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        className="border border-black p-2 w-64"
      />
      <button
        onClick={handleAddTask}
        className="border border-black px-4 hover:bg-black hover:text-white transition"
      >
        Add Task
      </button>
    </div>

    {loading ? (

      <div className="flex justify-center mt-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
      </div>

    ) : tasks.length === 0 ? (

      <div className="text-center mt-20 opacity-70">
        <h2 className="text-lg font-semibold">
          No Tasks Yet
        </h2>
        <p>Add a task to start managing your workflow.</p>
      </div>

    ) : (

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {["TODO", "IN_PROGRESS", "DONE"].map((status) => (

            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="border border-black p-4 min-h-[200px]"
                >
                  <h2 className="font-bold mb-4 text-center">
                    {status}
                  </h2>

                  {tasks
                    ?.filter((task) => task.status === status)
                    ?.map((task, index) => (

                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              task={task}
                              onStatusChange={updateStatus}
                              onDelete={deleteTask}
                            />
                          </div>
                        )}
                      </Draggable>

                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>

          ))}

        </div>
      </DragDropContext>

    )}

  </Layout>
);


}

export default TaskBoard;
