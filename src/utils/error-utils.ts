import {setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import {changeTodoListEntityStatusAC} from "../state/todolist-reducer";
import {SetAppStatusAT, SetAppErrorAT} from "../state/action-types";
import {ChangeTodoListEntityStatusAT} from "../state/action-types";
import {Dispatch} from "redux";
import {ResponseType} from "../api/api";

//errors for whole app (backdrop)
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'unexpected error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerAppNetworkError = (message: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC({error: message}))
    dispatch(setAppStatusAC({status: 'failed'}))
}

//errors for todoListEntity
export const handleServerTodoEntityError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType, todoId: string) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'unexpected error occurred'}))
    }
    dispatch(changeTodoListEntityStatusAC({todoId, todoListEntityStatus: 'failed'}))
}

export const handleServerTodoEntityNetworkError = (message: string, dispatch: ErrorUtilsDispatchType, todoId: string) => {
    dispatch(setAppErrorAC({error: message}))
    dispatch(changeTodoListEntityStatusAC({todoId, todoListEntityStatus: 'failed'}))
}

type ErrorUtilsDispatchType = Dispatch<SetAppStatusAT | SetAppErrorAT | ChangeTodoListEntityStatusAT>