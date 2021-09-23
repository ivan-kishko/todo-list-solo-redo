import {UnionActionType} from "./action-types";
import {LoginParamsType, todoListsAPI} from "../api/api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerAppNetworkError} from "../utils/error-utils";
import {clearDataOnLogoutAC} from "./todolist-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//local types
// type InitStateType = typeof initState

//init state
const initState = {
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        //make reducers name as AC's so interface stays the same for the whole app
        //immer js looks like it mutates state but it doesnt cause state in params is actually state draft
        setIsLoggedInAC(state, action: PayloadAction<{isLoggedIn: boolean}>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

//reducer
export const authReducer = authSlice.reducer
export const setIsLoggedInAC = authSlice.actions.setIsLoggedInAC
// export const authReducer = (state: InitStateType = initState, action: UnionActionType): InitStateType => {
//     switch (action.type) {
//         case "auth/SET-IS-LOGGED-IN": {
//             return {...state, isLoggedIn: action.isLoggedIn}
//         }
//         default:
//             return state
//     }
// }

//actions
// export const setIsLoggedInAC = (isLoggedIn: boolean) => {
//     return {type: 'auth/SET-IS-LOGGED-IN', isLoggedIn} as const
// }

//thunks
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todoListsAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err: any) {
        handleServerAppNetworkError(err.message, dispatch)
    }
}

export const logoutTC = () => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todoListsAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({isLoggedIn: false}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(clearDataOnLogoutAC())
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err: any) {
        handleServerAppNetworkError(err.message, dispatch)
    }
}
