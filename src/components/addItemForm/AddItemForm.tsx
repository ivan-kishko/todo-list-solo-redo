import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(function AddItemForm(props: AddItemFormType) {
    //local input state
    const [inputValue, setInputValue] = useState('')
    //local error state
    const [error, setError] = useState<string | null>(null)

    const onBlurErrorFalse = () => {
        if(error !== null) setError(null)
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
                size={"small"}
                error={!!error}
                value={inputValue}
                onChange={onChangeTitle}
                onBlur={onBlurErrorFalse}
                onKeyPress={onEnterPressAddTask}
                variant={"outlined"}
                label={"Title"}
                helperText={error}
                disabled={props.disabled}
            />
            <IconButton color='primary' onClick={addItem} disabled={props.disabled}>
                <AddBox/>
            </IconButton>
        </div>
    )
})