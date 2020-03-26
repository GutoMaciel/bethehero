import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs', data)

      alert(`Access ID: ${response.data.id}`)

      history.push('/');
      
    } catch (err) {
      alert('Error. Try again')
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Create your Account</h1>
          <p>Help people find incidents that your ONG helds on.</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            I already have an account
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input 
            placeholder="Ong name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input 
            placeholder="Email" 
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input 
              placeholder="UF" 
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
}
