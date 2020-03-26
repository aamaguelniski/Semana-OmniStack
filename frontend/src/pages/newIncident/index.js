import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';

import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

export default function NewIncident (){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handdleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId
                }                    
            })
            history.push('/profile');
        } catch(err){
            alert('Falha ao cadastrar caso, tente novamente.');
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                <img src={logoImg} alt="Be the Hero" />

                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#e02041" />
                    Voltar ao perfil
                </Link>

                </section>
                
                <form onSubmit={ handdleNewIncident }>
                    <input 
                        placeholder='Título do caso'
                        value={ title }
                        onChange = { e => setTitle(e.target.value) }
                    />
                    <textarea 
                        placeholder="Descrição do caso"
                        value={ description }
                        onChange={ e => setDescription(e.target.value) }
                    />
                    <input 
                        placeholder="Valor em R$"
                        value={ value }
                        onChange={ e => setValue(e.target.value) }
                    />
                    
                    <button className="button" type="submit">Cadastrar</button>
                </form>                
            </div>
        </div>
    );
}