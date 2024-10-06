import React from "react";
import './UserDetail.css'
import { useParams } from "react-router-dom";

const UserDetail = ({ users }) => {
  const { id } = useParams(); // Get user ID from URL
  const user = users.find((user) => user.id.toString() === id); // Find the user based on ID

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="user-detail-container">
    <div className="user-detail">
      <h2>{user.name}'s Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Address:</strong> {user.address?.street}, {user.address?.city}</p>
      <p><strong>Company:</strong> {user.company?.name}</p>
      <p><strong>Website:</strong> <a href={`http://${user.website}`}>{user.website}</a></p>

      <h3>About {user.name}</h3>
      <p>
        {user.name} is a valued member of our system. They have been part of various projects and continue to
        contribute to the development of innovative solutions. With a background in {user.company?.name}, 
        {user.name} brings significant expertise and insights in the tech field.
      </p>
    </div>
  </div>
  );
};

export default UserDetail;
