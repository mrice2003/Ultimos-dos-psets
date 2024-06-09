import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PrevDescription from './components/PrevDescription';
import CardInfo from './components/CardInfo';

const Users = () => {
  const { id } = useParams();
  const idAsNumber = parseInt(id);

  const [form, setForm] = useState({
    description: '',
    prescription: '',
    user_id: idAsNumber,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [descriptions, setDescriptions] = useState([]);
  const [user, setUser] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null); // State to track expanded card

  const fetchDescription = async () => {
    const response = await fetch('http://localhost:3000/description/' + id);
    const data = await response.json();
    setDescriptions(data.reverse()); // Reverse the array to show newest first
    return data;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newForm = {
      ...form,
      [name]: value,
    };
    if (name === 'description' && value === '') {
      newForm = {
        ...newForm,
        prescription: '',
      };
    }
    setForm(newForm);
  };

  const fetchUserById = async () => {
    const response = await fetch('http://localhost:3000/users/' + id);
    const data = await response.json();
    setUser(data);
    return data;
  };

  const handleGenerateHelp = async () => {
    const prompt = {
      prompt: form.description,
    };
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/chat/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt),
      });
      const data = await response.json();
      setForm({ ...form, prescription: data.response });
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserById();
    fetchDescription();
  }, [id]);

  const createDescription = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/description/' + id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.status === 201) {
        alert('Descripción creada');
        fetchDescription();
        setForm({ ...form, description: '', prescription: '' });
      } else {
        alert('Error al crear descripción');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Función para manejar la expansión de la tarjeta
  const handleCardClick = (index) => {
    if (index === expandedCard) {
      setExpandedCard(null); // Si la tarjeta ya está expandida, la contraemos
    } else {
      setExpandedCard(index); // Si no, la expandimos
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <div style={{ marginRight: '20px' }}>
          <CardInfo user={user} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%' }}>
            <PrevDescription
              descriptions={descriptions}
              expandedCard={expandedCard}
              onCardClick={handleCardClick}
            />
          </div>
          <div style={{ marginTop: '20px', width: '100%' }}>
            <p style={{ fontWeight: 'bold' }}>Descripción</p>
            <textarea
              style={{ width: '100%', minHeight: '80px' }}
              label="Descripción"
              value={form.description}
              name="description"
              onChange={handleInputChange}
            />
            <p>Prescripción</p>
            <textarea
              style={{ width: '100%', minHeight: '80px' }}
              label="Prescripción"
              value={form.prescription}
              name="prescription"
              onChange={handleInputChange}
            />
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <button
                style={{
                  height: '50px',
                  width: '180px',
                  backgroundColor: '#399C7E',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  borderRadius: '5px',
                  marginRight: '10px',
                }}
                disabled={isLoading}
                onClick={handleGenerateHelp}
              >
                <p>{isLoading ? 'Cargando' : 'Generar Ejercicio'}</p>
              </button>
              <button 
                style={{
                  height: '35px',
                  width: '120px',
                  backgroundColor: 'blue',
                  color: 'white',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={createDescription} 
              >
                <p>Subir</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
