import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from './EditableSpan.module.css'
import TextField from "@material-ui/core/TextField";

type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
    disabled: boolean
}

export const EditableSpan = React.memo(function EditableSpanComponent({title, changeTitle, disabled}: EditableSpanType) {
    //editMode for span local state
    const [editMode, setEditMode] = useState(false)
    //title local state
    const [taskTitle, setTaskTitle] = useState(title)
    //local error state for input
    const [error, setError] = useState(false)

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(false)
    }

    const onDoubleClickOnEditMode = () => {
        if (!disabled) {
            if (taskTitle !== title) {
                setTaskTitle(title)
            }
            setEditMode(true)
        }
    }

    const onBlurOffEditMode = () => {
        if (taskTitle !== '') {
            setEditMode(false)
            changeTitle(taskTitle)
        } else {
            setError(true)
        }
    }

    const onEnterPressOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (taskTitle !== '') {
            if (e.key === "Enter") {
                setEditMode(false)
                changeTitle(taskTitle)
            }
        } else {
            setError(true)
        }
    }

    //conditional rendering of span or input field
    return (
        editMode
            ? <TextField
                className={`${classes.inputField} ${error ? classes.error : ''}`}
                autoFocus
                value={taskTitle}
                onBlur={onBlurOffEditMode}
                onKeyPress={onEnterPressOffEditMode}
                onChange={onChangeTaskTitle}
                placeholder={error ? 'please enter title' : ''}
                variant={"outlined"}
                size={"small"}
                error={error}/>
            : <span onDoubleClick={onDoubleClickOnEditMode}>{title}</span>
    )
})