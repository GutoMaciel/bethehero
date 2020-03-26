import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
        setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Error. Try again')
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero"/>
        <span>Wellcome, to {ongName}</span>

        <Link to="/incidents/new" className="button">Subscribe a new incident</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size="18" color="#e02041" />
        </button>
      </header>
        <h1>Subscribed incidents</h1>

        <ul>
          {incidents.map(incident => (
            <li key={incident.id}>
            <strong>Incident</strong>
            <p>{incident.title}</p>

            <strong>Description</strong>
            <p>{incident.description}</p>

            <strong>Value</strong>
            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size="20" color="#a8a8b3" />
            </button>
          </li>
          ))}
        </ul>
    </div>
  );
}
