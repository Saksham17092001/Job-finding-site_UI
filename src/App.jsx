import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from './Components/Homepage/Home'
import Login from './Components/Login/login'
import Register from './Components/Register/register'
import NewJob from './Components/NewJob/NewJob'
function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path = '/newJob' element={<NewJob/>}/>
      <Route path = '/editJob/:id' element={<NewJob/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
