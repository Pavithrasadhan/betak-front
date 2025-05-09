import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../../utils/api';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/user/all-users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = Array.isArray(res.data) ? res.data : res.data.users || [];
        setUsers(userData);
      } catch (err) {
        setError(t('failed_fetch_users'));
        console.error("API Error:", err);
      }
    };

    fetchUsers();
  }, [t]);

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await API.delete(`/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter(user => user._id !== id));
      alert(t('user_deleted'));
    } catch (err) {
      setError(t('failed_delete_user')); 
      console.error('Delete Error:', err);
    }
  };

  const handleAddUser = () => {
    console.log('Add User Clicked');
  };

  return (
    <div className="container content-wrapper container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{t('all_users')}</h2>
        <Link to='/user/adduser' className="btn" onClick={handleAddUser} style={{ background: '#E7DBEF', color: 'black', fontWeight: 'bold' }}>
          {t('add_user')}
        </Link>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <table className="table table-bordered table-striped">
        <thead style={{ background: '#E7DBEF' }}>
          <tr>
            <th>#</th>
            <th>{t('name')}</th>
            <th>{t('email')}</th>
            <th>{t('password')}</th>
            <th>{t('role')}</th>
            <th>{t('action')}</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td>
                  <Link
                    to={`/user/edituser/${user._id}`}
                    className="btn btn-warning btn-sm"
                    style={{ background: 'transparent', border: 'none' }}
                  >
                    <i className="fas fa-edit" />
                  </Link>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="btn btn-danger btn-sm"
                    style={{ background: 'transparent', border: 'none' }}
                  >
                    <i className="fas fa-trash" style={{ color: 'red' }} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">{t('no_users')}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
