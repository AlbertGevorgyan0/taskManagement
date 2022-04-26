import './App.css'
import {useSelector, useDispatch} from "react-redux"
import { createNewList, updateMyList, deleteList, addNewTask, selectTodos, updateMyTask, deleteMyTask } from "./features/todos/todosSlice"
import { useState } from 'react'

const App=()=>{
  const myTodoList = useSelector(selectTodos)
  const dispatch = useDispatch()

  const [todos,setTodos] = useState(myTodoList.mytodo)
  const[currentObj, setCurrentObj]=useState(null)
  const[currentTask, setCurrentTask]=useState(null)
  const[objId,setObjId] = useState("")
  const[updateListName,setUpdateListName] = useState("")
  const[updateTaskName,setUpdateTaskName] = useState("")
  const[updateTaskDescription,setUpdateTaskDescription] = useState("")
  const[updateTask,setUpdateTask]=useState({
    objId:'',
    taskId:''
  })
  var x = []

  function dragOverHandler(e){
    e.preventDefault()
      e.target.style.boxShadow = '0 4px 3px gray'
  }

  function dragLeaveHandler(e){
    e.target.style.boxShadow = 'none'
  }

  function dragStartHandler(e, obj, task){
  setCurrentObj(obj)
  setCurrentTask(task)
  }

  function dragEndHandler(e, obj, task){
    e.target.style.boxShadow = 'none'
  }

  function dropHandler(e, obj, task){
    e.target.style.boxShadow = 'none'
  }

  function dropMyHandler(e,obj){
    obj.tasks.push(currentTask)
    const currentIndex = currentObj.tasks.indexOf(currentTask)
    currentObj.tasks.splice(currentIndex, 1)
    setTodos(todos.map((b) => {
      if(b.id === obj.id){
        return obj
      }
      if(b.id === currentObj.id){
        return currentObj
      }
      return b
    }))
  }

  function wait() {
    document.querySelector(".closeUpdateModal").click()
    document.querySelector(".closeUpdateListModal").click()
    return new Promise(function (resolve,reject) {
      setTimeout(()=>
        resolve(
          document.querySelector(".closeModal").click()
        )
      , 2000);
    })
  }

    

  return(<div className="App">
    <div className="modal fade" data-backdrop="static" data-keyboard="false"  id="addTaskModal" tabIndex="-1" role="dialog" aria-labelledby="addTaskModalLabel" aria-hidden="true" style={{marginTop:"200px"}}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addTaskModalLabel" style={{color:"black"}}>Add Task</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{width:"60%", display:'flex',justifyContent:'center',flexWrap:'wrap',margin:'auto'}}>
            <input id="task" placeholder='Task Name' style={{width:"100%", marginBottom:'3px'}}/>
            <input id="description" placeholder='Description' style={{width:"100%", marginBottom:'3px'}}/>  
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" data-dismiss="modal"
            onClick={()=>{
              if(document.getElementById(`task`).value.length > 0 && document.getElementById(`description`).value.length > 0)
                dispatch(addNewTask({
                  id:objId,
                taskName:document.getElementById(`task`).value,
                description:document.getElementById(`description`).value
              }))
              document.getElementById(`task`).value = ""
              document.getElementById(`description`).value = ""
            }}>Add Task</button>
          </div>
        </div>
      </div>
    </div>
  
    <div className="modal fade" data-backdrop="static" data-keyboard="false" id="updateTaskModal" tabIndex="-1" role="dialog" aria-labelledby="updateTaskModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateTaskModalLabel" style={{color:"black"}}>Your Task</h5>
            <h5 className="modal-title" id="updateTaskModalLabel1" style={{color:"black", display:"none"}}>Update Your Task</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body d1" style={{width:"100%",color:"black", textAlign:"start"}}>
            <div style = {{display:"flex"}}>
              <h6 style={{minWidth:"110px"}}>Task:</h6>
              <h6> {updateTaskName}</h6>
            </div>
            <br/>
            <div style = {{display:"flex"}}>
              <h6 style={{minWidth:"110px"}}>Description:</h6>
              <p> {updateTaskDescription}</p>
            </div>
          </div>
          <div className="modal-body d2" style={{width:"60%", margin:'auto', display:"none"}}>
            <input id="updTask" placeholder='Task Name' value={updateTaskName} style={{width:"100%", marginBottom:'3px'}} onChange={e=>setUpdateTaskName(e.target.value)}/>
            <input id="updDescription" placeholder='Description' value={updateTaskDescription} style={{width:"100%", marginBottom:'3px'}} onChange={e=>setUpdateTaskDescription(e.target.value)}/>
          </div>
          <div className="modal-footer">
            <button type="button" style={{display:"none"}} className="btn btn-secondary closeUpdateModal btCancel" data-dismiss="modal" onClick={()=>{
              document.getElementById("updTask").style.border='1px solid black'
              document.getElementById("updDescription").style.border='1px solid black'
              document.querySelector(".d1").style.display="block"
              document.querySelector(".bt1").style.display="block"
              document.querySelector(".btDelete").style.display="block"
              document.querySelector("#updateTaskModalLabel").style.display="block"
              document.querySelector(".d2").style.display="none"
              document.querySelector(".bt2").style.display="none"
              document.querySelector(".btCancel").style.display="none"
              document.querySelector("#updateTaskModalLabel1").style.display="none"
            }}>Cancel</button>
            <button type="button" className="btn btn-primary bt1" 
            onClick={()=>{
              document.querySelector(".d1").style.display="none"
              document.querySelector(".bt1").style.display="none"
              document.querySelector(".btDelete").style.display="none"
              document.querySelector("#updateTaskModalLabel").style.display="none"
              document.querySelector(".d2").style.display="block"
              document.querySelector(".bt2").style.display="block"
              document.querySelector(".btCancel").style.display="block"
              document.querySelector("#updateTaskModalLabel1").style.display="block"
            }}>Update</button>
            <button type="button" style={{display:"none"}} className="btn btn-primary bt2" data-toggle="modal" data-target=".bd-animation-modal-sm"
            onClick={()=>{ 
              if(updateTaskName.length > 0 && updateTaskDescription.length > 0){
                wait().then(() =>{
                  return(
                    dispatch(updateMyTask({
                      objId:updateTask,
                      task:{taskName:updateTaskName,description:updateTaskDescription}
                    }))
                  )
                }).then(()=>{
                  document.getElementById("updTask").style.border='1px solid black'
                  document.getElementById("updDescription").style.border='1px solid black'
                  document.querySelector(".d1").style.display="block"
                  document.querySelector(".bt1").style.display="block"
                  document.querySelector(".btDelete").style.display="block"
                  document.querySelector("#updateTaskModalLabel").style.display="block"
                  document.querySelector(".d2").style.display="none"
                  document.querySelector(".bt2").style.display="none"
                  document.querySelector(".btCancel").style.display="none"
                  document.querySelector("#updateTaskModalLabel1").style.display="none"
                  document.querySelector("#openUpdateModal").click()
                })
              }else if(updateTaskName.length === 0 && updateTaskDescription.length === 0){
                wait().then(()=>{
                  document.querySelector("#openUpdateModal").click()
                  document.getElementById("updDescription").style.border='4px solid red'
                  document.getElementById("updTask").style.border='4px solid red'
                  document.querySelector(".d1").style.display="none"
                  document.querySelector(".bt1").style.display="none"
                  document.querySelector(".btDelete").style.display="none"
                  document.querySelector("#updateTaskModalLabel").style.display="none"
                  document.querySelector(".d2").style.display="block"
                  document.querySelector(".bt2").style.display="block"
                  document.querySelector(".btCancel").style.display="block"
                  document.querySelector("#updateTaskModalLabel1").style.display="block"
                })
              }else if(updateTaskName.length > 0 && updateTaskDescription.length === 0){
                wait().then(()=>{
                  document.getElementById("updTask").style.border='1px solid black'
                  document.getElementById("updDescription").style.border='4px solid red'
                  document.querySelector("#openUpdateModal").click()
                  document.querySelector(".d1").style.display="none"
                  document.querySelector(".bt1").style.display="none"
                  document.querySelector(".btDelete").style.display="none"
                  document.querySelector("#updateTaskModalLabel").style.display="none"
                  document.querySelector(".d2").style.display="block"
                  document.querySelector(".bt2").style.display="block"
                  document.querySelector(".btCancel").style.display="block"
                  document.querySelector("#updateTaskModalLabel1").style.display="block"
                })
              }else if(updateTaskName.length === 0 && updateTaskDescription.length > 0){
                wait().then(()=>{
                  document.getElementById("updDescription").style.border='1px solid black'
                  document.getElementById("updTask").style.border='4px solid red'
                  document.querySelector("#openUpdateModal").click()
                  document.querySelector(".d1").style.display="none"
                  document.querySelector(".bt1").style.display="none"
                  document.querySelector(".btDelete").style.display="none"
                  document.querySelector("#updateTaskModalLabel").style.display="none"
                  document.querySelector(".d2").style.display="block"
                  document.querySelector(".bt2").style.display="block"
                  document.querySelector(".btCancel").style.display="block"
                  document.querySelector("#updateTaskModalLabel1").style.display="block"
                })
              } 
            }}>Update</button>
            <button type="button"  className="btn btn-primary bg-danger btDelete" data-toggle="modal" data-target=".bd-animation-modal-sm" onClick={()=>{
              if(updateTaskName.length > 0 && updateTaskDescription.length > 0){
                wait().then(() =>{
                  return(
                    dispatch(deleteMyTask({
                      objId:updateTask,
                    }))
                  )
                })
              }
            }}>Delete</button>
          </div>
        </div>
      </div>
    </div>


    <div className="modal fade" data-backdrop="static" data-keyboard="false"  id="updateListModal" tabIndex="-1" role="dialog" aria-labelledby="updateListModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" style={{color:"black"}}>Update Your List's Name</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{width:"60%", margin:'auto'}}>
            <input id="updListName" placeholder='List Name' maxLength={11} value={updateListName} style={{width:"100%", marginBottom:'3px'}} onChange={e=>setUpdateListName(e.target.value)}/>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary closeUpdateListModal " data-dismiss="modal" onClick={()=>{
              document.getElementById("updListName").style.border='1px solid black'
            }}>Cancel</button>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-animation-modal-sm"
            onClick={()=>{ 
              console.log("List Name: ",updateListName);
              console.log("obj Id",objId);
              let name = updateListName
              if(updateListName.length > 0 && updateListName.length <11 && name.match(/^[0-9a-zA-Z]+$/) && !myTodoList.mytodo.find(border => border.name.toUpperCase() === name.toUpperCase()) ){
                wait().then(() =>{
                  return(
                    dispatch(updateMyList({
                      objId:objId,
                      listName:updateListName
                    }))
                  )
                }).then(()=>{
                  document.getElementById("updListName").style.border='1px solid black'
                })
              }else{
                wait().then(()=>{
                  document.getElementById("updListName").style.border='4px solid red'
                  document.querySelector(".updateMyListName").click()
                })
              } 
            }}
            >Update</button>
          </div>
        </div>
      </div>
    </div>

    <div className="modal fade bd-animation-modal-sm" data-backdrop="static" data-keyboard="false"  tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-sm" role="document">
        <div className="modal-content" style={{height:'300px', marginTop:'30%'}}>
          <svg className="spinner" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
          </svg>
          <button type="button" className="btn btn-secondary closeModal" data-dismiss="modal" style={{display:"none"}}>Close</button>
            <h6 style={{color:"black", marginTop:'60%'}}>Please wait</h6>
        </div>
      </div>
    </div>


    <h2>Create a new list</h2>
    <input placeholder="Name for list" style={{height:"38px",padding:"10px"}} id="createTodoList" maxLength={11} pattern="[a-zA-Z][a-zA-Z ]{2,}"/>
    <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-animation-modal-sm" 
    onClick={()=>{ 
      let name = document.getElementById("createTodoList").value
      if(name.match(/^[0-9a-zA-Z]+$/) && !myTodoList.mytodo.find(border => border.name.toUpperCase() === name.toUpperCase()) && name.length <= 11){
        wait().then(() =>{
          return(
            dispatch(createNewList({
              id:(myTodoList.mytodo.length?myTodoList.mytodo[myTodoList.mytodo.length-1].id+1:0),
              name:name,
              tasks:[]
            }))
          )
        })
        document.getElementById("createTodoList").value = ""
        document.getElementById("createTodoList").style.border='1px solid black'
      }else{
        wait().then(()=>{document.getElementById("createTodoList").style.border='4px solid red'})
      } 
    }}>Create</button>

    <div style={{display:"flex",justifyContent:"center", flexWrap:"wrap"}}>
      {
        myTodoList.mytodo.map((obj)=>{
          return (<div 
              key={obj.id} 
              style={{width:"300px",height:"400px", border:"2px solid lime", margin:"50px auto"}}
              onDragOver = {(e) => dragOverHandler(e)}
              onDrop = {(e) => dropMyHandler(e,obj)}
              >
              <div style={{padding:'5px', border:"2px solid white"}}>
                <span style={{display:"none"}}>{obj.id}</span>
                <h3>{obj.name}</h3>
                <div style={{display:"flex", justifyContent:"space-between"}}>
                  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addTaskModal" onClick={()=>{setObjId(obj.id)}}>Add Task</button>
                  <button type="button" style={{display:"none"}} className="btn bg-success updateMyListName" data-toggle="modal" data-target="#updateListModal" ></button>
                  <button type="button" className="btn bg-success" data-toggle="modal" data-target="#updateListModal" 
                  onClick={()=>{
                    setUpdateListName(obj.name)
                    setObjId(obj.id)
                  }}>Update List's Name</button>
                  <button type="button" className="btn btn-primary bg-danger" data-toggle="modal" data-target=".bd-animation-modal-sm" onClick={()=>{
                    wait().then(() =>{
                      return(
                        dispatch(deleteList(
                          obj.id
                        ))
                      )
                    })
                  }}>Delete Task's List</button>
                </div>
              </div>
            {
              obj.tasks.map((task,index) => {
                return (<div
                  key={index} 
                  style={{width:"100%", border:"1px solid gray", boxSizing:'border-box'}} 
                  draggable={true}
                  onDragOver = {(e) => dragOverHandler(e)}
                  onDragLeave = {(e) => dragLeaveHandler(e)}
                  onDragStart = {(e) => dragStartHandler(e, obj, task)}
                  onDragEnd = {(e) => dragEndHandler(e, obj, task)}
                  onDrop = {(e) => dropHandler(e, obj, task)}
                  className = {task}
                >
                  <button style={{width:"100%",border:"none", background:'none'}} type="button" className="btn btn-primary" data-toggle="modal" data-target="#updateTaskModal" 
                  onClick={()=>{
                    setUpdateTaskName(myTodoList.mytodo[obj.id].tasks[index].taskName)
                    setUpdateTaskDescription(myTodoList.mytodo[obj.id].tasks[index].description)
                    setUpdateTask({objId:obj.id, taskId:index})
                  }}>
                    
                    <h5 style={{width:"300xp"}}>
                      {x = []}
                      {
                        task.taskName.split("").forEach((element,index) => {
                          if(index<25){
                            x.push(element)
                          }else if(x[x.length-1] !== ' ...'){
                          x.push(' ...')
                          }
                        })
                      }
                    </h5>
                  </button>
                </div>)
              })
            }
          </div>)
        })
      }
    </div>
    <button style={{display:"none"}} type="button" id='openUpdateModal' className="btn btn-primary" data-toggle="modal" data-target="#updateTaskModal" ></button>
  </div>)
}

export default App
