import { useQuery, useMutation } from 'react-query';

function TaskList({ onEdit, onDelete }) {
  const { data: tasks, isLoading, error } = useQuery('tasks', async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    return res.json();
  });

  const deleteMutation = useMutation(
    async (id) => {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' });
    },
    {
      onSuccess: () => {
        onDelete();
      },
    }
  );

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks.</p>;

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex justify-between items-center">
          <div>{task.title}</div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(task)}
              className="btn btn-secondary"
            >
              Edit
            </button>
            <button
              onClick={() => deleteMutation.mutate(task.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
