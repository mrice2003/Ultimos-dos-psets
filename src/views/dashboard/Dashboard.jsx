import { useEffect, useState } from 'react';
import Card from './components/Card';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();
    setUsers(data);
    console.log(data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <Card user={user} />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
