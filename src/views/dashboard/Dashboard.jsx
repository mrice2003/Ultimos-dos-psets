import React, { useEffect, useState } from 'react';
import Card from './components/Card';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        style={{ border: "2px black solid", width: "180px", height: '25px', borderRadius: '10px', marginTop: '20px' }}
        type="text"
        placeholder="Filtrar por nombre"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={{ display: "flex", flexDirection: 'column', flexFlow: 'wrap' }}>
        {filteredUsers.map((user) => (
          <div key={user.id} style={{ padding: '1%' }}>
            <Card user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;