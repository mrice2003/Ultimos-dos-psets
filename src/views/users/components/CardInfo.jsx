/* eslint-disable react/prop-types */
import userImage from '../../../assets/userImage.svg';

const CardInfo = ({ user }) => {
  return (
    <div
      style={{
        width: "250px",
        minHeight: "450px",
        backgroundColor: "white",
        boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <img src={userImage} width={80} alt="avatar" style={{ marginBottom: "20px" }} />
      <div style={{ width: "100%" }}>
        <p><strong>Nombre</strong></p>
        <p>{user.name}</p>
        <p><strong>Email</strong></p>
        <p>{user.email}</p>
        <p><strong>Edad</strong></p>
        <p>{user.age}</p>
        <p><strong>Altura</strong></p>
        <p>{user.height}</p>
        <p><strong>Peso</strong></p>
        <p>{user.weight}</p>
        <p><strong>Tiempo con el doctor</strong></p>
        <p>{user.dentist_time}</p>
        <p><strong>Dirección</strong></p>
        <p>{user.address}</p>
      </div>
    </div>
  );
};

export default CardInfo;