import { observer } from "mobx-react";
import React, { useState } from "react";
import { TodoStoreImpl } from "./store";

interface TodoListProps {
  todoStore: TodoStoreImpl;
}

const TodoList = ({ todoStore }: TodoListProps) => {
  const [value, setValue] = useState<string>("");
  const [update, setUpdate] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const status = todoStore.status;

  const handleClick = (id: number) => {
    if (edit && update) {
      todoStore.updateTodo(id, update);
    }
    setEdit(!edit);
  };

  return (
    <div>
      <input
        value={value}
        onChange={(event: { target: { value: any } }) => {
          setValue(event.target.value);
        }}
        type="text"
      />
      <button
        onClick={() => {
          if (value) {
            todoStore.addTodo(value);
            setValue("");
          }
        }}
      >
        submit
      </button>

      <div>Completed: {status.completed}</div>
      <div>Remaining: {status.remaining}</div>

      <ul>
        {todoStore.todos.map((todo) => {
          return (
            <li style={{ display: "flex", gap: 10 }} key={todo.id}>
              <button
                onClick={() => {
                  todoStore.toggleTodo(todo.id);
                }}
              >
                {todo.completed ? "x" : "p"}
              </button>
              <input
                type="text"
                value={edit ? update : todo.title}
                disabled={!edit}
                onChange={(e) => setUpdate(e.target.value)}
              />
              <button type="button" onClick={() => handleClick(todo.id)}>
                {console.log({ edit, update })}
                {edit && !update ? "cancel" : edit ? "save" : "edit"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default observer(TodoList);
