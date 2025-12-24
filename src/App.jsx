import Home from "./components/Home"
import {Route, Routes} from 'react-router-dom'
import UserDetails from './components/UserDetails'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </>
  )
}

export default App
