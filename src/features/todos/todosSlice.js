export function todosReducer(state=[],action) {
    if(action.type ==="todo-add"){
        return [
            ...state,
            action.payload.newList
        ]
    }else if(action.type ==="delete-list"){
        for (let i = 0; i < state.length; i++) {
            if(state[i].name == action.payload.list){
                state.splice(i, 1)
            }
        }
        return [...state]
    }else if(action.type ==="add-task"){
        let newArr = [...state]
        state.find((item)=>item.id == action.payload.newTask.id)
            .tasks.push({
                taskName:action.payload.newTask.taskName,
                description:action.payload.newTask.description
            })
        return newArr
    }else if(action.type ==="update-task"){
        let newArr = [...state]
        let a = state.find((item)=>item.id == action.payload.newTask.objId.objId)
            .tasks.splice(action.payload.newTask.objId.takId, 1, action.payload.newTask.task)
        return newArr
    }else if(action.type ==="delete-task"){
        let newArr = [...state]
        let a = state.find((item)=>item.id == action.payload.deleteTask.objId.objId)
            .tasks.splice(action.payload.deleteTask.objId.takId, 1)
        return newArr
    }
    return state
}

export const todos = [
    {
        id:0,
        name:"JS",
        tasks:[{taskName:"45", description:"ok"}]
    },
    {
        id:1,
        name:"react",
        tasks:[{taskName:"465", description:"ok"}]
    },
]

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

export function deleteList(list) {
    return{
        type:"delete-list",
        payload:{
            list:list
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
