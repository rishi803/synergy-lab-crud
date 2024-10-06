import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import UserModal from '../components/UserModal';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(res.data);
      console.log(res.data);
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    }).catch(() => alert("Failed to delete user."));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleViewUser = (user) => {
    navigate(`/users/${user.id}`); // Navigate to a detailed view (implement later)
  };

  const handleAddOrUpdateUser = (newUser) => {
    if (editingUser) {
      axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, newUser)
        .then((res) => {
          setUsers(users.map((user) => (user.id === editingUser.id ? res.data : user)));
          setEditingUser(null);
          setIsModalOpen(false);
        })
        .catch(() => alert("Unable to edit"));
    } else {
      axios.post('https://jsonplaceholder.typicode.com/users', newUser)
        .then((res) => {
          setUsers((prev) => [ res.data, ...prev]);
          setIsModalOpen(false);
        })
        .catch(() => alert("Failed to add user."));
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <button onClick={() => setIsModalOpen(true)} className="add-user-btn">Add User</button>
      <div className="user-grid">
        {users.map((user,index) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onView={handleViewUser}
            index={index}
          />
        ))}
      </div>
      {isModalOpen && (
        <UserModal
          onClose={() => { setIsModalOpen(false); setEditingUser(null); }}
          onSubmit={handleAddOrUpdateUser}
          initialData={editingUser}
        />
      )}
    </div>
  );
};

export default Home;
