import axios from 'axios';
import React from 'react'
import baseUrl from '../../utils/constant';
import { AiFillEdit } from "react-icons/ai";
import {RxCross1} from "react-icons/rx"
const Todo = ({text,id,setUpdateUI,setShowPopup,setPopupContent}) => {
    console.log(`text and id in Todo component: ${text} and ${id}`);
    function deleteTodo() {
         axios.delete(`${baseUrl}/delete/${id}`).then((deletedTodo)=>{
            console.log(deletedTodo.data.data)
            setUpdateUI(prevState => !prevState); 
         })
    };
    function updateTodo(){
        setPopupContent({id, text});
        setShowPopup(true);
    }
    console.log(text)
  return (
    <div className='toDo'>
      {text}
      <div className="icons">
        <AiFillEdit className="icon" onClick={updateTodo}/>
        <RxCross1 className="icon" onClick={deleteTodo} />
        
      </div>
    </div>
  )
}

export default Todo 
