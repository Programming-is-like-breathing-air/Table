import React from 'react';

interface DeleteTaskButtonProps {
  taskId: string;
}

const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({ taskId }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await fetch(`/api/task/delete/${taskId}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Failed to delete the task');
        }
        alert('Task was deleted successfully!');
        // Optionally, trigger a refresh of the task list here
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to delete task. Please try again.');
      }
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete Task
    </button>
  );
};

export default DeleteTaskButton;
