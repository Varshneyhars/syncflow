import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
  const navigate = useNavigate();
  
  // Sample user data
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'Alex Johnson', 
      email: 'alex.johnson@example.com', 
      role: 'Admin', 
      status: 'Active', 
      lastLogin: '2025-02-27T08:30:00',
      department: 'Engineering'
    },
    { 
      id: 2, 
      name: 'Sarah Williams', 
      email: 'sarah.williams@example.com', 
      role: 'Manager', 
      status: 'Active', 
      lastLogin: '2025-02-26T14:45:00',
      department: 'Marketing'
    },
    { 
      id: 3, 
      name: 'Michael Chen', 
      email: 'michael.chen@example.com', 
      role: 'Developer', 
      status: 'Active', 
      lastLogin: '2025-02-25T09:15:00',
      department: 'Engineering'
    },
    { 
      id: 4, 
      name: 'Emily Rodriguez', 
      email: 'emily.rodriguez@example.com', 
      role: 'Designer', 
      status: 'Inactive', 
      lastLogin: '2025-02-10T11:30:00',
      department: 'Design'
    },
    { 
      id: 5, 
      name: 'David Kim', 
      email: 'david.kim@example.com', 
      role: 'Support', 
      status: 'Active', 
      lastLogin: '2025-02-25T16:20:00',
      department: 'Customer Success'
    }
  ]);
  
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // State for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: '',
    department: ''
  });
  
  // State for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Handle edit user
  const handleEditClick = (user) => {
    setCurrentUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      department: user.department
    });
    setShowEditModal(true);
  };
  
  // Handle input change in edit form
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };
  
  // Handle save changes
  const handleSaveChanges = () => {
    const updatedUsers = users.map(user => {
      if (user.id === currentUser.id) {
        return { ...user, ...editFormData };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setShowEditModal(false);
  };
  
  // Handle delete user
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };
  
  // Confirm delete
  const confirmDelete = () => {
    const updatedUsers = users.filter(user => user.id !== userToDelete.id);
    setUsers(updatedUsers);
    setShowDeleteModal(false);
  };
  
  // Handle add new user
  const handleAddUser = () => {
    navigate('/add-user');
  };
  
  return (
    <div className="manage-users-container">
      <div className="header mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold text-gradient">Manage Users</h2>
          <p className="text-muted">Manage your team members and their account permissions</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleAddUser}>
          <i className="bi bi-plus-circle"></i> Add User
        </button>
      </div>
      
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="filters-container d-flex flex-wrap gap-3 align-items-center mb-4">
            <div className="search-container flex-grow-1">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control border-start-0 bg-light" 
                  placeholder="Search users..." 
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            
            <div className="filter-selects d-flex gap-3">
              <select 
                className="form-select" 
                value={roleFilter} 
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Support">Support</option>
              </select>
              
              <select 
                className="form-select" 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="ps-3">User</th>
                  <th scope="col">Role</th>
                  <th scope="col">Department</th>
                  <th scope="col">Status</th>
                  <th scope="col">Last Login</th>
                  <th scope="col" className="text-end pe-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td className="ps-3">
                        <div className="d-flex align-items-center">
                          <div className="avatar-container me-3">
                            <img 
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} 
                              alt={user.name} 
                              className="user-avatar" 
                            />
                          </div>
                          <div>
                            <div className="fw-medium">{user.name}</div>
                            <div className="text-muted small">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge rounded-pill ${
                          user.role === 'Admin' ? 'text-bg-danger' : 
                          user.role === 'Manager' ? 'text-bg-primary' : 
                          user.role === 'Developer' ? 'text-bg-info' : 
                          user.role === 'Designer' ? 'text-bg-warning' : 
                          'text-bg-secondary'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td>{user.department}</td>
                      <td>
                        <span className={`badge rounded-pill ${user.status === 'Active' ? 'text-bg-success' : 'text-bg-secondary'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{formatDate(user.lastLogin)}</td>
                      <td className="text-end pe-3">
                        <div className="d-flex justify-content-end gap-2">
                          <button 
                            className="btn btn-sm btn-outline-primary" 
                            onClick={() => handleEditClick(user)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger" 
                            onClick={() => handleDeleteClick(user)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <div className="d-flex flex-column align-items-center">
                        <i className="bi bi-search fs-1 text-muted mb-2"></i>
                        <p className="mb-0">No users found matching your search criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-muted small">
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                </li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditFormChange}
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="role" className="form-label">Role</label>
                      <select
                        className="form-select"
                        id="role"
                        name="role"
                        value={editFormData.role}
                        onChange={handleEditFormChange}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Support">Support</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="status" className="form-label">Status</label>
                      <select
                        className="form-select"
                        id="status"
                        name="status"
                        value={editFormData.status}
                        onChange={handleEditFormChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="department" className="form-label">Department</label>
                    <select
                      className="form-select"
                      id="department"
                      name="department"
                      value={editFormData.department}
                      onChange={handleEditFormChange}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Design">Design</option>
                      <option value="Customer Success">Customer Success</option>
                      <option value="Sales">Sales</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete <strong>{userToDelete?.name}</strong>?</p>
                <p className="text-muted mb-0">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete User</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* CSS Styles */}
      <style jsx>{`
        .text-gradient {
          background: linear-gradient(45deg, #5e72e4, #11cdef);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .avatar-container {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #5e72e4;
        }
        
        .user-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .table th {
          font-weight: 600;
          border-top: none;
          background-color: #f8f9fa;
        }
        
        .table td, .table th {
          padding: 0.75rem;
          vertical-align: middle;
        }
        
        .modal-backdrop {
          z-index: 1040;
        }
        
        .modal {
          z-index: 1050;
        }
      `}</style>
    </div>
  );
};

export default ManageUsers;