import React, {useReducer} from 'react';
// import './App.css';
// import {v1} from "uuid";
// import {TodoList} from "./TodoList";
// import {AddItemForm} from "./AddItemForm";
// import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
// import {
//     addTodoListAC,
//     changeTodoListFilterAC,
//     changeTodoListTitleAC,
//     deleteTodoListAC,
//     todolistReducer
// } from "./state/todolist-reducer";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from "./state/tasks-reducer";
//
// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValueType
// }
//
// export type TasksStateType = {
//     [key: string]: TaskType[]
// }
//
// export type FilterValueType = 'all' | 'completed' | 'active'
//
// function AppWithReducers() {
//     //local state of todoLists
//     const todoListId1 = v1()
//     const todoListId2 = v1()
//     const [todoLists, dispatchToTodoLists] = useReducer(todolistReducer, [
//         {
//             id: todoListId1,
//             title: 'What to learn',
//             filter: 'all'
//         },
//         {
//             id: todoListId2,
//             title: 'What to buy',
//             filter: 'all'
//         },
//     ])
//
//     //local state of tasks
//     const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
//             [todoListId1]: [
//                 {id: v1(), title: 'HTML&CSS', isDone: true},
//                 {id: v1(), title: 'JS/TS', isDone: true},
//                 {id: v1(), title: 'React', isDone: false},
//                 {id: v1(), title: 'Redux', isDone: false},
//             ],
//             [todoListId2]: [
//                 {id: v1(), title: 'Time', isDone: true},
//                 {id: v1(), title: 'Brain', isDone: true},
//                 {id: v1(), title: 'Car', isDone: false},
//                 {id: v1(), title: 'Penthouse', isDone: false},
//             ]
//         }
//     )
//
//     //todolists actions
//     //adding TodoList
//     const addTodoList = (todoListTitle: string) => {
//         const action = addTodoListAC(todoListTitle)
//         dispatchToTodoLists(action)
//         dispatchToTasks(action)
//     }
//     //removing TodoList
//     const deleteTodoList = (todoListId: string) => {
//         const action = deleteTodoListAC(todoListId)
//         dispatchToTodoLists(action)
//         dispatchToTasks(action)
//     }
//     //change filter
//     const changeFilter = (filterValue: FilterValueType, todoListId: string) => {
//         dispatchToTodoLists(changeTodoListFilterAC(filterValue, todoListId))
//     }
//     //change todolist title
//     const changeTodoListTitle = (todoListId: string, newTitle: string) => {
//         dispatchToTodoLists(changeTodoListTitleAC(todoListId, newTitle))
//     }
//
//     //tasks actions
//     //deleting task
//     const deleteTask = (taskId: string, todoListId: string) => {
//         dispatchToTasks(deleteTaskAC(taskId, todoListId))
//     }
//     //adding a task
//     const addTask = (taskTitle: string, todoListId: string) => {
//         dispatchToTasks(addTaskAC(taskTitle, todoListId))
//     }
//     //change task status
//     const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
//         dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId))
//     }
//     //task title change
//     const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
//         dispatchToTasks(changeTaskTitleAC(todoListId, taskId, newTitle))
//     }
//
//     const todoListJSXElements = todoLists.map(tl => {
//             let allTodoListTasks: TaskType[] = tasks[tl.id]
//             let filteredTasks = allTodoListTasks;
//             if (tl.filter === 'active') {
//                 filteredTasks = allTodoListTasks.filter(t => !t.isDone)
//             }
//             if (tl.filter === 'completed') {
//                 filteredTasks = allTodoListTasks.filter(t => t.isDone)
//             }
//             return (
//                 <Grid item style={{wordBreak: 'break-word'}}>
//                     <Paper style={{padding: '10px'}}>
//                         <TodoList
//                             key={tl.id}
//                             id={tl.id}
//                             todoListTitle={tl.title}
//                             filter={tl.filter}
//                             tasks={filteredTasks}
//                             deleteTodoList={deleteTodoList}
//                             deleteTask={deleteTask}
//                             changeFilter={changeFilter}
//                             changeTaskStatus={changeTaskStatus}
//                             changeTaskTitle={changeTaskTitle}
//                             addTask={addTask}
//                             changeTodoListTitle={changeTodoListTitle}
//                         />
//                     </Paper>
//                 </Grid>
//             )
//         }
//     )
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar style={{justifyContent: "space-between"}}>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         TodoList
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding: '20px', justifyContent: 'center'}}>
//                     <AddItemForm addItem={addTodoList}/>
//                 </Grid>
//                 <Grid container spacing={3} style={{justifyContent: 'center'}}>
//                     {todoListJSXElements}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default AppWithReducers;
