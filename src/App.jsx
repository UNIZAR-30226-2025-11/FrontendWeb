import { useState, useEffect } from "react";

const App = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error al obtener mensajes:", error);
    }
  };


  return (
    <div>
      <h2>Mensajes</h2>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.text}</li>
        ))}
      </ul>

      <button onClick={fetchMessages}>Recibir mensaje</button>
    </div>
  );
};

export default App;
