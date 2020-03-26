import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from '../../services/api';

import logoImg from "../../assets/logo.svg";
import './styles.css';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      });

      history.push('/profile');

    } catch (err) {
        alert('Error. Try again.')
    }

  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Subscribe new Incident</h1>
          <p>Describe the incident to find new heroes to solve the case.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Back to home
          </Link>
        </section>
        <form>
          <input 
            placeholder="Incident Title" 
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          <textarea 
            placeholder="Description" 
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          <input 
            placeholder="Price"
              value={value}
              onChange={e => setValue(e.target.value)}
            />

          <button onClick={handleNewIncident} className="button" type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
}
