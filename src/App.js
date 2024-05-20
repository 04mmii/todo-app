import React, { useState, useCallback }  from 'react';
import './App.css';
import Lists from './Components/Lists';
import Form from './Components/Form';

export default function App() {

  let [todoData, setTodoData] = useState([
    {
      id: "1",
      title: "공부하기",
      completed: true,
    },
    {
      id: "2",
      title: "청소하기",
      completed: false,
    },
  ]);
  let [value, setValue] = useState("");


  

  let handleSubmit = (e) => {
    // form안에 input을 전송할 때 페이지 리로드 되는걸 막아줌
    e.preventDefault();

    //새로운할일데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // 원래있던 할일에 새로운 할 일 더해주기
    setTodoData( prev => [...prev, newTodo] );
    setValue("");

  };

  let handleClick = useCallback((id) => {
    let newTodoData = todoData.filter(data => data.id !== id)
    setTodoData(newTodoData)
  },
  [todoData]
  );

  let handleRemoveClick = () => {
    setTodoData([]);
  };


    return (
      <div className="flex items-center justify-center w-screen h-screen bg-blue-200">
       <div className="w-full p-5 m-4 bg-white rounded shadow-sm lg:w-3/4 lg:max-w-lg">
          <div className="flex justify-between mb-3 bg-blue-50 p-2">
            <h1>할 일 목록</h1>
            <button onClick={handleRemoveClick}>Delete All</button>
          </div>
      <Lists handleClick={handleClick} todoData={todoData} setTodoData={setTodoData}/>
      <Form value={value} setValue={setValue} handleSubmit={handleSubmit}/>
          
        </div> 
      </div>
    )
}