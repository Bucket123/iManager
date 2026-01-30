function TaskCard({ task, onStatusChange, onDelete }) {
  return (
    //<div className="border border-black p-3 mb-3">
      <div className="border border-black p-3 mb-3 transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <p className="font-medium">{task.title}</p>

      <div className="mt-2 flex gap-2 flex-wrap">

        {task.status === "TODO" && (
          <button
            onClick={() => onStatusChange(task.id, "IN_PROGRESS")}
            className="border border-black px-2 text-sm hover:bg-black hover:text-white transition"
          >
            Start
          </button>
        )}

        {task.status !== "DONE" && (
          <button
            onClick={() => onStatusChange(task.id, "DONE")}
            className="border border-black px-2 text-sm hover:bg-black hover:text-white transition"
          >
            Done
          </button>
        )}

        <button
          onClick={() => onDelete(task.id)}
          className="border border-black px-2 text-sm hover:bg-black hover:text-white transition"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;
