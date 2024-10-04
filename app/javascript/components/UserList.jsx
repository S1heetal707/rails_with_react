import React, { useEffect, useState } from 'react';
import CreateUser from './CreateUser';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editedName, setEditedName] = useState(''); // For managing the edited user name

  useEffect(() => {
    fetch('/users')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Response is not proper');
        }
      })
      .then((data) => setUsers(data))
      .catch(() => console.error('Failed to fetch users'));
  }, []);

  const handleCreateUser = (name) => {
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        setUsers([...users, data]);
        setIsFormVisible(false);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleDeleteUser = (id) => {
    fetch(`/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleUpdateUser = (id, name) => {
    fetch(`/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        setUsers(users.map((user) => (user.id === id ? data : user)));
        setEditingUser(null); // Reset the editing state
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditedName(user.name); // Initialize the edited name with the current user's name
  };

  return (
    <div>
      <h1>Users</h1>
      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Cancel' : 'Create User'}
      </button>

      {isFormVisible && (
        <CreateUser onCreateUser={handleCreateUser} onCancel={() => setIsFormVisible(false)} />
      )}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {editingUser && editingUser.id === user.id ? (
                <div>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)} // Update the edited name as the user types
                  />
                  <button onClick={() => handleUpdateUser(user.id, editedName)}>Save</button>
                </div>
              ) : (
                <>
                  <span>{user.name}</span>
                  <button onClick={() => handleEditClick(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
