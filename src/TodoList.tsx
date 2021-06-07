import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "./App";
import './TodoList.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    //render tasks
    let tasksElements = props.tasks.map(t => {
        const isDoneClassName = t.isDone ? "isDone" : ""
        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        }
        const onClickDeleteTask = () => {
            props.deleteTask(t.id, props.id)
        }

        return (
            <li key={t.id} className={isDoneClassName}>
                <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatus}/>
                <EditableSpan title={t.title}/>
                {/*<span>{t.title} </span>*/}
                <button onClick={onClickDeleteTask}>X</button>
            </li>)
    })

    //add task
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    //deleting todolist entity
    const deleteTodoList = () => {
        props.deleteTodoList(props.id)
    }

    //filter callbacks
    const onChangeFilterAll = () => {
        props.changeFilter('all', props.id)
    }

    const onChangeFilterAActive = () => {
        props.changeFilter('active', props.id)
    }

    const onChangeFilterCompleted = () => {
        props.changeFilter('completed', props.id)
    }

    // classnames for buttons based on filter value
    const allClassName = props.filter === "all" ? "filterButtonActive" : "filterButton"
    const activeClassName = props.filter === "active" ? "filterButtonActive" : "filterButton"
    const completedClassName = props.filter === "completed" ? "filterButtonActive" : "filterButton"

    return (
        <div>
            <h3>{props.todoListTitle}
                <button onClick={deleteTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                <ul>
                    {tasksElements}
                </ul>
            </div>
            <div>
                <button className={allClassName} onClick={onChangeFilterAll}>All</button>
                <button className={activeClassName} onClick={onChangeFilterAActive}>Active</button>
                <button className={completedClassName} onClick={onChangeFilterCompleted}>Completed</button>
            </div>
        </div>
    )
}
