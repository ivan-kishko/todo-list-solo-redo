import Grid from "@material-ui/core/Grid";
import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../addItemForm/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {Redirect} from "react-router-dom";
import {addTodoListTC, fetchTodoListsTC, TodoListEntityType} from "../../state/todolist-reducer";
import Paper from "@material-ui/core/Paper";
import {TodoList} from "../todolistComponent/TodoList";

//this component was created just for routing purposes
export const TodoListsContainer = React.memo(function TodoListsContainerComponent() {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, TodoListEntityType[]>(state => state.todoLists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const addTodoList = useCallback((todoListTitle: string) => {
        dispatch(addTodoListTC(todoListTitle))
    }, [dispatch])

    //fetching todos
    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodoListsTC())
    }, [dispatch, isLoggedIn])

    //redirect if is not logged in
    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    //todos view
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
        <>
            <Grid container style={{padding: '20px', justifyContent: 'center'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3} style={{justifyContent: 'center'}}>
                {todoListJSXElements}
            </Grid>
        </>
    )
})