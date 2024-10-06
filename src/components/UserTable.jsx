import React,{useState} from "react";
import "./UserTable.css";

const UserTable = ({users, onEdit, onDelete  }) => {
  

  
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Company</th>
          <th>Website</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.company.name}</td>
              <td>
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                >
                  {user.website}
                </a>
              </td>
              <td>
              <button className="edit" onClick={() => onEdit(user)}>Edit</button>
              <button className="delete" onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No Users Found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
