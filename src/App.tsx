import React from "react";
import "./App.css";
import Name from "./modules/Name/index";
import TodoList from "./modules/TodoList/index";

function App() {
  return (
    <div>
      <header>Reace-redux-hooks Demo</header>
      <div className="content">
        <Name />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
