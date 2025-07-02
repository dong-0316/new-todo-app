import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
  ]);

  return (
    <div className="app-container">
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}

function Header() {
    return <h1 className="header">Todo List!</h1>
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="todo-input">
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState(todo.content);
  const [isEdit, setIsEdit] = useState(false);

  const handleDoneToggle = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, done: !el.done } : el
      )
    );
  };

  const handleEdit = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, content: inputValue } : el
      )
    );
    setIsEdit(false);
  }; 

  return (
    <li className={`todo-item ${todo.done ? "done" : ""}`}>
    <div className="todo-left">
      <input type="checkbox" checked={todo.done} onChange={handleDoneToggle} />
      {isEdit ? (
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      ) : (
        <span>{todo.content}</span>
      )}
    </div>
  
    <div className="todo-actions">
      <button className="edit-button" onClick={() => setIsEdit(!isEdit)}>
        ✏️ 수정
      </button>
  
      {isEdit && (
        <button className="save-button" onClick={handleEdit}>
          💾 저장
        </button>
      )}
  
      <button
        className="delete-button"
        onClick={() =>
          setTodoList((prev) => prev.filter((el) => el.id !== todo.id))
        }
      >
        🗑️ 삭제
      </button>
    </div>
  </li>
  
  );
}

export default App;
