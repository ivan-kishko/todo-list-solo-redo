import {AddTodoListAT, DeleteTodoListAT, FetchTodoListsAT} from "./todolist-reducer";
import {TaskStatuses, TaskType, todolistsAPI} from "../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type TasksStateType = {
    [key: string]: TaskType[]
}

type FetchTasksAT = ReturnType<typeof fetchTasksAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type TasksATs = FetchTasksAT | AddTaskAT | DeleteTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | DeleteTodoListAT |  FetchTodoListsAT

const initState = {

}

export const tasksReducer = (state: TasksStateType = initState, action: TasksATs): TasksStateType => {
    switch(action.type) {
        case "SET-TODO-LISTS": {
            const stateCopy = {...state}
            action.todoLists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case "ADD-TODOLIST": {
            debugger
            const stateCopy = {...state}
            stateCopy[action.todoList.id] = []
            return stateCopy
        }
        case "DELETE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todoListId]
            console.log(stateCopy)
            return stateCopy
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = action.tasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            stateCopy[action.task.todoListId] = [action.task, ...tasks]
            return stateCopy
        }
        case "DELETE-TASK":
            return {
                ...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)
            }
        default:
            return state
    }
}

export const fetchTasksAC = (tasks: TaskType[], todoListId: string) => {
    return {type: "SET-TASKS", tasks, todoListId} as const
}
export const addTaskAC = (task: TaskType) => {
    return {type: "ADD-TASK", task} as const
}
export const deleteTaskAC = (taskId: string, todoListId: string) => {
    return {type: "DELETE-TASK", taskId, todoListId} as const
}
export const changeTaskStatusAC = (taskId: string, todoListId: string, status: TaskStatuses) => {
    return {type: "CHANGE-TASK-STATUS", taskId, todoListId, status} as const
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => {
    return {type: "CHANGE-TASK-TITLE", todoListId, taskId, newTitle} as const
}

export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todoListId)
        .then(res => {
            dispatch(fetchTasksAC(res.data.items, todoListId))
        })
}

export const addTaskTC = (taskTitle: string, todoListId: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todoListId, taskTitle)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

export const deleteTaskTC = (taskID: string, todoListId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todoListId, taskID)
        .then(res => {
            dispatch(deleteTaskAC(taskID, todoListId))
        })
}

export const changeTaskStatusTC = (taskId: string, todoListId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoListId].find(t => t.id === taskId)
    if(task) {
        const model = {
            title: task.title,
            description: task.description,
            status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }
        todolistsAPI.updateTask(todoListId, taskId, model)
            .then(res => {
                dispatch(changeTaskStatusAC(taskId, todoListId, status))
            })
    }
}

export const changeTaskTitleTC = (taskId: string, todoListId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoListId].find(t => t.id === taskId)
    if(task) {
        const model = {
            title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }
        todolistsAPI.updateTask(todoListId, taskId, model)
            .then(res => {
                dispatch(changeTaskTitleAC(todoListId, taskId, title))
            })
    }
}

