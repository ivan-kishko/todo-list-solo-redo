import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from './EditableSpan.module.css'

type EditableSpanType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanType) {
    //editMode for span local state
    const [editMode, setEditMode] = useState(false)
    //title local state
    const [taskTitle, setTaskTitle] = useState(props.title)
    //local error state for input
    const [error, setError] = useState(false)

    const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(false)
    }

    const onDoubleClickOnEditMode = () => {
        setEditMode(true)
    }

    const onBlurOffEditMode = () => {
        if(taskTitle !== '') {
            setEditMode(false)
            props.changeTitle(taskTitle)
        } else {
            setError(true)
        }
    }

    const onEnterPressOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if(taskTitle !== '') {
            if (e.key === "Enter") {
                setEditMode(false)
                props.changeTitle(taskTitle)
            }
        } else {
            setError(true)
        }
    }

    //conditional rendering of span or input field
    return (
        editMode
            ? <input
                className={`${classes.inputField} ${error ? classes.error : ''}`}
                autoFocus
                value={taskTitle}
                onBlur={onBlurOffEditMode}
                onKeyPress={onEnterPressOffEditMode}
                onChange={onChangeTaskTitle}
                placeholder={error ? 'please enter title' : ''}
            />
            : <span onDoubleClick={onDoubleClickOnEditMode}>{taskTitle}</span>
    )
}