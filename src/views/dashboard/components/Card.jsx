/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";


const Card = ({ user }) => {

 const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/users/${user.id}`);
  };

  return (
    <div
      style={{
        width: '230px',
        height: '60px',
        border: 'solid black 2px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <div>
        {user.name}
        {user.email}
      </div>
    </div>
  );
};

export default Card;
