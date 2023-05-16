import {   createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

import axios from 'axios'
const limit = 9
export const requestTodos = createAsyncThunk(
     "todos/requestTodos",
     async function( _,  {rejectWithValue}){
     try            {
                    const data = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
               
     if(data.status !== 200)   {
                    throw new Error('Server Error')
                    }
                    return data.data
     }catch(error)  {
                    return rejectWithValue(error.message)
                    } 
     }
)
export const deleteTodo = createAsyncThunk(
     'todos/deleteTodo',
     async function(id, {rejectWithValue, dispatch}){
          try {
               const data = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
               console.log(data);
          if(data.status !== 200) {
                    throw new Error('Cant delete task. Server error.')
                                   }
               dispatch(removeTodo({id}))

          } catch (error) {
               return rejectWithValue(error.message)
          }
     }

)

export const toggleStatus = createAsyncThunk(
     'todos/toggleStatus',
     async function ( id, { rejectWithValue, dispatch, getState }) {
          const todo = getState().todos.todos.find(todo => todo.id === id)
          try {
               const data = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`,
               {
                    completed: !todo.completed,
               }
               );
               
               if (data.status !== 200 ) {
                    throw new Error('server error');
               }
               
               dispatch(toggleComplete({id}))
               console.log(data);
          }catch (error) {
               return rejectWithValue(error.message)
                         }
     }
)

export const addNewTodo = createAsyncThunk(
     'todos/addNewTodo',
     async function( text, {rejectWithValue, dispatch}) {
          try {
               const newTodo = {
                    id: nanoid(),
                    title: text ,
                    userId: 1,
                    completed: false,
                    
               }
               const data = await axios.post('https://jsonplaceholder.typicode.com/todos',newTodo)
               if (data.status !== 201){
                    throw new Error("cant add task. server error.")
               }
               console.log(data);
               
               dispatch(addTodo(newTodo))
               return newTodo
          } catch (error) {
               return rejectWithValue(error.message)
          }
     }
)


const setError = (state, action) => {
     state.status = 'rejected';
     state.error = action.payload;
}

const todoSlice = createSlice ({
     name: "todos",
     initialState: {
          todos: [],
          status: null,
          error: null,
     },
     reducers:{
          addTodo(state,action){
               state.todos.push(action.payload)
          },
          removeTodo(state, {payload}){
               state.todos = state.todos.filter(todo => todo.id !== payload.id)
          },
          toggleComplete(state,{payload}){
               const toggledTodo = state.todos.find(todo => todo.id === payload.id)
               toggledTodo.completed = !toggledTodo.completed
               state.todos = [...state.todos]
          },
          resetTodo(state, ) {
               state.todos = []
               
          }
     },
     extraReducers:{
          [requestTodos.pending]: (state, action) =>{
               state.status = 'loading';
               state.error = null;
          },
          [requestTodos.fulfilled]: (state, action) =>{
               state.status = 'resolved'
               state.todos =  action.payload
          },
          [requestTodos.rejected]: setError,
          [deleteTodo.rejected]: setError,
          [toggleStatus.rejected]: setError
          
     }
})

export const { addTodo,removeTodo,toggleComplete, resetTodo,  } = todoSlice.actions;
export default todoSlice.reducer;

