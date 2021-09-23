import {TaskStatuses, TaskType, todoListsAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {UnionActionType} from "./action-types";
import {setAppStatusAC} from "./app-reducer";
import {
    addTodoListAC,
    changeTodoListEntityStatusAC, clearDataOnLogoutAC,
    deleteTodoListAC,
    fetchTodoListsAC,
} from "./todolist-reducer";
import {
    handleServerAppError,
    handleServerAppNetworkError,
    handleServerTodoEntityError,
    handleServerTodoEntityNetworkError
} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//local types
type TasksStateType = {
    [key: string]: TaskType[]
}

//init state
const initState: TasksStateType = {}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initState,
    reducers: {
        fetchTasksAC(state, action: PayloadAction<{tasks: TaskType[], todoListId: string}>) {
            state[action.payload.todoListId] = action.payload.tasks
        },
        addTaskAC(state, action: PayloadAction<{task: TaskType}>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        deleteTaskAC(state, action: PayloadAction<{taskId: string, todoListId: string}>) {
            //state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId) - does not work with r-toolkit
            const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
            state[action.payload.todoListId].splice(index, 1)
        },
        changeTaskStatusAC(state, action: PayloadAction<{taskId: string, todoListId: string, status: TaskStatuses}>) {
            //state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {...t, status: action.payload.status} : t) - does not work with r-toolkit
            const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
            state[action.payload.todoListId][index].status = action.payload.status
        },
        changeTaskTitleAC(state, action: PayloadAction<{todoListId: string, taskId: string, newTitle: string}>) {
            //state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTitle} : t) - does not work with r-toolkit
            const index = state[action.payload.todoListId].findIndex(t => t.id === action.payload.taskId)
            state[action.payload.todoListId][index].title = action.payload.newTitle
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodoListsAC, (state, action) => {
            action.payload.todoLists.forEach(tl => state[tl.id] = [])
        });
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todoList.id] = []
        });
        builder.addCase(deleteTodoListAC, (state, action) => {
            delete state[action.payload.todoListId]
        });
        builder.addCase(clearDataOnLogoutAC, (state, action) => {
            return {}
        });
    },
})

//reducer
export const tasksReducer = tasksSlice.reducer

//actions
export const {fetchTasksAC, addTaskAC, deleteTaskAC, changeTaskStatusAC, changeTaskTitleAC} = tasksSlice.actions

//thunks
export const fetchTasksTC = (todoListId: string) => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC({status: "loading"}))
        const res = await todoListsAPI.getTasks(todoListId)
        dispatch(fetchTasksAC({tasks: res.data.items, todoListId}))
        dispatch(setAppStatusAC({status: "succeeded"}))
    } catch (err: any) {
        handleServerAppNetworkError(err.message, dispatch)
    }
}

export const addTaskTC = (taskTitle: string, todoListId: string) => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC({status: "loading"}))
        const res = await todoListsAPI.createTask(todoListId, taskTitle)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC({task: res.data.data.item}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err: any) {
        handleServerAppNetworkError(err.message, dispatch)
    }
}

export const deleteTaskTC = (taskID: string, todoListId: string) => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC({status: "loading"}))
        const res = await todoListsAPI.deleteTask(todoListId, taskID)
        if (res.data.resultCode === 0) {
            dispatch(deleteTaskAC({taskId: taskID, todoListId}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err: any) {
        handleServerAppNetworkError(err.message, dispatch)
    }
}

export const changeTaskStatusTC = (taskId: string, todoListId: string, status: TaskStatuses) => async (dispatch: Dispatch<UnionActionType>, getState: () => AppRootStateType) => {
    try {
        dispatch(changeTodoListEntityStatusAC({todoId: todoListId, todoListEntityStatus: 'loading'}))
        const task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (task) {
            const model = {
                title: task.title,
                description: task.description,
                status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline
            }
            const res = await todoListsAPI.updateTask(todoListId, taskId, model)
            if (res.data.resultCode === 0) {
                dispatch(changeTaskStatusAC({taskId, todoListId, status}))
                dispatch(changeTodoListEntityStatusAC({todoId: todoListId, todoListEntityStatus: 'succeeded'}))
            } else {
                handleServerTodoEntityError(res.data, dispatch, todoListId)
            }
        }
    } catch (err: any) {
        handleServerTodoEntityNetworkError(err.message, dispatch, todoListId)
    }
}

export const changeTaskTitleTC = (taskId: string, todoListId: string, title: string) => async (dispatch: Dispatch<UnionActionType>, getState: () => AppRootStateType) => {
    try {
        dispatch(changeTodoListEntityStatusAC({todoId: todoListId, todoListEntityStatus: 'loading'}))
        const task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (task) {
            const model = {
                title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline
            }
            const res = await todoListsAPI.updateTask(todoListId, taskId, model)
            if (res.data.resultCode === 0) {
                dispatch(changeTaskTitleAC({todoListId, taskId, newTitle: title}))
                dispatch(changeTodoListEntityStatusAC({todoId: todoListId, todoListEntityStatus: 'succeeded'}))
            } else {
                handleServerTodoEntityError(res.data, dispatch, todoListId)
            }
        }
    } catch (err: any) {
        handleServerTodoEntityNetworkError(err.message, dispatch, todoListId)
    }
}

