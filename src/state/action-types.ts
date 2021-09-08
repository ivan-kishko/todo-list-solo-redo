import {
    addTodoListAC, changeTodoListEntityStatusAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    deleteTodoListAC,
    fetchTodoListsAC
} from "./todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, fetchTasksAC} from "./tasks-reducer";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";

//todolist action types
type AddTodoListAT = ReturnType<typeof addTodoListAC>
type DeleteTodoListAT = ReturnType<typeof deleteTodoListAC>
type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>
type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
type FetchTodoListsAT = ReturnType<typeof fetchTodoListsAC>
export type ChangeTodoListEntityStatusAT = ReturnType<typeof changeTodoListEntityStatusAC>

//task action types
type FetchTasksAT = ReturnType<typeof fetchTasksAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

//app action types
export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>

//union type
export type UnionActionType =
    AddTodoListAT | DeleteTodoListAT | ChangeTodoListFilterAT | ChangeTodoListTitleAT | FetchTodoListsAT | ChangeTodoListEntityStatusAT
    | FetchTasksAT | AddTaskAT | DeleteTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT
    | SetAppStatusAT | SetAppErrorAT