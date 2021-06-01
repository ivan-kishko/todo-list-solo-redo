import React, {useState} from 'react';
import {FilterValueType, TaskType} from "./App";
import './TodoList.css'

type TodoListPropsType = {
    id: string
    todoListTitle: string
    filter: FilterValueType
    tasks: TaskType[]
    deleteTodoList: (todoListId: string) => void
    deleteTask: (id: string, todoListId: string) => void
    changeFilter: (filter: FilterValueType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    addTask: (taskTitle: string, todoListId: string) => void
}

export function TodoList(props: TodoListPropsType) {
    //local input state
    const [inputValue, setInputValue] = useState('')
    //local error state
    const [error, setError] = useState<string | null>(null)

    let tasksElements = props.tasks.map(
        t => <li key={t.id} className={t.isDone ? "isDone" : ""}>
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={(e) => {
                       props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                   }}/>
            <span>{t.title} </span>
            <button onClick={() => {
                props.deleteTask(t.id, props.id)
            }}>X
            </button>
        </li>)

    const addTask = () => {
        if (inputValue.trim() !== '') {
            props.addTask(inputValue.trim(), props.id)
            setInputValue('')
        } else {
            setError('Title required')
        }
    }

    return (
        <div>
            <h3>{props.todoListTitle}
                <button onClick={() => props.deleteTodoList(props.id)}>X</button>
            </h3>
            <div>
                <input className={error ? "error" : ""}
                       value={inputValue}
                       onChange={(e) => {
                           setInputValue(e.currentTarget.value)
                           setError(null)
                       }}/>
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <div>
                <ul>
                    {tasksElements}
                </ul>
            </div>
            <div>
                <button className={props.filter === "all" ? "filterButtonActive" : "filterButton"}
                        onClick={() => {
                            props.changeFilter('all', props.id)
                        }}>All
                </button>
                <button className={props.filter === "active" ? "filterButtonActive" : "filterButton"}
                        onClick={() => {
                            props.changeFilter('active', props.id)
                        }}>Active
                </button>
                <button className={props.filter === "completed" ? "filterButtonActive" : "filterButton"}
                        onClick={() => {
                            props.changeFilter('completed', props.id)
                        }}>Completed
                </button>
            </div>
        </div>
    )
}
