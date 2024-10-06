import React from "react";
import "./UserCard.css";

const UserCard = ({ user, onEdit, onDelete, onView, index }) => {

    const handleDelete = () => {
        // Show a confirmation popup before deleting
        if (window.confirm("Are you sure you want to delete this user?")) {
          onDelete(user.id);
        }
    }

  return (
    <div className="user-card">
        <div className="user-number">User {index + 1}</div>
      <img
        src="https://via.placeholder.com/150"
        alt={`${user.username}'s placeholder`}
        className="user-avatar"
      />
      <h3>{user.name}</h3>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address?.street ? `${user.address.street} ,` : "N/A"}{user.address?.city}</p>
      <p>Company: {user.company?.name || "N/A"}</p>

      <p>
        Website:{" "}
        <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">
          {user.website}
        </a>
      </p>
      <div className="card-actions">
        <button onClick={() => onView(user) } className='viewbtn'>View</button>
        <button className='editbtn' onClick={() => onEdit(user)}>Edit</button>
        <button className='deletebtn' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
