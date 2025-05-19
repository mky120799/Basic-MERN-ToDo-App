      import { useEffect } from "react"
      import Todo from "./components/Todo"
      import axios from 'axios'
      import baseUrl from "../utils/constant"
      import { useState } from "react"
      import Popup from "./components/Popup"


      function App() {
      const [toDos,setToDos] = useState([]);
      const [input,setInput]= useState('');
      const [updateUI,setUpdateUI] = useState(false);
      const [showPopup,setShowPopup] = useState(false);
      const [popupContent,setPopupContent] = useState({});


        console.log(`baseUrl : ${baseUrl}`)
        useEffect(()=>{
            axios.get(`${baseUrl}/get`).then((res)=>{
              setToDos(res.data.data);
              console.log(res.data.data)
            }).catch((err) => {console.log(err.message)})
        },[updateUI])
        const saveToDo = () =>{
          axios.post(`${baseUrl}/save`,{todo:input}).then(res =>{
            console.log(res.data);
            setUpdateUI((prevState)=> !prevState)
            setInput("")
          })
          .catch((err) => console.log(err));
        }
      return (
      <main> 
        <div className="container">
        <h1 className="title">Todo App</h1>
          <div className="input_holder">
            <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder="Add a Todo..."/>
            <button onClick={saveToDo}>Add</button>
          </div>
              <div className='list'>
                {toDos.map((el) => {
                  console.log(el.todo);
                  return <Todo key={el._id} text={el.todo} id = {el._id} setUpdateUI={setUpdateUI} setShowPopup={setShowPopup} setPopupContent={setPopupContent}/>;
                })}
              </div>
            
        </div>
        {showPopup && <Popup setShowPopup={setShowPopup} popupContent={popupContent} setUpdateUI={set}/>}
        </main>)
      }

      export default App
