import {FilterValueType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todoListId: string
}
export type DeleteTodoListAT = {
    type: "DELETE-TODOLIST"
    todoListId: string
}
type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValueType
    todoListId: string
}
type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    todoListId: string
    title: string
}

type TodoListATs = AddTodoListAT | DeleteTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT

export const todoListId1 = v1()
export const todoListId2 = v1()
const initState: TodoListType[] = [
    {
        id: todoListId1,
        title: 'What to learn',
        filter: 'all'
    },
    {
        id: todoListId2,
        title: 'What to buy',
        filter: 'all'
    },
]

export const todolistReducer = (state: TodoListType[] = initState, action: TodoListATs): TodoListType[] => {
    switch(action.type) {
        case "ADD-TODOLIST":
            return [...state, {id: action.todoListId, title: action.title, filter: 'all'}]
        case "DELETE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        default:
            return state
    }
}

export const addTodoListAC = (title: string): AddTodoListAT => {
    return {type: "ADD-TODOLIST", title: title, todoListId: v1()}
}
export const deleteTodoListAC = (id: string): DeleteTodoListAT => {
    return {type: "DELETE-TODOLIST", todoListId: id}
}
export const changeTodoListFilterAC = (filter: FilterValueType, id: string): ChangeTodoListFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, todoListId: id}
}
export const changeTodoListTitleAC = (id: string, newTitle: string): ChangeTodoListTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", todoListId: id, title: newTitle}
}