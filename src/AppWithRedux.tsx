import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    deleteTodoListAC,
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, DispatchType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterValueType = 'all' | 'completed' | 'active'

function AppWithRedux() {
    const dispatch = useDispatch<DispatchType>()
    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    //todolists actions
    //adding TodoList
    const addTodoList = (todoListTitle: string) => {
        dispatch(addTodoListAC(todoListTitle))
    }
    //removing TodoList
    const deleteTodoList = (todoListId: string) => {
        dispatch(deleteTodoListAC(todoListId))
    }
    //change filter
    const changeFilter = (filterValue: FilterValueType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(filterValue, todoListId))
    }
    //change todolist title
    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        dispatch(changeTodoListTitleAC(todoListId, newTitle))
    }

    //tasks actions
    //deleting task
    const deleteTask = (taskId: string, todoListId: string) => {
        dispatch(deleteTaskAC(taskId, todoListId))
    }
    //adding a task
    const addTask = (taskTitle: string, todoListId: string) => {
        dispatch(addTaskAC(taskTitle, todoListId))
    }
    //change task status
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }
    //task title change
    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskId, newTitle))
    }

    const todoListJSXElements = todoLists.map(tl => {
            let allTodoListTasks: TaskType[] = tasks[tl.id]
            let filteredTasks = allTodoListTasks;
            if (tl.filter === 'active') {
                filteredTasks = allTodoListTasks.filter(t => !t.isDone)
            }
            if (tl.filter === 'completed') {
                filteredTasks = allTodoListTasks.filter(t => t.isDone)
            }
            return (
                <Grid key={tl.id} item style={{wordBreak: 'break-word'}}>
                    <Paper style={{padding: '10px'}}>
                        <TodoList
                            // key={tl.id}
                            id={tl.id}
                            todoListTitle={tl.title}
                            filter={tl.filter}
                            tasks={filteredTasks}
                            deleteTodoList={deleteTodoList}
                            deleteTask={deleteTask}
                            changeFilter={changeFilter}
                            changeTaskStatus={changeTaskStatus}
                            changeTaskTitle={changeTaskTitle}
                            addTask={addTask}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    </Paper>
                </Grid>
            )
        }
    )

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px', justifyContent: 'center'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3} style={{justifyContent: 'center'}}>
                    {todoListJSXElements}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
