import { createContext, useContext, useState } from "react";
import "./css-reset.css";
import "./App.css";

const TodoContext = createContext(null);

function SearchBox() {
  const [task, setTask] = useState({
    taskName: "",
    taskDescription: "",
    taskDifficulty: 0,
  });
  const todoState = useContext(TodoContext);

  return (
    <div className="container--heading">
      <h1 className="container--header">todo list project</h1>
      <form className="form" action="#">
        <div className="input--container">
          <label htmlFor="taskName">task name</label>
          <input
            required
            // pattern=""
            type="text"
            id="taskName"
            value={task.taskName}
            onInput={(e) => setTask({ ...task, taskName: e.target.value })}
          />
        </div>
        <div className="input--container">
          <label htmlFor="taskDescription">task description</label>
          <textarea
            required
            id="taskDescription"
            value={task.taskDescription}
            onInput={(e) =>
              setTask({ ...task, taskDescription: e.target.value })
            }
          ></textarea>
        </div>
        <div className="input--container">
          <label>task difficulty</label>
          <select
            id="taskDifficulty"
            name="taskDifficulty"
            value={task.taskDifficulty}
            onInput={(e) =>
              setTask({ ...task, taskDifficulty: e.target.value })
            }
          >
            <option defaultValue={0}>none</option>
            <option value={3}>hard</option>
            <option value={2}>meduim</option>
            <option value={1}>easy</option>
          </select>
        </div>
        <button
          className="add--btn"
          onClick={() => {
            if (task.taskName === "" || task.taskDescription === "") return;
            todoState.setTodo([...todoState.todo, task]);
            setTask({
              taskName: "",
              taskDescription: "",
              taskDifficulty: 0,
            });
          }}
        >
          add
        </button>
      </form>
    </div>
  );
}

function TodoItem({ item, index }) {
  const difficulty = {
    0: "none",
    1: "easy",
    2: "meduim",
    3: "hard",
  };
  const todoState = useContext(TodoContext);
  const [showDes, setShowDes] = useState(false);

  function handleRemoveItem() {
    let newArray = todoState.todo;
    newArray.splice(index, 1);
    todoState.setTodo([...newArray]);
    setShowDes(false);
  }

  return (
    <div className="todo">
      <h2 key={index} className="todo--header">
        {item.taskName}
      </h2>
      <small className="todo--difficulty">
        {difficulty[item.taskDifficulty]}
      </small>
      {showDes ? (
        <>
          <button
            className="todo--btn"
            type="button"
            onClick={() => setShowDes(!showDes)}
          >
            &#10224;
          </button>
          <p className="todo--des">{item.taskDescription}</p>
          <button className="remove--btn" onClick={handleRemoveItem}>
            remove
          </button>
        </>
      ) : (
        <button
          className="todo--btn"
          type="button"
          onClick={() => setShowDes(!showDes)}
        >
          &#10225;
        </button>
      )}
    </div>
  );
}

function TodoResult() {
  const context = useContext(TodoContext);
  let todoList = context.todo.sort(
    (a, b) => a.taskDifficulty - b.taskDifficulty
  );

  return (
    <div className="todo--container">
      {todoList.map((member, index) => {
        return <TodoItem key={index} item={member} index={index} />;
      })}
    </div>
  );
}

export default function App() {
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem("todoList")));
  localStorage.setItem("todoList", JSON.stringify(todo));

  return (
    <>
      <TodoContext.Provider value={{ todo: todo, setTodo: setTodo }}>
        <div className="container">
          <SearchBox />
          <TodoResult />
        </div>
      </TodoContext.Provider>
    </>
  );
}
