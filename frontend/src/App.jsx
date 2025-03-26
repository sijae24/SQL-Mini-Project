import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [users, setUsers] = useState([])

  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:5000/api/users')
    setUsers(response.data.users)
  };

  useEffect(() => { 
    fetchAPI()
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen p-4">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Users</h1>
        <ul className="list-disc pl-8">
          {users.map((user) => (
            <li key={user} className="py-1">{user}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
