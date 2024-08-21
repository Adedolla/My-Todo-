import { useState } from 'react'
import './App.css'
import Task from './component/Task'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer/>
    <div className="App">
    
    <Task/>
     </div>
    </>
  )
}

export default App
