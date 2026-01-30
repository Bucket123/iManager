function ProjectCard({ project, onToggleStatus, onDelete, onOpen }) {
  return (
    //<div className="border border-black p-4">
    <div className="border border-black p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <h3 className="font-semibold mb-2">
        {project.name}
      </h3>

      <p className="text-sm mb-3">
        Status: {project.status}
      </p>

      <div className="flex gap-2 flex-wrap">

        <button
          onClick={() =>
            onToggleStatus(
              project.id,
              project.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
            )
          }
          className="border border-black px-3 py-1 text-sm hover:bg-black hover:text-white transition"
        >
          {project.status === "ACTIVE" ? "Deactivate" : "Activate"}
        </button>

        <button
          onClick={() => onDelete(project.id)}
          className="border border-black px-3 py-1 text-sm hover:bg-black hover:text-white transition"
        >
          Delete
        </button>

        <button
          onClick={() => onOpen(project.id)}
          className="border border-black px-3 py-1 text-sm hover:bg-black hover:text-white transition"
        >
          Open
        </button>

      </div>

    </div>
  );
}

export default ProjectCard;
