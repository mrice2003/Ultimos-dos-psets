/* eslint-disable react/prop-types */
import userImage from '../../../assets/userImage.svg';

const CardInfo = ({user}) => {
  return (
    <div
        style={{
            width: "250px", 
            height:"400px", 
            backgroundColor: "white",
            boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
            borderRadius: "10px"
        }}
    >
        <img src={userImage} width={80} alt="avatar" />
        <p>Nombre</p>
        <p>{user.name}</p>
        <p>Email</p>
        <p>{user.email}</p>
        <p>Direccion</p>
        <p>{user.address}</p>
    </div>
  )
}

export default CardInfo