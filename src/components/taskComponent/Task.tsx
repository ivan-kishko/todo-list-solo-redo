import React, {ChangeEvent, useCallback} from 'react';
import classes from './Task.module.css'
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {changeTaskStatusTC, changeTaskTitleTC, deleteTaskTC} from "../../state/tasks-reducer";
import {TaskStatuses} from "../../api/api";
import {RequestStatusType} from "../../state/app-reducer";

type TaskPropsType = {
    id: string
    title: string
    status: TaskStatuses
    todoListId: string
    todoListEntityStatus: boolean
}

export const Task = React.memo(function TaskComponent({id, title, status, todoListId, todoListEntityStatus}: TaskPropsType) {
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
            <Checkbox checked={status === 2} onChange={onChangeTaskStatus} color={"primary"} disabled={todoListEntityStatus}/>
            <EditableSpan title={title} changeTitle={changeTaskTitle} disabled={todoListEntityStatus}/>
            <IconButton onClick={onClickDeleteTask} disabled={todoListEntityStatus}>
                <Delete />
            </IconButton>
        </li>
    )
})