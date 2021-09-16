import {UnionActionType} from "./action-types";
import {Dispatch} from "redux";
import {handleServerAppNetworkError} from "../utils/error-utils";
import {todoListsAPI} from "../api/api";
import {setIsLoggedInAC} from "./auth-reducer";

//local types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitStateType = typeof initState

//init state
const initState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

//reducer
export const appReducer = (state: InitStateType = initState, action: UnionActionType) => {
    switch (action.type) {
        case 'app/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'app/SET-ERROR': {
            return {...state, error: action.error}
        }
        case "app/SET-APP-INIT": {
            return {...state, isInitialized: action.isInitialized}
        }
        default: {
            return state
        }
    }
}

//actions
export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'app/SET-STATUS', status} as const
}
export const setAppErrorAC = (error: string | null) => {
    return {type: 'app/SET-ERROR', error} as const
}
export const setAppInitAC = (isInitialized: boolean) => {
    return {type: 'app/SET-APP-INIT', isInitialized} as const
}

//thunks
export const initializeAppTC = () => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todoListsAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setAppStatusAC('succeeded'))
        }
    } catch (err) {
        handleServerAppNetworkError(err.message, dispatch)
    } finally {
        dispatch(setAppInitAC(true))
    }
}