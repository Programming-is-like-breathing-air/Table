'use client'
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'; // Update the path as necessary
import EditTask from './EditTask';
interface Task {
  id: string;
  title: string;
  status: string;
  label?: string;
  priority: string;
}

const TasksTable: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      fetchTasks();
    }, []);
  
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/task');
        const jsonData = await response.json();
        setTasks(jsonData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks');
        setLoading(false);
      }
    };
  
    const deleteTask = async (id: string) => {
      try {
        const response = await fetch(`http://localhost:5000/api/task/delete/${id}`, { method: 'DELETE' });
        if (response.ok) {
          setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } else {
          console.error('Failed to delete the task.');
        }
      } catch (err) {
        console.error('Error deleting task:', err);
      }
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map(task => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.label}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>
                <button onClick={() => deleteTask(task.id)} style={{ cursor: 'pointer' }}>
                  Delete
                </button>
                <EditTask taskId={task.id}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
  
  export default TasksTable;