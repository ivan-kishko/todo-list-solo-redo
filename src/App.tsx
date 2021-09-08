import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import {Menu} from "@material-ui/icons";
import {addTodoListTC, fetchTodoListsTC, TodoListEntityType} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoList} from "./components/todolistComponent/TodoList";
import {RequestStatusType} from "./state/app-reducer";
import {ErrorSnackbar} from "./components/errorSnackbar/ErrorSnackbar";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const App = React.memo(function AppWithReduxComponent() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, TodoListEntityType[]>(state => state.todoLists)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    //fetching todoLists
    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [dispatch])

    const addTodoList = useCallback((todoListTitle: string) => {
        dispatch(addTodoListTC(todoListTitle))
    }, [dispatch])

    const todoListJSXElements = todoLists.map(tl => {
            return (
                <Grid key={tl.id} item style={{wordBreak: 'break-word'}}>
                    <Paper style={{padding: '10px'}}>
                        <TodoList
                            id={tl.id}
                            todoListTitle={tl.title}
                            filter={tl.filter}
                            todoListEntityStatus={tl.todoListEntityStatus}
                        />
                    </Paper>
                </Grid>
            )
        }
    )

    return (
        <div className="App">
            <ErrorSnackbar/>
            <Backdrop open={status === 'loading'} className={classes.backdrop}><CircularProgress color={'primary'} size={70}/></Backdrop>
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
                {/*{status === 'loading' && <LinearProgress/>}*/}
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

export default App;
