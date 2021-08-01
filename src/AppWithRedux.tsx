import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodoListTC, fetchTodoListsTC, TodoListEntityType,} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListWithHooks} from "./TodoListWithHooks";

const AppWithRedux = React.memo(function AppWithReduxComponent() {
    const dispatch = useDispatch()
    //fetching todoLists
    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [dispatch])

    const todoLists = useSelector<AppRootStateType, TodoListEntityType[]>(state => {
        return state.todoLists
    })

    const addTodoList = useCallback((todoListTitle: string) => {
        dispatch(addTodoListTC(todoListTitle))
    }, [dispatch])

    const todoListJSXElements = todoLists.map(tl => {
            return (
                <Grid key={tl.id} item style={{wordBreak: 'break-word'}}>
                    <Paper style={{padding: '10px'}}>
                        <TodoListWithHooks
                            id={tl.id}
                            todoListTitle={tl.title}
                            filter={tl.filter}
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
})

export default AppWithRedux;
