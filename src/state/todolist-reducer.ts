import {todoListsAPI, TodoListType} from "../api/api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {UnionActionType} from "./action-types";
import {
    handleServerAppError,
    handleServerAppNetworkError,
    handleServerTodoEntityError,
    handleServerTodoEntityNetworkError
} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//local types
export type TodoListEntityType = TodoListType & {
    filter: FilterValueType,
    todoListEntityStatus: RequestStatusType
}
export type FilterValueType = 'all' | 'completed' | 'active'

//init state
const initState: TodoListEntityType[] = []

const todoListsSlice = createSlice({
    name: 'todoLists',
    initialState: initState,
    reducers: {
        fetchTodoListsAC(state, action: PayloadAction<{todoLists: TodoListType[]}>) {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', todoListEntityStatus: 'idle'}))
        },
        addTodoListAC(state, action: PayloadAction<{todoList: TodoListType}>) {
            state.unshift({...action.payload.todoList, filter: 'all', todoListEntityStatus: 'idle'})
        },
        deleteTodoListAC(state, action: PayloadAction<{todoListId: string}>) {
            return state.filter(tl => tl.id !== action.payload.todoListId)
        },
        changeTodoListFilterAC(state, action: PayloadAction<{filter: FilterValueType, todoListId: string}>) {
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.filter} : tl)
        },
        changeTodoListTitleAC(state, action: PayloadAction<{todoListId: string, newTitle: string}>) {
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.newTitle} : tl)
        },
        changeTodoListEntityStatusAC(state, action: PayloadAction<{todoId: string, todoListEntityStatus: RequestStatusType}>) {
            return state.map(tl => tl.id === action.payload.todoId ? {...tl, todoListEntityStatus: action.payload.todoListEntityStatus} : tl)
        },
        clearDataOnLogoutAC() {
            return []
        }
    }
})

//reducer
export const todoListReducer = todoListsSlice.reducer
//actions
export const {
    fetchTodoListsAC,
    addTodoListAC,
    deleteTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    changeTodoListEntityStatusAC,
    clearDataOnLogoutAC} = todoListsSlice.actions

//thunks
export const fetchTodoListsTC = () => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC({status: "loading"}))
        const res = await todoListsAPI.getTodoLists()
        dispatch(fetchTodoListsAC({todoLists: res.data}))
        dispatch(setAppStatusAC({status: "succeeded"}))
    } catch (err: any) {
        handleServerAppNetworkError(err.message, dispatch)
    }
}

export const addTodoListTC = (title: string) => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC({status: "loading"}))
        const res = await todoListsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(addTodoListAC({todoList: res.data.data.item}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err: any) {
        handleServerAppNetworkError(err.message, dispatch)
    }

}

export const deleteTodoListTC = (id: string) => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC({status: "loading"}))
        const res = await todoListsAPI.deleteTodolist(id)
        if (res.data.resultCode === 0) {
            dispatch(deleteTodoListAC({todoListId: id}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err: any) {
        handleServerAppNetworkError(err.message, dispatch)
    }
}

export const changeTodoListTitleTC = (todoListId: string, newTitle: string) => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(changeTodoListEntityStatusAC({todoId: todoListId, todoListEntityStatus: 'loading'}))
        const res = await todoListsAPI.updateTodolist(todoListId, newTitle)
        if (res.data.resultCode === 0) {
            dispatch(changeTodoListTitleAC({todoListId, newTitle}))
            dispatch(changeTodoListEntityStatusAC({todoId: todoListId, todoListEntityStatus: 'succeeded'}))
        } else {
            handleServerTodoEntityError(res.data, dispatch, todoListId)
        }
    } catch (err: any) {
        handleServerTodoEntityNetworkError(err.message, dispatch, todoListId)
    }
}

