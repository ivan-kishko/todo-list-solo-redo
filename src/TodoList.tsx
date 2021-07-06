import React, {ChangeEvent} from 'react';
import {FilterValueType, TaskType} from "./AppWithRedux";
import './TodoList.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodoListPropsType = {
    id: string
    todoListTitle: string
    filter: FilterValueType
    tasks: TaskType[]
    deleteTodoList: (todoListId: string) => void
    deleteTask: (id: string, todoListId: string) => void
    changeFilter: (filter: FilterValueType, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    addTask: (taskTitle: string, todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
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
        const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(props.id, t.id, newTitle)
        }

        return (
            <div key={t.id} className={isDoneClassName}>
                <Checkbox checked={t.isDone} onChange={onChangeTaskStatus} color={"primary"}/>
                {/*<input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatus}/>*/}
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={onClickDeleteTask}>
                    <Delete />
                </IconButton>
            </div>)
    })

    //add task
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    //deleting todolist entity
    const deleteTodoList = () => {
        props.deleteTodoList(props.id)
    }

    //changeTodoListTitle
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
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
    // const allClassName = props.filter === "all" ? "filterButtonActive" : "filterButton"
    // const activeClassName = props.filter === "active" ? "filterButtonActive" : "filterButton"
    // const completedClassName = props.filter === "completed" ? "filterButtonActive" : "filterButton"

    return (
        <div>
            <h3><EditableSpan title={props.todoListTitle} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={deleteTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasksElements}
            </div>
            <div>
                <Button color="primary" variant={props.filter === "all" ? "contained" : undefined} style={{marginTop: '3px'}} onClick={onChangeFilterAll}>All</Button>
                <Button color="primary" variant={props.filter === "active" ? "contained" : undefined} style={{marginTop: '3px'}} onClick={onChangeFilterAActive}>Active</Button>
                <Button color="primary" variant={props.filter === "completed" ? "contained" : undefined} style={{marginTop: '3px'}} onClick={onChangeFilterCompleted}>Completed</Button>
            </div>
        </div>
    )
}
