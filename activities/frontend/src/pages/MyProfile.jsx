import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import "./MyProfile.css";

const MyProfile = () => {
  const { user, loading, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return <div className="profile-page">Loading...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (isChangingPassword) {
      setPasswordData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setErrors({});
    setSaving(true);
    setSuccessMessage("");

    try {
      await updateProfile(formData);
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setErrors({});
    setSaving(true);
    setSuccessMessage("");

    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      setSaving(false);
      return;
    }

    // Validate password length
    if (passwordData.newPassword.length < 6) {
      setErrors({ newPassword: "Password must be at least 6 characters." });
      setSaving(false);
      return;
    }

    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setSuccessMessage("Password changed successfully!");
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setFormData({
      username: user.username || "",
      email: user.email || "",
    });
    setErrors({});
  };

  const cancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">👤</div>
        <h1>My Profile</h1>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}

        {/* Profile Information Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2>Account Information</h2>
            {!isEditing && !isChangingPassword && (
              <button
                className="btn-edit"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="profile-form">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-buttons">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-row">
                <span className="info-label">Username:</span>
                <span className="info-value">{user.username}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email:</span>
                <span className="info-value">{user.email}</span>
              </div>
            </div>
          )}
        </div>

        {/* Change Password Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2>Security</h2>
            {!isChangingPassword && !isEditing && (
              <button
                className="btn-edit"
                onClick={() => setIsChangingPassword(true)}
              >
                Change Password
              </button>
            )}
          </div>

          {isChangingPassword && (
            <form onSubmit={handleChangePassword} className="profile-form">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  required
                />
                {errors.newPassword && (
                  <span className="error-text">{errors.newPassword}</span>
                )}
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>
              <div className="form-buttons">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={cancelPasswordChange}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save" disabled={saving}>
                  {saving ? "Changing..." : "Change Password"}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Account Info */}
        <div className="profile-section">
          <h2>Account Details</h2>
          <div className="profile-info">
            <div className="info-row">
              <span className="info-label">Member since:</span>
              <span className="info-value">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;