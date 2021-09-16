import React, {useCallback, useEffect} from 'react';
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {initializeAppTC, RequestStatusType} from "./state/app-reducer";
import {ErrorSnackbar} from "./components/errorSnackbar/ErrorSnackbar";
import {makeStyles} from "@material-ui/core";
import {Login} from "./components/login/Login";
import {TodoListsContainer} from "./components/todolists-container/TodoListsContainer";
import {Redirect, Route, Switch} from "react-router-dom";
import {logoutTC} from "./state/auth-reducer";

//this is for loading screen
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const App = React.memo(function AppWithReduxComponent() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>( state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>( state => state.auth.isLoggedIn)

    const logout = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

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
                    {isLoggedIn
                        ? <Button color="inherit" onClick={logout}>Logout</Button>
                        : <Button style={{color: "white"}} disabled={true}>Login</Button>
                    }
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/todo-list-solo-redo'} render={() => <TodoListsContainer/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1 style={{textAlign: "center"}}>404: Page not found</h1>}/>
                    <Redirect exact from={'/'} to={'/todo-list-solo-redo'}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    );
})

export default App;
