import {setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import {changeTodoListEntityStatusAC} from "../state/todolist-reducer";
import {SetAppStatusAT, SetAppErrorAT} from "../state/action-types";
import {ChangeTodoListEntityStatusAT} from "../state/action-types";
import {Dispatch} from "redux";
import {ResponseType} from "../api/api";


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('unexpected error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerTodoEntityError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType, todoId: string) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('unexpected error occurred'))
    }
    dispatch(changeTodoListEntityStatusAC(todoId, 'failed'))
}

export const handleServerAppNetworkError = (message: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerTodoEntityNetworkError = (message: string, dispatch: ErrorUtilsDispatchType, todoId: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(changeTodoListEntityStatusAC(todoId, 'failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetAppStatusAT | SetAppErrorAT | ChangeTodoListEntityStatusAT>