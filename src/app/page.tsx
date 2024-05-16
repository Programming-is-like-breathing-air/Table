'use client'
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { DataTable } from "../components/data-table"
import { UserNav } from "../components/user-nav"
import InputTask from "./api/task/InputTask"
import TasksTable from './api/task/TableData';
export default function TaskPage() {
    const [tasks, setTasks] = useState([]);

    React.useEffect(() => {
        // Fetch data when component mounts
        fetch('http://localhost:5000/api/task')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);  // Empty dependency array ensures this runs only once on mount

    const columns = [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'title', header: 'Title' },
        { accessorKey: 'status', header: 'Status' },
        { accessorKey: 'label', header: 'Label' },
        { accessorKey: 'priority', header: 'Priority' },
    ];

    return (
        <>
            <div className="md:hidden">
                <Image
                    src="/examples/tasks-light.png"
                    width={1280}
                    height={998}
                    alt="Tasks Light"
                    className="block dark:hidden"
                />
                <Image
                    src="/examples/tasks-dark.png"
                    width={1280}
                    height={998}
                    alt="Tasks Dark"
                    className="hidden dark:block"
                />
            </div>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">
                            Here's a list of your tasks for this month!
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <UserNav />
                        <InputTask />
                    </div>
                </div>
                <DataTable columns={columns} data={tasks} />
                <TasksTable />
            </div>
        </>
    );
}
