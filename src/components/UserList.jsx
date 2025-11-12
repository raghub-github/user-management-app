/**
 * UserList Component
 * Displays a list/table of users with CRUD operations
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import UserForm from './UserForm';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  // Load users from localStorage and API on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Save users to localStorage whenever users state changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  /**
   * Load users from localStorage first, then fetch from API and merge
   * This ensures local changes persist across page refreshes
   */
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get users from localStorage (if any)
      const savedUsers = localStorage.getItem('users');
      let localUsers = savedUsers ? JSON.parse(savedUsers) : null;
      
      // Fetch fresh data from API
      const apiUsers = await fetchUsers();
      
      // If we have local users, merge them with API users
      // Local changes take precedence for existing users
      if (localUsers && localUsers.length > 0) {
        // Create a map of API users for quick lookup
        const apiUsersMap = new Map(apiUsers.map(user => [user.id, user]));
        
        // Merge: use local version if exists, otherwise use API version
        const mergedUsers = localUsers.map(localUser => {
          // If this is a locally created user (ID > 10), keep it
          if (localUser.id > 10) {
            return localUser;
          }
          // Otherwise, use local version if it exists, or API version
          return localUser;
        });
        
        // Add any new API users that don't exist locally
        apiUsers.forEach(apiUser => {
          if (!mergedUsers.find(u => u.id === apiUser.id)) {
            mergedUsers.push(apiUser);
          }
        });
        
        // Sort by ID
        mergedUsers.sort((a, b) => a.id - b.id);
        setUsers(mergedUsers);
      } else {
        // First time loading, just use API data
        setUsers(apiUsers);
      }
    } catch (err) {
      // If API fails, try to load from localStorage
      const savedUsers = localStorage.getItem('users');
      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
        setError('Using cached data. API request failed.');
      } else {
        setError('Failed to load users. Please try again later.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle user creation
   * @param {Object} userData - The new user data (response from API)
   */
  const handleUserCreated = (userData) => {
    // Generate a unique ID for new users (start from 100 to avoid conflicts)
    const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
    const newUser = {
      ...userData,
      id: userData.id || (maxId >= 10 ? maxId + 1 : 100),
    };
    setUsers([...users, newUser]);
    setShowCreateForm(false);
  };

  /**
   * Handle user update
   * @param {Object} updatedUser - The updated user data
   */
  const handleUserUpdated = (updatedUser) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setEditingUser(null);
  };

  /**
   * Handle delete confirmation
   * @param {number} userId - The ID of the user to delete
   */
  const handleDeleteClick = (userId) => {
    setDeleteConfirm(userId);
  };

  /**
   * Confirm and execute user deletion
   * @param {number} userId - The ID of the user to delete
   */
  const confirmDelete = async (userId) => {
    try {
      await deleteUser(userId);
      // Remove user from local state
      setUsers(users.filter(user => user.id !== userId));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete user. Please try again.');
      console.error(err);
      setDeleteConfirm(null);
    }
  };

  /**
   * Cancel delete confirmation
   */
  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  /**
   * Handle edit button click
   * @param {Object} user - The user to edit
   */
  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowCreateForm(false);
  };

  /**
   * Cancel form editing/creation
   */
  const handleCancelForm = () => {
    setEditingUser(null);
    setShowCreateForm(false);
  };

  /**
   * Navigate to user detail page
   * @param {number} userId - The ID of the user
   */
  const handleViewDetails = (userId) => {
    navigate(`/user/${userId}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1>User Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setShowCreateForm(true);
            setEditingUser(null);
          }}
        >
          + Create New User
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)} className="close-error">×</button>
        </div>
      )}

      {(showCreateForm || editingUser) && (
        <div className="form-container">
          <UserForm
            user={editingUser}
            onSave={editingUser ? handleUserUpdated : handleUserCreated}
            onCancel={handleCancelForm}
          />
        </div>
      )}

      {users.length === 0 ? (
        <div className="no-users">
          <p>No users found. Create your first user!</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td className="actions-cell">
                    <button
                      className="btn btn-view"
                      onClick={() => handleViewDetails(user.id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDeleteClick(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn btn-delete" onClick={() => confirmDelete(deleteConfirm)}>
                Delete
              </button>
              <button className="btn btn-secondary" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;

