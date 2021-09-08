import {todoListsAPI, TodoListType} from "../api/api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {UnionActionType} from "./action-types";
import {
    handleServerAppError,
    handleServerAppNetworkError,
    handleServerTodoEntityError,
    handleServerTodoEntityNetworkError
} from "../utils/error-utils";

//local types
export type TodoListEntityType = TodoListType & {
    filter: FilterValueType,
    todoListEntityStatus: RequestStatusType
}
export type FilterValueType = 'all' | 'completed' | 'active'

//init state
const initState: TodoListEntityType[] = []

//reducer
export const todolistReducer = (state: TodoListEntityType[] = initState, action: UnionActionType): TodoListEntityType[] => {
    switch (action.type) {
        case "SET-TODO-LISTS": {
            return action.todoLists.map(tl => ({...tl, filter: 'all', todoListEntityStatus: 'idle'}))
        }
        case "ADD-TODOLIST": {
            let todoEntity: TodoListEntityType = {...action.todoList, filter: 'all', todoListEntityStatus: 'idle'}
            return [todoEntity, ...state]
        }
        case "DELETE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todoListId)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        }
        case "CHANGE-TODOLIST-TITLE": {
            debugger
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.newTitle} : tl)
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.todoId ? {...tl, todoListEntityStatus: action.todoListEntityStatus} : tl)
        }
        default:
            return state
    }
}

//actions
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
export const changeTodoListEntityStatusAC = (todoId: string, todoListEntityStatus: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', todoId, todoListEntityStatus} as const
}

//thunks
export const fetchTodoListsTC = () => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todoListsAPI.getTodoLists()
        dispatch(fetchTodoListsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (err) {
        handleServerAppNetworkError(err.message, dispatch)
    }
}

export const addTodoListTC = (title: string) => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todoListsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(addTodoListAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        handleServerAppNetworkError(err.message, dispatch)
    }

}

export const deleteTodoListTC = (id: string) => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todoListsAPI.deleteTodolist(id)
        if (res.data.resultCode === 0) {
            dispatch(deleteTodoListAC(id))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        handleServerAppNetworkError(err.message, dispatch)
    }
}

export const changeTodoListTitleTC = (todoListId: string, newTitle: string) => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(changeTodoListEntityStatusAC(todoListId, 'loading'))
        const res = await todoListsAPI.updateTodolist(todoListId, newTitle)
        if (res.data.resultCode === 0) {
            dispatch(changeTodoListTitleAC(todoListId, newTitle))
            dispatch(changeTodoListEntityStatusAC(todoListId, 'succeeded'))
        } else {
            handleServerTodoEntityError(res.data, dispatch, todoListId)
        }
    } catch (err) {
        handleServerTodoEntityNetworkError(err.message, dispatch, todoListId)
    }
}
