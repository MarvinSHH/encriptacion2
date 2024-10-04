import React, { useState } from "react";
import "./App.css";

function App() {
  const [cesarMessage, setCesarMessage] = useState("");
  const [cesarShift, setCesarShift] = useState(0);
  const [cesarOutput, setCesarOutput] = useState("");

  const [escitalaMessage, setEscitalaMessage] = useState("");
  const [escitalaKey, setEscitalaKey] = useState(0);
  const [escitalaOutput, setEscitalaOutput] = useState("");
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false); // Estado para el modal

  // Funciones de cifrado y descifrado de César
  const cifrarCesar = () => {
    const shift = parseInt(cesarShift, 10); // Asegúrate de convertir a número
    if (!cesarMessage || isNaN(shift)) {
      setError("Por favor, ingresa un mensaje y un desplazamiento válidos.");
      return;
    }
    let resultado = "";
    for (let i = 0; i < cesarMessage.length; i++) {
      let codigo = cesarMessage.charCodeAt(i);
      if (codigo >= 65 && codigo <= 90) {
        // Mayúsculas
        resultado += String.fromCharCode(((codigo - 65 + shift) % 26) + 65);
      } else if (codigo >= 97 && codigo <= 122) {
        // Minúsculas
        resultado += String.fromCharCode(((codigo - 97 + shift) % 26) + 97);
      } else {
        resultado += cesarMessage.charAt(i); // No cifrar otros caracteres
      }
    }
    setCesarOutput("Mensaje Cifrado: " + resultado);
    setError("");
  };

  const descifrarCesar = () => {
    const shift = parseInt(cesarShift, 10); // Asegúrate de convertir a número
    if (!cesarMessage || isNaN(shift)) {
      setError("Por favor, ingresa un mensaje y un desplazamiento válidos.");
      return;
    }
    let resultado = "";
    for (let i = 0; i < cesarMessage.length; i++) {
      let codigo = cesarMessage.charCodeAt(i);
      if (codigo >= 65 && codigo <= 90) {
        // Mayúsculas
        resultado += String.fromCharCode(
          ((codigo - 65 - shift + 26) % 26) + 65
        );
      } else if (codigo >= 97 && codigo <= 122) {
        // Minúsculas
        resultado += String.fromCharCode(
          ((codigo - 97 - shift + 26) % 26) + 97
        );
      } else {
        resultado += cesarMessage.charAt(i); // No descifrar otros caracteres
      }
    }
    setCesarOutput("Mensaje Descifrado: " + resultado);
    setError("");
  };

  // Funciones de cifrado y descifrado de Escítala
  const cifrarEscitala = () => {
    const key = parseInt(escitalaKey, 10); // Asegúrate de convertir a número
    if (!escitalaMessage || isNaN(key) || key <= 0) {
      setError("Por favor, ingresa un mensaje y una clave válidos.");
      return;
    }
    if (key > escitalaMessage.length) {
      alert(
        "El número de columnas es mayor que la longitud del mensaje. El cifrado puede no ser efectivo."
      );
    }
    let resultado = "";
    for (let i = 0; i < key; i++) {
      for (let j = i; j < escitalaMessage.length; j += key) {
        resultado += escitalaMessage[j];
      }
    }
    setEscitalaOutput("Mensaje Cifrado: " + resultado);
    setError("");
  };

  const descifrarEscitala = () => {
    const key = parseInt(escitalaKey, 10); // Asegúrate de convertir a número
    if (!escitalaMessage || isNaN(key) || key <= 0) {
      setError("Por favor, ingresa un mensaje y una clave válidos.");
      return;
    }
    if (key > escitalaMessage.length) {
      alert(
        "El número de columnas es mayor que la longitud del mensaje. El descifrado puede no tener efecto o ser el mismo."
      );
    }
    let filas = Math.ceil(escitalaMessage.length / key);
    let resultado = new Array(escitalaMessage.length).fill(""); // Inicializar el arreglo
    let index = 0;
    for (let i = 0; i < key; i++) {
      for (let j = i; j < escitalaMessage.length; j += key) {
        resultado[j] = escitalaMessage[index++];
      }
    }
    setEscitalaOutput("Mensaje Descifrado: " + resultado.join(""));
    setError("");
  };

  // Función para abrir y cerrar el modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="App">
      <h1>Bienvenid@ a los cifrados!</h1>
      <div className="form-container">
        {/* Cifrado César */}
        <div className="container">
          <section id="cesar-section">
            <h2>Cifrado César</h2>
            <label htmlFor="cesar-message">Mensaje:</label>
            <input
              type="text"
              id="cesar-message"
              value={cesarMessage}
              onChange={(e) => setCesarMessage(e.target.value)}
              placeholder="Ingresa tu mensaje"
            />
            <label htmlFor="cesar-shift">Desplazamiento:</label>
            <input
              type="number"
              id="cesar-shift"
              value={cesarShift}
              onChange={(e) => setCesarShift(e.target.value)}
              placeholder="Ingresa el desplazamiento"
            />
            <button onClick={cifrarCesar}>Cifrar</button>
            <button onClick={descifrarCesar}>Descifrar</button>
            <p>{cesarOutput}</p>
          </section>
        </div>

        {/* Cifrado Escítala */}
        <div className="container">
          <section id="escitala-section">
            <h2>Cifrado Escítala</h2>
            <label htmlFor="escitala-message">Mensaje:</label>
            <input
              type="text"
              id="escitala-message"
              value={escitalaMessage}
              onChange={(e) => setEscitalaMessage(e.target.value)}
              placeholder="Ingresa tu mensaje"
            />
            <label htmlFor="escitala-key">Clave (número de columnas):</label>
            <input
              type="number"
              id="escitala-key"
              value={escitalaKey}
              onChange={(e) => setEscitalaKey(e.target.value)}
              placeholder="Ingresa la clave"
            />
            <button onClick={cifrarEscitala}>Cifrar</button>
            <button onClick={descifrarEscitala}>Descifrar</button>
            <p>{escitalaOutput}</p>
          </section>
        </div>
      </div>
      {/* Botón para mostrar el modal */}
      <button className="comparison-btn" onClick={toggleModal}>
        Comparación
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Comparación de métodos de cifrado</h2>
            <ul>
              <li>
                <strong>Cifrado César:</strong> Cifrado por sustitución con
                desplazamiento fijo en el alfabeto.
                <ul>
                  <li>
                    <strong>Seguridad:</strong> Muy baja, vulnerable a ataques
                    de fuerza bruta.
                  </li>
                  <li>
                    <strong>Uso actual:</strong> En desuso, salvo para enseñanza
                    o demostraciones básicas.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Escítala:</strong> Cifrado basado en transposición,
                utilizado en la antigua Grecia.
                <ul>
                  <li>
                    <strong>Seguridad:</strong> Muy baja, fácil de descifrar con
                    análisis manual.
                  </li>
                  <li>
                    <strong>Uso actual:</strong> En desuso, solo con fines
                    históricos o educativos.
                  </li>
                </ul>
              </li>
              <li>
                <strong>CAST5:</strong> Cifrado simétrico por bloques de 64
                bits.
                <ul>
                  <li>
                    <strong>Seguridad:</strong> Considerado seguro, pero
                    reemplazado por algoritmos más modernos como AES.
                  </li>
                  <li>
                    <strong>Uso actual:</strong> Raramente usado, pero soportado
                    en sistemas heredados.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Paillier:</strong> Cifrado asimétrico homomórfico, útil
                para operaciones encriptadas.
                <ul>
                  <li>
                    <strong>Seguridad:</strong> Alta, adecuado para criptografía
                    homomórfica.
                  </li>
                  <li>
                    <strong>Uso actual:</strong> Usado en aplicaciones como
                    votación electrónica y privacidad de datos.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Skein:</strong> Función hash criptográfica candidata al
                estándar SHA-3.
                <ul>
                  <li>
                    <strong>Seguridad:</strong> Alta, diseñada para resistir
                    ataques modernos.
                  </li>
                  <li>
                    <strong>Uso actual:</strong> Implementada en criptografía
                    avanzada y firmas digitales.
                  </li>
                </ul>
              </li>
            </ul>

            <button className="close-btn" onClick={toggleModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
      <p className="name">Marvin Tristan Sanjuan Hernandez 7B</p>
      <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
    </div>
  );
}

export default App;
