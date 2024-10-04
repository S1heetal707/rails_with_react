import React, { useState } from 'react';

const CreateUser = ({ onCreateUser, onCancel }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateUser(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter User Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add User</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default CreateUser;
