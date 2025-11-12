import { useState, useEffect } from 'react';
import { createUser, updateUser } from '../services/api';
import './UserForm.css';

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
    },
    company: {
      name: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pre-fill form if editing existing user
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        website: user.website || '',
        address: {
          street: user.address?.street || '',
          suite: user.address?.suite || '',
          city: user.address?.city || '',
          zipcode: user.address?.zipcode || '',
        },
        company: {
          name: user.company?.name || '',
        },
      });
    }
  }, [user]);

  /**
   * Handle input field changes
   * @param {Event} e - The input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested fields (address, company)
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else if (name.startsWith('company.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        company: {
          ...prev.company,
          [field]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  /**
   * Validate form data
   * @returns {boolean} True if form is valid
   */
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone is required');
      return false;
    }
    return true;
  };

  /**
   * Handle form submission
   * @param {Event} e - The form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      let result;
      if (user) {
        // Update existing user
        result = await updateUser(user.id, formData);
      } else {
        // Create new user
        result = await createUser(formData);
      }
      onSave(result);
    } catch (err) {
      setError(user 
        ? 'Failed to update user. Please try again.' 
        : 'Failed to create user. Please try again.'
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-form">
      <h2>{user ? 'Edit User' : 'Create New User'}</h2>
      
      {error && (
        <div className="form-error">
          {error}
          <button onClick={() => setError(null)} className="close-error">×</button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="company.name">Company</label>
            <input
              type="text"
              id="company.name"
              name="company.name"
              value={formData.company.name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Address</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address.street">Street</label>
              <input
                type="text"
                id="address.street"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address.suite">Suite</label>
              <input
                type="text"
                id="address.suite"
                name="address.suite"
                value={formData.address.suite}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address.city">City</label>
              <input
                type="text"
                id="address.city"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address.zipcode">Zipcode</label>
              <input
                type="text"
                id="address.zipcode"
                name="address.zipcode"
                value={formData.address.zipcode}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (user ? 'Update User' : 'Create User')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
