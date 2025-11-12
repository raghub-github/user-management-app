/**
 * UserDetail Component
 * Displays detailed information about a single user
 */
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchUser } from '../services/api';
import LoadingSpinner from './LoadingSpinner';
import './UserDetail.css';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user details on component mount
  useEffect(() => {
    loadUser();
  }, [id]);

  /**
   * Load user details from the API
   */
  const loadUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUser(id);
      setUser(data);
    } catch (err) {
      setError('Failed to load user details. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="user-detail-container">
        <div className="error-message">
          {error}
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-detail-container">
        <div className="no-user">
          <p>User not found</p>
          <Link to="/" className="btn btn-primary">Go Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="user-detail-container">
      <div className="user-detail-header">
        <Link to="/" className="btn btn-secondary">
          ← Back to Users
        </Link>
        <h1>User Details</h1>
      </div>

      <div className="user-detail-card">
        <div className="user-detail-section">
          <h2>Personal Information</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">ID:</span>
              <span className="detail-value">{user.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{user.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Username:</span>
              <span className="detail-value">{user.username || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">
                <a href={`tel:${user.phone}`}>{user.phone}</a>
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Website:</span>
              <span className="detail-value">
                {user.website ? (
                  <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                    {user.website}
                  </a>
                ) : (
                  'N/A'
                )}
              </span>
            </div>
          </div>
        </div>

        {user.address && (
          <div className="user-detail-section">
            <h2>Address</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Street:</span>
                <span className="detail-value">{user.address.street || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Suite:</span>
                <span className="detail-value">{user.address.suite || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">City:</span>
                <span className="detail-value">{user.address.city || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Zipcode:</span>
                <span className="detail-value">{user.address.zipcode || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}

        {user.company && (
          <div className="user-detail-section">
            <h2>Company</h2>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{user.company.name || 'N/A'}</span>
              </div>
              {user.company.catchPhrase && (
                <div className="detail-item full-width">
                  <span className="detail-label">Catch Phrase:</span>
                  <span className="detail-value">{user.company.catchPhrase}</span>
                </div>
              )}
              {user.company.bs && (
                <div className="detail-item full-width">
                  <span className="detail-label">Business:</span>
                  <span className="detail-value">{user.company.bs}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;

