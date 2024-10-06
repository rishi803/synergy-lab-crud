import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // for handling edit

  useEffect(() => {
    // Fetch users when component mounts
    const fetchUsers = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(res.data);
      console.log(users);
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = (id) => {
    // Simulate DELETE request
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`).then(() => {
      setUsers(users.filter(user => user.id !== id)); // Remove user from UI
    }).catch(err => {
      alert("Failed to delete user. Try again!");
    });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true); // Open modal in edit mode
  };

  const handleAddOrUpdateUser = (newUser) => {
    if (editingUser) {
      // Simulate PUT request for updating user
      axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, newUser)
        .then(res => {
          setUsers(users.map(user => user.id === editingUser.id ? res.data : user)); // Update user in UI
          setEditingUser(null);
          setIsModalOpen(false);
        }).catch(err => {
          alert("This data is not saving on server so unable to edit");
        });
    } else {
      // Simulate POST request for creating user
      axios.post('https://jsonplaceholder.typicode.com/users', newUser).then(res => {
        setUsers((prev)=>[...prev, res.data]); // Add new user to UI
        setIsModalOpen(false);
      }).catch(err => {
        alert("Failed to add user. Try again!");
      });
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <button onClick={() => setIsModalOpen(true)} className="add-user-btn">Add User</button>
      <UserTable users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      {isModalOpen && (
        <UserModal
          onClose={() => { setIsModalOpen(false); setEditingUser(null); }}
          onSubmit={handleAddOrUpdateUser}
          initialData={editingUser} // Pass initial data for editing
        />
      )}
    </div>
  );
};

export default Home;
