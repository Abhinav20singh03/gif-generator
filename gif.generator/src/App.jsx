import { useState ,useEffect} from 'react'
import './App.css'
import Random from './Components/Random'
import Search from './Components/Search'
function App() {

   

  return (
    <div className='wrapper'>
      <div className='heading'><h2>Random GIFs</h2></div>
      <Random/>
      <Search/>
    </div>
  )
}

export default App;
