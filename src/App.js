import { useEffect, useState } from 'react'
import PrimarySearchAppBar from './components/navbar'
import axios from 'axios'

function App() {
  const [user, setUser] = useState([])

  useEffect(() => {
    axios
      .get('http://kidsio.herokuapp.com/users')
      .then((res) => {
        setUser(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className='App'>
      <PrimarySearchAppBar />
      {user.map((use) => (
        <div key={use._id}>
          <h1>{use.displayName}</h1>
          <img src={use.profilePic} />
          <p>{use.roles}</p>
        </div>
      ))}
    </div>
  )
}

export default App
