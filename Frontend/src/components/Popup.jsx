import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
// import { baseUrl } from '../../../Backend/models/todo.model';
import baseUrl from '../../utils/constant';
const Popup = ({setShowPopup,popupContent,setUpdateUI}) => {
    
    console.log(`popupContent.txt and id in Popup component :${popupContent.text} & ${popupContent.id}`);
    const [input,setInput] = useState(popupContent.text);

    const updateTodo =(e)=>{
        console.log(`input in Popup component ${input}`)
        console.log(`button clicked`,e.target)
        axios.patch(`${baseUrl}/update/${popupContent.id}`,{todo :input}).
        then((res)=>{
            console.log(".then() part in popup component is working");
            console.log(res.data.data);
            setUpdateUI((prevState)=>!prevState);
            setShowPopup(false)
            console.log(".then() last part in popup component is working");
            
        })
    }

  return (
    <div className='backdrop'>
      <div className="popup">
        <RxCross1 className="cross" onClick={()=>setShowPopup(false)}/>
        <h1>Update Todo</h1>
        <div className="popup__input_holder">
            <input 
            value={input}
            onChange={e=>setInput(e.target.value)}
            type='text'
            // placeholder='Add a Todo......😎'
            />
            <button onClick={(e)=>updateTodo(e)}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default Popup
