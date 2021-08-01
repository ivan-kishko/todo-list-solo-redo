import React, {useCallback, useEffect} from 'react';
import './TodoList.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskTC, fetchTasksTC} from "./state/tasks-reducer";
import {
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    deleteTodoListTC,
    FilterValueType,
} from "./state/todolist-reducer";
import {Task} from "./Task";
import {TaskType} from "./api/api";

type TodoListPropsType = {
    id: string
    todoListTitle: string
    filter: FilterValueType
}

export const TodoListWithHooks = React.memo(function TodoListWithHooksComponent(props: TodoListPropsType) {
    const {id, todoListTitle, filter} = props;

    const dispatch = useDispatch()
    //fetching tasks
    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [dispatch, id])

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => {
        switch (filter) {
            case "active":
                return state.tasks[id].filter(t => t.status === 0)
            case "completed":
                return state.tasks[id].filter(t => t.status === 2)
            default:
                return state.tasks[id]
        }
    })

    let tasksElements = tasks.map(t => {
        return <Task key={t.id + id} id={t.id} status={t.status} title={t.title} todoListId={id}/>
    })

    //deleting todolist entity
    const deleteTodoList = () => {
        dispatch(deleteTodoListTC(id))
    }
    //changeTodoListTitle
    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(changeTodoListTitleTC(id, title))
    }, [dispatch, id])

    //todoList filter callbacks
    const onChangeFilterAll = () => {
        dispatch(changeTodoListFilterAC('all', id))
    }
    const onChangeFilterAActive = () => {
        dispatch(changeTodoListFilterAC('active', id))
    }
    const onChangeFilterCompleted = () => {
        dispatch(changeTodoListFilterAC('completed', id))
    }

    //add task
    const addTask = (title: string) => {
        dispatch(addTaskTC(title, id))
    }

    // variants for buttons based on filter value
    const allVariant = filter === "all" ? "contained" : undefined
    const activeVariant = filter === "active" ? "contained" : undefined
    const completedVariant = filter === "completed" ? "contained" : undefined

    return (
        <div>
            <h3>
                <EditableSpan title={todoListTitle} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={deleteTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasksElements}
            </div>
            <div>
                <Button color="primary" variant={allVariant} style={{marginTop: '3px'}}
                        onClick={onChangeFilterAll}>All</Button>
                <Button color="primary" variant={activeVariant} style={{marginTop: '3px'}}
                        onClick={onChangeFilterAActive}>Active</Button>
                <Button color="primary" variant={completedVariant} style={{marginTop: '3px'}}
                        onClick={onChangeFilterCompleted}>Completed</Button>
            </div>
        </div>
    )
})
