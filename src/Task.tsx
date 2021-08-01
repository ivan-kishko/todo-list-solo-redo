import React, {ChangeEvent, useCallback} from 'react';
import classes from './Task.module.css'
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {changeTaskStatusTC, changeTaskTitleTC, deleteTaskTC} from "./state/tasks-reducer";
import {TaskStatuses} from "./api/api";

type TaskPropsType = {
    id: string
    title: string
    status: TaskStatuses
    todoListId: string
}

export const Task = React.memo(function TaskComponent({id, title, status, todoListId}: TaskPropsType) {
    const dispatch = useDispatch()

    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusTC(id, todoListId, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))
    }
    const onClickDeleteTask = () => {
        dispatch(deleteTaskTC(id, todoListId))
    }
    const changeTaskTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleTC(id, todoListId, newTitle))
    }, [dispatch, todoListId, id])

    return (
        <li key={id} className={`${classes.liElement} ${status === 2 ? classes.isDoneClassName : ''}`}>
            <Checkbox checked={status === 2} onChange={onChangeTaskStatus} color={"primary"}/>
            <EditableSpan title={title} changeTitle={changeTaskTitle}/>
            <IconButton onClick={onClickDeleteTask}>
                <Delete />
            </IconButton>
        </li>
    )
})