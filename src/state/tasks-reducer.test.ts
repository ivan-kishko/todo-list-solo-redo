import React from 'react'
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from "./tasks-reducer";
// import {TasksStateType, TodoListType} from "../App";
// import {addTodoListAC, deleteTodoListAC, todolistReducer} from "./todolist-reducer";
//
// let startState: TasksStateType;
// let startTasksState: TasksStateType;
// let startTodoListsState: Array<TodoListType>;
// beforeEach(() => {
//     startState = {
//         "todolistId1": [
//             { id: "1", title: "CSS", isDone: false },
//             { id: "2", title: "JS", isDone: true },
//             { id: "3", title: "React", isDone: false }
//         ],
//         "todolistId2": [
//             { id: "1", title: "bread", isDone: false },
//             { id: "2", title: "milk", isDone: true },
//             { id: "3", title: "tea", isDone: false }
//         ]
//     };
//
//     startTasksState = {};
//     startTodoListsState = [];
// })
//
// test('correct task should be deleted from correct array', () => {
//     const action = deleteTaskAC("2", "todolistId2");
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState).toEqual({
//         "todolistId1": [
//             { id: "1", title: "CSS", isDone: false },
//             { id: "2", title: "JS", isDone: true },
//             { id: "3", title: "React", isDone: false }
//         ],
//         "todolistId2": [
//             { id: "1", title: "bread", isDone: false },
//             { id: "3", title: "tea", isDone: false }
//         ]
//     });
// });
//
// test('correct task should be added to correct array', () => {
//     const action = addTaskAC("juice", "todolistId2");
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId1"].length).toBe(3);
//     expect(endState["todolistId2"].length).toBe(4);
//     expect(endState["todolistId2"][0].id).toBeDefined();
//     expect(endState["todolistId2"][0].title).toBe("juice");
//     expect(endState["todolistId2"][0].isDone).toBe(false);
// })
//
// test('status of specified task should be changed', () => {
//     const action = changeTaskStatusAC("2", false, "todolistId2");
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId2"][1].isDone).toBe(false);
//     expect(endState["todolistId1"][1].isDone).toBe(true);
// });
//
// test('title of specified task should be changed', () => {
//     const action = changeTaskTitleAC("todolistId2", "2", "oil");
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todolistId2"][1].title).toBe("oil");
//     expect(endState["todolistId1"][1].title).toBe("JS");
// });
//
// test('new array should be added when new todolist is added', () => {
//     const action = addTodoListAC("new todolist");
//
//     const endState = tasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState);
//     const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
//     if (!newKey) {
//         throw Error("new key should be added")
//     }
//
//     expect(keys.length).toBe(3);
//     expect(endState[newKey]).toEqual([]);
// });
//
// test('ids should be equals', () => {
//     const action = addTodoListAC("new todolist");
//
//     const endTasksState = tasksReducer(startTasksState, action)
//     const endTodoListsState = todolistReducer(startTodoListsState, action)
//
//     const keys = Object.keys(endTasksState);
//     const idFromTasks = keys[0];
//     const idFromTodoLists = endTodoListsState[0].id;
//
//     expect(idFromTasks).toBe(action.todoListId);
//     expect(idFromTodoLists).toBe(action.todoListId);
// });
//
// test('property with todolistId should be deleted', () => {
//     const action = deleteTodoListAC("todolistId2");
//
//     const endState = tasksReducer(startState, action)
//
//     const keys = Object.keys(endState);
//
//     expect(keys.length).toBe(1);
//     expect(endState["todolistId2"]).not.toBeDefined();
// });
//
//
//
//
