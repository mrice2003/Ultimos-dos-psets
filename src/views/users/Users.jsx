import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PrevDescription from './components/PrevDescription';
import CardInfo from './components/CardInfo';
import NavigationBar from '../../shared/NavigationBar';  // Importar NavigationBar

const Users = () => {
  const { id } = useParams();

  const [form, setForm] = useState({
    description: '',
    prescription: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [descriptions, setDescriptions] = useState([]);
  const [user, setUser] = useState([]);

  const fetchDescription = async () => {
    const response = await fetch('http://localhost:3000/description/' + id);
    const data = await response.json();
    setDescriptions(data);
    return data;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newForm = {
      ...form,
      [name]: value,
    };
    setForm(newForm);
  };

  const fetchUserById = async () => {
    const response = await fetch('http://localhost:3000/users/' + id);
    const data = await response.json();
    console.log(data);
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
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserById();
    fetchDescription();
  }, [id]);

  return (
    <NavigationBar>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <CardInfo user={user} />
          </div>
          <div>
            <PrevDescription descriptions={descriptions} />
          </div>
          <div>
            <p>Description</p>
            <textarea
              label="Descripcion"
              value={form.description}
              name="description"
              onChange={handleInputChange}
            />
            <p>Preescricion</p>
            <textarea
              label="Prescription"
              value={form.prescription}
              name="prescription"
              onChange={handleInputChange}
            />
            <div>
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
                }}
                disabled={isLoading}
                onClick={handleGenerateHelp}
              >
                <p>{isLoading ? 'Cargando' : 'Generar Ejercicio'}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </NavigationBar>
  );
};

export default Users;
