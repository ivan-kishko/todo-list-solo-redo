import {UnionActionType} from "./action-types";
import {Dispatch} from "redux";
import {handleServerAppNetworkError} from "../utils/error-utils";
import {todoListsAPI} from "../api/api";
import {setIsLoggedInAC} from "./auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//local types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

//init state
const initState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

//slice redux toolkit
const appSlice = createSlice({
    name: 'app',
    initialState: initState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
        setAppInitAC(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

//reducer
export const appReducer = appSlice.reducer

//actions
export const {setAppStatusAC, setAppErrorAC, setAppInitAC} = appSlice.actions

//thunks
export const initializeAppTC = () => async (dispatch: Dispatch<UnionActionType>) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todoListsAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } else {
            dispatch(setAppStatusAC({status: 'succeeded'}))
        }
    } catch (err: any) {
        handleServerAppNetworkError(err.message, dispatch)
    } finally {
        dispatch(setAppInitAC({isInitialized: true}))
    }
}