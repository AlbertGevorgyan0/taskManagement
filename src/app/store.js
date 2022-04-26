import {combineReducers, createStore} from "redux"
import {todosReducer, todos} from "../features/todos/todosSlice"

const store = createStore(combineReducers({
    todos:todosReducer,
}),{
    todos:{
        mytodo:[
            {
                id:0,
                name:"JS",
                tasks:[{taskName:"45", description:"ok"}]
            },
            {
                id:1,
                name:"react",
                tasks:[{taskName:"465", description:"ok"}]
            }
        ]
    }
    
})
export default store