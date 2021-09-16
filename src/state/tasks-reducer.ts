import {TaskStatuses, TaskType, todoListsAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {UnionActionType} from "./action-types";
import {setAppStatusAC} from "./app-reducer";
import {changeTodoListEntityStatusAC} from "./todolist-reducer";
import {
    handleServerAppError,
    handleServerAppNetworkError,
    handleServerTodoEntityError,
    handleServerTodoEntityNetworkError
} from "../utils/error-utils";

//local types
type TasksStateType = {
    [key: string]: TaskType[]
}

//init state
const initState = {}

//reducer
export const tasksReducer = (state: TasksStateType = initState, action: UnionActionType): TasksStateType => {
    switch (action.type) {
        case "todo/SET-TODO-LISTS": {
            const stateCopy = {...state}
            action.todoLists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case "todo/ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todoList.id] = []
            return stateCopy
        }
        case "todo/DELETE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            console.log(stateCopy)
            return stateCopy
        }
        case "tasks/SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = action.tasks
            return stateCopy
        }
        case "tasks/ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            stateCopy[action.task.todoListId] = [action.task, ...tasks]
            return stateCopy
        }
        case "tasks/DELETE-TASK":
            return {
                ...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case "tasks/CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        case "tasks/CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }
        case "todo/CLEAR-DATA": {
            return {}
        }
        default:
            return state
    }
}

//actions
export const fetchTasksAC = (tasks: TaskType[], todoListId: string) => {
    return {type: "tasks/SET-TASKS", tasks, todoListId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: "tasks/ADD-TASK", task} as const
}
export const deleteTaskAC = (taskId: string, todoListId: string) => {
    return {type: "tasks/DELETE-TASK", taskId, todoListId} as const
}
export const changeTaskStatusAC = (taskId: string, todoListId: string, status: TaskStatuses) => {
    return {type: "tasks/CHANGE-TASK-STATUS", taskId, todoListId, status} as const
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => {
    return {type: "tasks/CHANGE-TASK-TITLE", todoListId, taskId, newTitle} as const
}

//thunks
export const fetchTasksTC = (todoListId: string) => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todoListsAPI.getTasks(todoListId)
        dispatch(fetchTasksAC(res.data.items, todoListId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (err) {
        handleServerAppNetworkError(err.message, dispatch)
    }
}

export const addTaskTC = (taskTitle: string, todoListId: string) => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todoListsAPI.createTask(todoListId, taskTitle)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        handleServerAppNetworkError(err.message, dispatch)
    }
}

export const deleteTaskTC = (taskID: string, todoListId: string) => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todoListsAPI.deleteTask(todoListId, taskID)
        if (res.data.resultCode === 0) {
            dispatch(deleteTaskAC(taskID, todoListId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        handleServerAppNetworkError(err.message, dispatch)
    }
}

export const changeTaskStatusTC = (taskId: string, todoListId: string, status: TaskStatuses) => async (dispatch: Dispatch<UnionActionType>, getState: () => AppRootStateType) => {
    try {
        dispatch(changeTodoListEntityStatusAC(todoListId, 'loading'))
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
                dispatch(changeTaskStatusAC(taskId, todoListId, status))
                dispatch(changeTodoListEntityStatusAC(todoListId, 'succeeded'))
            } else {
                handleServerTodoEntityError(res.data, dispatch, todoListId)
            }
        }
    } catch (err) {
        handleServerTodoEntityNetworkError(err.message, dispatch, todoListId)
    }
}

export const changeTaskTitleTC = (taskId: string, todoListId: string, title: string) => async (dispatch: Dispatch<UnionActionType>, getState: () => AppRootStateType) => {
    try {
        dispatch(changeTodoListEntityStatusAC(todoListId, 'loading'))
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
                dispatch(changeTaskTitleAC(todoListId, taskId, title))
                dispatch(changeTodoListEntityStatusAC(todoListId, 'succeeded'))
            } else {
                handleServerTodoEntityError(res.data, dispatch, todoListId)
            }
        }
    } catch (err) {
        handleServerTodoEntityNetworkError(err.message, dispatch, todoListId)
    }
}

