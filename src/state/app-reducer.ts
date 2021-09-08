import {UnionActionType} from "./action-types";

//local types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitStateType = typeof initState

//init state
const initState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

//reducer
export const appReducer = (state: InitStateType = initState, action: UnionActionType) => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        default: {
            return state
        }
    }
}

//actions
export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export const setAppErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}
//thunks