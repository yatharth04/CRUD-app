import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  const handleSuccess = () => {
    setSelectedTask(null);
    setRefresh((prev) => !prev);
  };

  const handleDelete = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">CRUD Task Management</h1>
      <TaskForm existingTask={selectedTask} onSuccess={handleSuccess} />
      <TaskList onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
