"use client";
import React, { useState } from 'react'

const page = () => {

  const [title, settitle] = useState('');
  const [desc, setDesc] = useState('');

  const [mainTask, setMainTask] = useState<{ title: string; desc: string }[]>([]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc }]);
    console.log(mainTask);
    settitle("");
    setDesc("");

  }
  const deleteHandler = (idx) => {
    const updatedTasks = [...mainTask];
    updatedTasks.splice(idx, 1);
    setMainTask(updatedTasks);
  };

  let renderTask = <h1 className='text-center text-2xl font-bold mt-5'>No Task Added</h1>;
  if (mainTask.length > 0) {
    renderTask = mainTask.map((task, idx) => (
      <li key={idx} className="mb-2">
        <span className="font-semibold">{task.title}</span>: {task.desc}
        <button onClick={() => deleteHandler(idx)}
          className='bg-red-500 text-white font-bold py-2 px-4 rounded-md mt-5 ml-5'>
          Delete
        </button>
      </li>
    ));
  }

  return (
    <>
      <h1 className='bg-black  text-white font-bold p-5 text-4xl text-center '>Weekly Todo List</h1>
      <form onSubmit={submitHandler}>
        <input type="text" placeholder='Enter your task' className='w-57% p-2 border border-gray-300 rounded-md mt-5 py-2 ml-5'
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <input type="text" placeholder='Enter description' className='w-57% p-2 border border-gray-300 rounded-md mt-5 py-2 ml-5'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded-md mt-5 ml-5'>
          Add Task
        </button>

      </form>

      <hr></hr>

      <div className='mt-5 ml-5'>
        <ul>{renderTask}</ul>

      </div>
    </>
  )
}

export default page