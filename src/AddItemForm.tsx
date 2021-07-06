import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    //local input state
    const [inputValue, setInputValue] = useState('')
    //local error state
    const [error, setError] = useState<string | null>(null)

    const onBlurErrorFalse = () => {
        setError(null)
    }
    //add task or todolist based on callback
    const addItem = () => {
        if (inputValue.trim() !== '') {
            props.addItem(inputValue.trim())
            setInputValue('')
        } else {
            setError('Title required')
        }
    }

    const onEnterPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }

    //input value flux changer
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(null)
    }

    return (
        <div>
            <TextField
                error={!!error}
                value={inputValue}
                onChange={onChangeTitle}
                onBlur={onBlurErrorFalse}
                onKeyPress={onEnterPressAddTask}
                variant={"outlined"}
                label={"Title"}
                helperText={error}
            />
            <IconButton color='primary' onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}