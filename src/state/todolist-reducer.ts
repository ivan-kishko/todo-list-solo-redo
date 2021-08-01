import {v1} from "uuid";
import {todolistsAPI, TodoListType} from "../api/api";
import {Dispatch} from "redux";

export type TodoListEntityType = TodoListType & {
    filter: FilterValueType
}
export type FilterValueType = 'all' | 'completed' | 'active'

export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type DeleteTodoListAT = ReturnType<typeof deleteTodoListAC>
type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>
type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
export type FetchTodoListsAT = ReturnType<typeof fetchTodoListsAC>

type TodoListATs = AddTodoListAT | DeleteTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT | FetchTodoListsAT

export const todoListId1 = v1()
export const todoListId2 = v1()
const initState: TodoListEntityType[] = []

export const todolistReducer = (state: TodoListEntityType[] = initState, action: TodoListATs): TodoListEntityType[] => {
    switch(action.type) {
        case "SET-TODO-LISTS": {
            return action.todoLists.map(tl => ({...tl, filter: 'all'}))
        }
        case "ADD-TODOLIST": {
            let todoEntity: TodoListEntityType = {...action.todoList, filter: 'all'}
            return [todoEntity, ...state]
        }
        case "DELETE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todoListId)
        }
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.newTitle} : tl)
        default:
            return state
    }
}

export const fetchTodoListsAC = (todoLists: TodoListType[]) => {
    return {type: "SET-TODO-LISTS", todoLists} as const
}
export const addTodoListAC = (todoList: TodoListType) => {
    return {type: "ADD-TODOLIST", todoList} as const
}
export const deleteTodoListAC = (todoListId: string) => {
    return {type: "DELETE-TODOLIST", todoListId} as const
}
export const changeTodoListFilterAC = (filter: FilterValueType, todoListId: string) => {
    return {type: "CHANGE-TODOLIST-FILTER", filter, todoListId} as const
}
export const changeTodoListTitleAC = (todoListId: string, newTitle: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", todoListId, newTitle} as const
}


export const fetchTodoListsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(fetchTodoListsAC(res.data))
        })
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(addTodoListAC(res.data.data.item))
            } else {
                console.warn(res.data.messages[0])
            }
        })
}

export const deleteTodoListTC = (id: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(id)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(deleteTodoListAC(id))
            }
        })
}

export const changeTodoListTitleTC = (todoListId: string, newTitle: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todoListId, newTitle)
        .then(res => {
            if(res.data.resultCode === 0){
                dispatch(changeTodoListTitleAC(todoListId, newTitle))
            }
        })
}

