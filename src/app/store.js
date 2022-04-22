import {combineReducers, createStore} from "redux"
import {todosReducer, todos} from "../features/todos/todosSlice"

const store = createStore(combineReducers({
    todos:todosReducer,
}),{
    todos:todos,
})
export default store