import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type AddItemFormType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    //local input state
    const [inputValue, setInputValue] = useState('')
    //local error state
    const [error, setError] = useState<string | null>(null)

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

    //classname for an error input field
    const errorClassName = error ? "error" : ""

    return (
        <div>
            <input className={errorClassName}
                   value={inputValue}
                   onChange={onChangeTitle}
                   onKeyPress={onEnterPressAddTask}/>
            <button onClick={addItem}>+</button>
            {/*conditional rendering of an error message*/}
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}