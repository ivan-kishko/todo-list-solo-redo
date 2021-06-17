import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
}
type DeleteTodoListAT = {
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

export const todolistReducer = (state: TodoListType[], action: TodoListATs): TodoListType[] => {
    switch(action.type) {
        case "ADD-TODOLIST":
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
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
    return {type: "ADD-TODOLIST", title: title}
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