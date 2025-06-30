"use client";
import React, { useState } from 'react'

type Task = {
  title: string;
  category: string;
  completed: boolean;
};

const Page = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [mainTask, setMainTask] = useState<Task[]>([]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category) return;
    setMainTask([...mainTask, { title, category, completed: false }]);
    setTitle("");
    setCategory("");
  };

  const deleteHandler = (idx: number) => {
    const updatedTasks = [...mainTask];
    updatedTasks.splice(idx, 1);
    setMainTask(updatedTasks);
  };

  const completeTask = (idx: number) => {
    const updatedTasks = [...mainTask];
    updatedTasks[idx].completed = !updatedTasks[idx].completed;
    setMainTask(updatedTasks);
  };

  // Group tasks by category
  const categories = ["start", "pending", "done"];
  const tasksByCategory: { [key: string]: Task[] } = {
    start: [],
    pending: [],
    done: [],
  };
  mainTask.forEach((task) => {
    if (categories.includes(task.category)) {
      tasksByCategory[task.category].push(task);
    }
  });

  return (
    <>
      <h1 className='bg-black text-white font-bold p-5 text-4xl text-center'>Weekly Todo List</h1>
      <form onSubmit={submitHandler} className='mb-5'>
        <input
          type="text"
          placeholder='Enter your task'
          className='w-[40%] p-2 border border-gray-300 rounded-md mt-5 py-2 ml-5'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className='w-[40%] p-2 border border-gray-300 rounded-md mt-5 py-2 ml-5'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>Select Category</option>
          <option value="start">Start</option>
          <option value="pending">Pending</option>
          <option value="done">Done</option>
        </select>
        <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-5 ml-5'>
          Add Task
        </button>
      </form>
      <hr />
      <div className="flex justify-around mt-5">
        {categories.map((cat) => (
          <div key={cat} className="w-[30%] p-4 border border-gray-300 rounded-md">
            <h2 className="text-xl font-bold text-center capitalize mb-4">{cat}</h2>
            <ul>
              {tasksByCategory[cat].length === 0 ? (
                <li className="text-center text-gray-400">No Task</li>
              ) : (
                tasksByCategory[cat].map((task, idx) => {
                  // Find the index in mainTask for handlers
                  const mainIdx = mainTask.findIndex(
                    t => t.title === task.title && t.category === task.category && t.completed === task.completed
                  );
                  return (
                    <li key={mainIdx} className="mb-2 flex items-center justify-between">
                      <input
                        onChange={() => completeTask(mainIdx)}
                        checked={task.completed}
                        type="checkbox"
                        className='mr-2'
                      />
                      <span className={`font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
                        {task.title}
                      </span>
                      <button
                        onClick={() => deleteHandler(mainIdx)}
                        className='bg-red-500 text-white font-bold py-1 px-2 rounded-md ml-3'
                      >
                        Delete
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;