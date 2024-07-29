import React, { useState } from 'react';
import UserDashboard from './UserDashboard'; // Make sure the path is correct
import '../../style/dashboard/admindashboard.css';
import AllUserList from '../../components/dashboard/AllUserList';
import AllTutorList from '../../components/dashboard/AllTutorList';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-left">
        <h2>Dashboard</h2>
        <ul className="admin-dashboard-menu">
          <li><button onClick={() => setActiveComponent('profile')}>Profile</button></li>
          <li><button onClick={() => setActiveComponent('all-users')}>All Users</button></li>
          <li><button onClick={() => setActiveComponent('all-tutors')}>All Tutors</button></li>
          <li><button onClick={() => setActiveComponent('all-tuition-centers')}>All Tuition Centers</button></li>
        </ul>
      </div>
      <div className="admin-dashboard-right">
        {activeComponent === 'profile' && <UserDashboard />}
        {activeComponent === 'all-users' && <div><AllUserList/></div>}
        {activeComponent === 'all-tutors' && <div><AllTutorList/></div>}
        {activeComponent === 'all-tuition-centers' && <div>All Tuition Centers Component</div>}
      </div>
    </div>
  );
};

export default AdminDashboard;
