import React, {useCallback, useEffect} from 'react';
import './TodoList.css'
import {AddItemForm} from "../addItemForm/AddItemForm";
import {EditableSpan} from "../editableSpan/EditableSpan";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addTaskTC, fetchTasksTC} from "../../state/tasks-reducer";
import {
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    deleteTodoListTC,
    FilterValueType,
} from "../../state/todolist-reducer";
import {Task} from "../taskComponent/Task";
import {TaskType} from "../../api/api";
import {RequestStatusType} from "../../state/app-reducer";

type TodoListPropsType = {
    id: string
    todoListTitle: string
    filter: FilterValueType
    todoListEntityStatus: RequestStatusType
}

export const TodoList = React.memo(function TodoListWithHooksComponent(props: TodoListPropsType) {
    const {id, todoListTitle, filter, todoListEntityStatus} = props;
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
        return <Task key={t.id + id} id={t.id} status={t.status} title={t.title} todoListId={id} todoListEntityStatus={todoListEntityStatus === 'loading'}/>
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
        dispatch(changeTodoListFilterAC({filter: 'all', todoListId: id}))
    }
    const onChangeFilterAActive = () => {
        dispatch(changeTodoListFilterAC({filter: 'active', todoListId: id}))
    }
    const onChangeFilterCompleted = () => {
        dispatch(changeTodoListFilterAC({filter: 'completed', todoListId: id}))
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
                <EditableSpan title={todoListTitle} changeTitle={changeTodoListTitle} disabled={todoListEntityStatus === 'loading'}/>
                <IconButton onClick={deleteTodoList} disabled={todoListEntityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={todoListEntityStatus === 'loading'}/>
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
