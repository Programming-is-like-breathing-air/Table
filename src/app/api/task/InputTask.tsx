'use client'
import React, { useState } from 'react';

interface TaskFormData {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
}

const InputTask: React.FC = () => {
  const [formData, setFormData] = useState<TaskFormData>({
    id: '',
    title: '',
    status: '',
    label: '',
    priority: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        alert('Task added successfully!');
        setFormData({ id: '', title: '', status: '', label: '', priority: '' }); // Reset form
      } else {
        throw new Error('Failed to submit task');
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Add New Task</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required /><br /><br />

        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required /><br /><br />

        <label htmlFor="status">Status:</label>
        <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} required /><br /><br />

        <label htmlFor="label">Label:</label>
        <input type="text" id="label" name="label" value={formData.label} onChange={handleChange} /><br /><br />

        <label htmlFor="priority">Priority:</label>
        <input type="text" id="priority" name="priority" value={formData.priority} onChange={handleChange} required /><br /><br />

        <button type="submit">Submit Task</button>
      </form>
    </div>
  );
};

export default InputTask;
