import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import Layout from "../components/Layout";
import { apiCall } from "../utils/api";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✅ Create Project
  const handleAddProject = async () => {
    if (!newProjectName.trim()) return;
    if (creating) return;

    setCreating(true);

    try {
      const response = await apiCall(
        `${import.meta.env.VITE_API_URL}/projects/createProject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: newProjectName
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const createdProject = await response.json();

      setProjects(prev => [...prev, createdProject]);
      setNewProjectName("");

    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  // ✅ Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);

      try {
        const response = await apiCall(
          `${import.meta.env.VITE_API_URL}/projects/getProjects`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // ✅ Update Status
  const updateProjectStatus = async (projectId, newStatus) => {
    if (updatingId) return;

    setUpdatingId(projectId);

    try {
      const response = await apiCall(
        `${import.meta.env.VITE_API_URL}/projects/${projectId}/status?status=${newStatus}`,
        {
          method: "PUT"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedProject = await response.json();

      setProjects(prev =>
        prev.map(p =>
          p.id === projectId ? updatedProject : p
        )
      );

    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // ✅ Delete Project
  const deleteProject = async (projectId) => {
    if (deletingId) return;

    setDeletingId(projectId);

    try {
      await apiCall(
        `${import.meta.env.VITE_API_URL}/projects/${projectId}`,
        {
          method: "DELETE"
        }
      );

      setProjects(prev =>
        prev.filter(p => p.id !== projectId)
      );

    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Layout>

      {/* Create Project */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="New Project Name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="border border-black p-2 w-64"
        />
        <button
          onClick={handleAddProject}
          disabled={creating}
          className="border border-black px-4 hover:bg-black hover:text-white transition disabled:opacity-50"
        >
          {creating ? "Creating..." : "Add Project"}
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
        </div>
      ) : projects.length === 0 ? (

        // Empty State
        <div className="text-center mt-20 opacity-70">
          <h2 className="text-xl font-semibold mb-2">
            No Projects Yet
          </h2>
          <p>Create your first project to get started.</p>
        </div>

      ) : (

        // Projects Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onToggleStatus={updateProjectStatus}
              onDelete={deleteProject}
              onOpen={(id) => navigate(`/projects/${id}`)}
              updating={updatingId === project.id}
              deleting={deletingId === project.id}
            />
          ))}
        </div>

      )}

    </Layout>
  );
}

export default Dashboard;



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ProjectCard from "../components/ProjectCard";
// import Layout from "../components/Layout";
// import { apiCall } from "../utils/api";

// function Dashboard() {
//   const [projects, setProjects] = useState([]);
//   const navigate = useNavigate();
//   const [newProjectName, setNewProjectName] = useState("");
//   const [loading, setLoading] = useState(true);


//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };



//   const handleAddProject = async () => {
//   try {
//     const response = await apiCall(
//       //"http://localhost:8080/projects/createProject",
//       `${import.meta.env.VITE_API_URL}/projects/createProject`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           name: newProjectName
//         })
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to create project");
//     }

//     const createdProject = await response.json();

//     setProjects(prev => [...prev, createdProject]);
//     setNewProjectName("");

//   } catch (err) {
//     console.error(err);
//   }
// };



//   useEffect(() => {
//   const fetchProjects = async () => {
//     setLoading(true);

//     try {
//       const response = await apiCall(
//         //"http://localhost:8080/projects/getProjects"
//         `${import.meta.env.VITE_API_URL}/projects/getProjects`
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch projects");
//       }

//       const data = await response.json();
//       setProjects(data);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchProjects();
// }, []);



// const updateProjectStatus = async (projectId, newStatus) => {
//   try {
//     const response = await apiCall(
//       //`http://localhost:8080/projects/${projectId}/status?status=${newStatus}`,
//       `${import.meta.env.VITE_API_URL}projects/${projectId}/status?status=${newStatus}`,
//       {
//         method: "PUT"
//       }
//     );

//     const updatedProject = await response.json();

//     setProjects(prev =>
//       prev.map(p =>
//         p.id === projectId ? updatedProject : p
//       )
//     );

//   } catch (err) {
//     console.error(err);
//   }
// };



// const deleteProject = async (projectId) => {
//   try {
//     await apiCall(
//       //`http://localhost:8080/projects/${projectId}`,
//       `${import.meta.env.VITE_API_URL}/projects/${projectId}`,
//       {
//         method: "DELETE"
//       }
//     );

//     setProjects(prev =>
//       prev.filter(p => p.id !== projectId)
//     );

//   } catch (err) {
//     console.error(err);
//   }
// };



// return (
//   <Layout>

//     <div className="mb-6 flex gap-2">
//       <input
//         type="text"
//         placeholder="New Project Name"
//         value={newProjectName}
//         onChange={(e) => setNewProjectName(e.target.value)}
//         className="border border-black p-2 w-64"
//       />
//       <button
//         onClick={handleAddProject}
//         className="border border-black px-4 hover:bg-black hover:text-white transition"
//       >
//         Add Project
//       </button>
//     </div>

//     { loading ? (

//   <div className="flex justify-center mt-20">
//     <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
//   </div>

// ) : projects.length === 0 ? (

//   <div className="text-center mt-20 opacity-70">
//     <h2 className="text-xl font-semibold mb-2">
//       No Projects Yet
//     </h2>
//     <p>Create your first project to get started.</p>
//   </div>

// ) : (

//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//     {projects.map((project) => (
//       <ProjectCard
//         key={project.id}
//         project={project}
//         onToggleStatus={updateProjectStatus}
//         onDelete={deleteProject}
//         onOpen={(id) => navigate(`/projects/${id}`)}
//       />
//     ))}
//   </div>

// )}

//   </Layout>
// );



// }

// export default Dashboard;
