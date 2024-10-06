import React, { useState, useEffect } from 'react';
import './UserModal.css'; // CSS file for styling

const UserModal = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({

    username: '',
    name: '',
    email: '',
    phone: '',
    website: '',
    company: {
        name: '',
      }
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        username: initialData.username || '',
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        website: initialData.website || '',
        company: {
            name: initialData.company?.name || '',
          }
       
      });
    }
  }, [initialData]);

 // Handle input change and validation dynamically
 const handleInputChange = (e) => {
    const { name, value } = e.target;

     // Check if the field being updated is nested
  if (name.includes('.')) {
    const [parentKey, childKey] = name.split('.'); // Split 'company.name' into ['company', 'name']

    setFormData((prevFormData) => ({
      ...prevFormData,
      [parentKey]: {
        ...prevFormData[parentKey], // Keep the rest of the company fields intact
        [childKey]: value           // Update the specific field (like company.name)
      }
    }));
  } else {
    // For non-nested fields, you can update as usual
    setFormData({
      ...formData,
      [name]: value
    });
  }

    // Validate field dynamically as user types
    if (errors[name]) {
      const newErrors = { ...errors };
      const error = validateField(name, value);
      if (!error) {
        delete newErrors[name];
      } else {
        newErrors[name] = error;
      }
      setErrors(newErrors);
    }
  };

  const validateField = (field, value) => {
    let error = '';
    switch (field) {
      case 'name':
        if (value.length < 3) error = 'Name must be at least 3 characters';
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email address';
        break;
      default:
        break;
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onSubmit(formData);
      onClose();
    }
  };

  const handleUser=()=>{
    alert('UserName can not be edited');
  }


  return (
    <div className="modal-overlay">
      <div className="modal-content glass-card">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2 className="modal-title">Add New User</h2>
        <form onSubmit={handleSubmit}>

        <div className="form-row">
            <label>*Username:</label>
            <div className="form-input">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={ handleInputChange }
                readOnly={!!initialData} // Non-editable only when editing an existing user
                onClick={handleUser}

              />
               {errors.username && <div className="error-text">{errors.username}</div>}
            </div>
          </div>
          <div className="form-row">
            <label>*Name:</label>
            <div className="form-input">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <div className="error-text">{errors.name}</div>}
            </div>
          </div>
          <div className="form-row">
            <label>*Email:</label>
            <div className="form-input">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>
          </div>
          <div className="form-row">
            <label>*Phone:</label>
            <div className="form-input">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <div className="error-text">{errors.phone}</div>}
            </div>
          </div>

          <div className="form-row">
            <label>Company:</label>
            <div className="form-input">
              <input
                type="text"
                name="company.name"
                value={formData.company.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row">
            <label>Website:</label>
            <div className="form-input">
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
              />
            </div>
          </div>
        
          <div className="form-actions">
            <button type="submit" className="submit-btn">Add User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
