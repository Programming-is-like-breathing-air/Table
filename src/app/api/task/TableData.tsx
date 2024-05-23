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
import { Input } from '@/components/ui/input'; // Ensure path is correct
import { DataTablePagination } from './DataTablePagination';
import { TaskFilter } from './Filter';
interface Task {
  id: string;
  title: string;
  status: string;
  label?: string;
  priority: string;
}

const TasksTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string[] | undefined>(undefined);
  const [priorityFilter, setPriorityFilter] = useState<string[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tasksPerPage] = useState<number>(10);

  useEffect(() => {
    fetchTasks();
  }, [searchTerm, statusFilter, priorityFilter]);
  const fetchData = async (path: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/task${path}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Failed to fetch data: ', error);
      return [];
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      if (searchTerm) query.set('title', searchTerm);
      if (statusFilter) query.set('status', statusFilter.join(','));
      if (priorityFilter) query.set('priority', priorityFilter.join(','));

      const url = `http://localhost:5000/api/task?${query.toString()}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      setTasks(jsonData);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks');
    } finally {
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

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div>
        <div className="flex w-[20%] items-center justify-center text-sm font-medium">
        <Input
          placeholder="Search tasks by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        </div>
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
            {currentTasks.map(task => (
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
        <DataTablePagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={paginate}
    />
      </div>
    );
  };
  export default TasksTable;
