import React, {ChangeEvent, useCallback} from 'react';
import classes from './Task.module.css'
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {DispatchType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "./state/tasks-reducer";

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
    todoListId: string
}

export const Task = React.memo(function TaskComponent({id, title, isDone, todoListId}: TaskPropsType) {
    console.log('task')
    const dispatch = useDispatch<DispatchType>()

    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(id, e.currentTarget.checked, todoListId))
    }
    const onClickDeleteTask = () => {
        dispatch(deleteTaskAC(id, todoListId))
    }
    const changeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId, id, newTitle))
    }, [dispatch, todoListId, id])

    return (
        <li key={id} className={`${classes.liElement} ${isDone ? classes.isDoneClassName : ''}`}>
            <Checkbox checked={isDone} onChange={onChangeTaskStatus} color={"primary"}/>
            <EditableSpan title={title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={onClickDeleteTask}>
                <Delete />
            </IconButton>
        </li>
    )
})