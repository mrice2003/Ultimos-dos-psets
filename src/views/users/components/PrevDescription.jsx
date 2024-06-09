import React, { useState } from 'react';

const PrevDescription = ({ descriptions }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null); // Contraer la tarjeta si ya está expandida
    } else {
      setExpandedCard(index); // Expandir la tarjeta si no está expandida
    }
  };

  // Invierte el orden de las descripciones para mostrarlas de forma inversa
  const reversedDescriptions = [...descriptions].reverse();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {reversedDescriptions.map((desc, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '10px',
            cursor: 'pointer',
            width: '200px', // Establece la anchura fija de las tarjetas
            height: expandedCard === index ? 'auto' : '100px', // Altura auto si está expandida, 100px si no
            overflow: 'hidden', // Oculta el contenido que se desborda
            marginRight: '10px', // Agrega un margen derecho para separar las tarjetas
          }}
          onClick={() => handleCardClick(index)} // Maneja el clic para expandir o contraer la tarjeta
        >
          <p style={{ fontWeight: 'bold' }}>{desc.description}</p> {/* Description en negrita */}
          {expandedCard === index ? (
            <p>{desc.prescription}</p> // Muestra toda la descripción si la tarjeta está expandida
          ) : (
            <p>{desc.prescription.slice(0, 50)}...</p> // Muestra solo una parte de la descripción
          )}
        </div>
      ))}
    </div>
  );
};

export default PrevDescription;
