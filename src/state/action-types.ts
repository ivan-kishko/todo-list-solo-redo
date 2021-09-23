import {
    addTodoListAC, changeTodoListEntityStatusAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, clearDataOnLogoutAC,
    deleteTodoListAC,
    fetchTodoListsAC
} from "./todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, fetchTasksAC} from "./tasks-reducer";
import {setAppErrorAC, setAppInitAC, setAppStatusAC} from "./app-reducer";
import {setIsLoggedInAC} from "./auth-reducer";

//todolist action types
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type DeleteTodoListAT = ReturnType<typeof deleteTodoListAC>
export type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>
export type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
export type FetchTodoListsAT = ReturnType<typeof fetchTodoListsAC>
export type ChangeTodoListEntityStatusAT = ReturnType<typeof changeTodoListEntityStatusAC>
export type ClearDataOnLogoutAT = ReturnType<typeof clearDataOnLogoutAC>

//task action types
type FetchTasksAT = ReturnType<typeof fetchTasksAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

//app action types
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type SetAppInitAT = ReturnType<typeof setAppInitAC>

//auth action types
export type SetIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>

//union type
export type UnionActionType =
    AddTodoListAT | DeleteTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT | FetchTodoListsAT | ChangeTodoListEntityStatusAT | ClearDataOnLogoutAT //todos
    | FetchTasksAT | AddTaskAT | DeleteTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT //tasks
    | SetAppStatusAT | SetAppErrorAT | SetAppInitAT //app
    | SetIsLoggedInAT //auth