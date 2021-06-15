import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

function App() {
    //local state of todoLists
    const todoListId1 = v1()
    const todoListId2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {
            id: todoListId1,
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: todoListId2,
            title: 'What to buy',
            filter: 'all'
        },
    ])

    //local state of tasks
    const [tasks, setTasks] = useState<TasksStateType>({
            [todoListId1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS/TS', isDone: true},
                {id: v1(), title: 'React', isDone: false},
                {id: v1(), title: 'Redux', isDone: false},
            ],
            [todoListId2]: [
                {id: v1(), title: 'Time', isDone: true},
                {id: v1(), title: 'Brain', isDone: true},
                {id: v1(), title: 'Car', isDone: false},
                {id: v1(), title: 'Penthouse', isDone: false},
            ]
        }
    )

    //removing TodoList
    const deleteTodoList = (todoListId: string) => {
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListId)
        setTodoLists(newTodoLists)
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    //adding TodoList
    const addTodoList = (todoListTitle: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {id: newTodoListId, title: todoListTitle, filter: 'all'}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }

    //deleting task
    const deleteTask = (id: string, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        let newTasks = todoListTasks.filter(t => t.id !== id)
        setTasks({...tasks, [todoListId]: newTasks})
    }

    //adding a task
    const addTask = (taskTitle: string, todoListId: string) => {
        if (taskTitle.trim() !== '') {
            const newTasks = [{id: v1(), title: taskTitle, isDone: false}, ...tasks[todoListId]]
            setTasks({...tasks, [todoListId]: newTasks})
        }
    }

    //change task status
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const updatedTasks = tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)
        setTasks({...tasks, [todoListId]: updatedTasks})
    }

    //task title change
    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        const updatedTasks = tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        setTasks({...tasks, [todoListId]: updatedTasks})
    }

    //change filter
    const changeFilter = (filterValue: FilterValueType, todoListId: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = filterValue
            setTodoLists([...todoLists])
        }
    }

    const todoListJSXElements = todoLists.map(tl => {
            let allTodoListTasks = tasks[tl.id]
            let filteredTasks = allTodoListTasks;
            if (tl.filter === 'active') {
                filteredTasks = allTodoListTasks.filter(t => !t.isDone)
            }
            if (tl.filter === 'completed') {
                filteredTasks = allTodoListTasks.filter(t => t.isDone)
            }
            return (
                <Grid item style={{wordBreak: 'break-word'}}>
                    <Paper style={{padding: '10px'}}>
                        <TodoList
                            key={tl.id}
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

export default App;
