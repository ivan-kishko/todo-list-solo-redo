import {UnionActionType} from "./action-types";
import {LoginParamsType, todoListsAPI} from "../api/api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerAppNetworkError} from "../utils/error-utils";
import {clearDataOnLogoutAC} from "./todolist-reducer";

//local types
type InitStateType = typeof initState

//init state
const initState = {
    isLoggedIn: false
}

//reducer
export const authReducer = (state: InitStateType = initState, action: UnionActionType): InitStateType => {
    switch (action.type) {
        case "auth/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        default:
            return state
    }
}

//actions
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
    return {type: 'auth/SET-IS-LOGGED-IN', isLoggedIn} as const
}

//thunks
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todoListsAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        handleServerAppNetworkError(err.message, dispatch)
    }
}

export const logoutTC = () => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todoListsAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(clearDataOnLogoutAC())
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        handleServerAppNetworkError(err.message, dispatch)
    }
}
