/* eslint-disable react/prop-types */

const Card = ({ user }) => {
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
      }}
    >
      <div>{user.name}{user.email}</div>
    </div>
  );
};

export default Card;
