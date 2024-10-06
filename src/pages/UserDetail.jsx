import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserModal from '../components/UserModal';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.log('Error fetching user details'));
  }, [id]);

  const handleSave = (updatedUser) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser)
      .then(() => navigate('/'))
      .catch((error) => console.log('Error updating user'));
  };

  return user && <UserModal user={user} onSave={handleSave} />;
};

export default UserDetail;
