import {TasksStateType, TaskType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodoListAT, DeleteTodoListAT, todoListId1, todoListId2} from "./todolist-reducer";

type AddTaskAT = {
    type: "ADD-TASK"
    taskTitle: string
    todoListId: string
}
type DeleteTaskAT = {
    type: "DELETE-TASK"
    taskId: string
    todoListId: string
}
type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todoListId: string
}
type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    todoListId: string
    taskId: string
    newTitle: string
}

type TasksATs = AddTaskAT | DeleteTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | DeleteTodoListAT

const initState = {
    [todoListId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS/TS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ],
    [todoListId2]: [
        {id: v1(), title: 'Time', isDone: true},
        {id: v1(), title: 'Brain', isDone: true},
        {id: v1(), title: 'Car', isDone: false},
        {id: v1(), title: 'Penthouse', isDone: false},
    ]
}

export const tasksReducer = (state: TasksStateType = initState, action: TasksATs): TasksStateType => {
    switch(action.type) {
        case "DELETE-TASK":
            return {
                ...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            const newTask: TaskType = {id: v1(), title: action.taskTitle, isDone: false}
            return {
                ...state, [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state, [action.todoListId]: []
            }
        case "DELETE-TODOLIST":
            const newTasks = {...state}
            delete newTasks[action.todoListId]
            return newTasks
        default:
            return state
    }
}

export const addTaskAC = (taskTitle: string, todoListId: string): AddTaskAT => {
    return {type: "ADD-TASK", taskTitle, todoListId}
}
export const deleteTaskAC = (taskId: string, todoListId: string): DeleteTaskAT => {
    return {type: "DELETE-TASK", taskId, todoListId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todoListId}
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string): ChangeTaskTitleAT => {
    return {type: "CHANGE-TASK-TITLE", todoListId, taskId, newTitle}
}