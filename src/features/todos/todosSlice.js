export function todosReducer(state={},action) {
    switch (action.type) {
        case 'todo-add':
            return{
                ...state, 
                mytodo:[
                    ...state.mytodo,
                    action.payload.newList
                ]
            }
        case "update-list":
            const index = state.mytodo.findIndex(todo => todo.id == action.payload.list.objId);
            const newArray = [...state.mytodo];
            newArray[index].name = action.payload.list.listName
            return { 
                ...state, 
                mytodo: newArray, 
            }
        case "delete-list":
            const filteredTodos = state.mytodo.filter(todo => todo.id !== action.payload.listId)
            console.log(filteredTodos);
            return { 
                ...state, 
                mytodo: filteredTodos
            }
        case "add-task":
            const newArr = [...state.mytodo];
            console.log("ok",newArr);
            newArr[action.payload.newTask.id].tasks.push(
                {
                    taskName:action.payload.newTask.taskName,
                    description:action.payload.newTask.description
                }
            )
            return { 
                ...state, 
                mytodo: newArr
            }
        case "update-task":
            const listArray = [...state.mytodo];
            listArray[action.payload.newTask.objId.objId]
            .tasks.splice(action.payload.newTask.objId.taskId, 1, action.payload.newTask.task)
            return { 
                ...state, 
                mytodo: listArray, 
            }
        case "delete-task":
            const listArr = [...state.mytodo];
            console.log(action.payload.deleteTask.objId);
            listArr[action.payload.deleteTask.objId.objId]
                .tasks.splice(action.payload.deleteTask.objId.taskId, 1)
            return { 
                ...state, 
                mytodo: listArr, 
            }
        default:
            return state
    }
}

export function selectTodos(state) {
        console.log("New State", state);
    return state.todos
}

export function createNewList(newList) {
    return{
        type:"todo-add",
        payload:{
            newList:newList
        }
    }
}

export function updateMyList(list) {
    return{
        type:"update-list",
        payload:{
            list:list
        }
    }
}

export function deleteList(listId) {
    return{
        type:"delete-list",
        payload:{
            listId:listId
        }
    }
}

export function addNewTask(newTask) {
    return{
        type:"add-task",
        payload:{
            newTask:newTask
        }
    }
}

export function updateMyTask(newTask) {
    return{
        type:"update-task",
        payload:{
            newTask:newTask
        }
    }
}

export function deleteMyTask(deleteTask) {
    return{
        type:"delete-task",
        payload:{
            deleteTask:deleteTask
        }
    }
}
