import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface TaskFormData {
  title: string;
  status: string;
  label: string;
  priority: string;
}

interface EditTaskProps {
  taskId: string; // Task ID to edit
}

const EditTask: React.FC<EditTaskProps> = ({ taskId }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    status: '',
    label: '',
    priority: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();

  // Fetch task details
  const fetchTask = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/task/${taskId}`);
      const jsonData = await response.json();
      setFormData(jsonData);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching task:', err);
      setIsLoading(false);
    }
  };

  // Fetch task details when component mounts
  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Optionally show a loading state while updating
    try {
      const response = await fetch(`http://localhost:5000/api/task/update/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast({
          description: 'Task updated successfully!',
        });
        fetchTask(); // Refetch the task details to update the UI
      } else {
        toast({
          description: 'Failed to update task.',
        });
      }
    } catch (error: any) {
      console.error('Error updating task:', error.message);
      toast({
        description: error.message,
      });
    } finally {
      setIsLoading(false); // Hide loading state after update
    }
  };

  if (isLoading) return <div>Loading task data...</div>;

  return (
    <Dialog>
    <Toaster />
    <DialogTrigger asChild>
      <button>Edit Task</button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Update the details below to modify the task.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              ID
            </Label>
            <Input
              id="id"
              name="id"
              value={taskId}
              required
              disabled
              className="col-span-3"
              placeholder="id"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Input
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="label" className="text-right">
              Label
            </Label>
            <Input
              id="label"
              name="label"
              value={formData.label}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Input
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Update Task</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
  );
};

export default EditTask;
