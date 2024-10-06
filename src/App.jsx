import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import react,{useState, useEffect} from 'react'
import Home from './pages/Home';
import UserDetail from './pages/UserDetail';
import axios from "axios";

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home users={users} />} />
        <Route path="/users/:id" element={<UserDetail users={users} />} />
      </Routes>
    </Router>
  );
}


export default App;