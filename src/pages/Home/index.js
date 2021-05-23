import React, { useEffect, useState } from 'react';
import { MDBInput } from 'mdbreact';
import { NotificationManager } from 'react-notifications';
import { BiArrowBack, BiPlus, BiEdit, BiTrash } from 'react-icons/bi';

import './styles.css'

import logo from '../../assets/logo_h4money.png';
import Loader from '../../components/Loader';
import api from '../../services/api';

export default function Login({history}) {
    
    const [ loading, setLoading ] = useState(true);
    const [ field, setField ] = useState({
        name: '',
        last_name: '',
        email: ''
    });
    const [ user, setUser ] = useState({
        name: '',
        last_name: '',
        email: ''
    });

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/')
        }

        const nameStored = localStorage.getItem('name')
        const last_nameStored = localStorage.getItem('last_name')
        const emailStored = localStorage.getItem('email')

        if (nameStored && last_nameStored && emailStored) {
            setUser({
                name: nameStored,
                last_name: last_nameStored,
                email: emailStored
            })
            setField({
                name: nameStored,
                last_name: last_nameStored,
                email: emailStored
            })
        }

        setTimeout(() => setLoading(false), 500)
    }, [history]);
    
    const handleChange = (event) => {
        const target = event.target;
        const {name, value} = target;

        setField({ ...field, [name]:value })
    }

    const handleRegister = async (event) =>{
        event.preventDefault();
        setLoading(true)
        if (!field.name || !field.last_name || !field.email) {
            Notifications('error', 'Preencha todos os campos!');
            setLoading(false);
        } else {
            await api.post('./users', field)
                .then(function (response) {
                    console.log(response);
                    setUser({
                        name: response.data.name,
                        last_name: response.data.last_name,
                        email: response.data.email
                    })
                    localStorage.setItem('name', response.data.name)
                    localStorage.setItem('last_name', response.data.last_name)
                    localStorage.setItem('email', response.data.email)
                    Notifications('success', 'Usuário cadastrado com sucesso!');
                    setLoading(false)
                })
                .catch(function (error){
                    console.log(error);
                    Notifications('error', "Erro ao cadastrar usuário")
                    setLoading(false) 
                })
        }
    }

    const handleEdit = async (event) =>{
        event.preventDefault();
        setLoading(true)
        if (!field.name || !field.last_name || !field.email) {
            Notifications('info', 'Preencha todo os os campos para editar usuário!');
            setLoading(false);
        } else if (field.name === user.name && field.last_name === user.last_name && field.email === user.email) {
            Notifications('info', 'Nenhum dado alterado!');
            setLoading(false);
        } else {
            await api.put('./users/1', field)
                .then(function (response) {
                    console.log(response);
                    setUser({
                        name: response.data.name,
                        last_name: response.data.last_name,
                        email: response.data.email
                    })
                    localStorage.setItem('name', response.data.name)
                    localStorage.setItem('last_name', response.data.last_name)
                    localStorage.setItem('email', response.data.email)
                    Notifications('success', 'Usuário atualizado com sucesso!');
                    setLoading(false)
                })
                .catch(function (error){
                    console.log(error);
                    Notifications('error', "Erro ao editar usuário")
                    setLoading(false)
                })
        }
    }
    
    const handleDelete = async (event) =>{
        event.preventDefault();
        setLoading(true)
        await api.delete('./users/1')
            .then(function (response) {
                console.log(response);
                localStorage.removeItem('name');
                localStorage.removeItem('last_name');
                localStorage.removeItem('email');
                setUser({
                    name: '',
                    last_name: '',
                    email: ''
                })
                setField({
                    name: '',
                    last_name: '',
                    email: ''
                })
                Notifications('success', 'Usuário deletado com sucesso!');
                setLoading(false)
            })
            .catch(function (error){
                console.log(error);
                Notifications('error', "Erro ao deletar usuário")
                setLoading(false)
            })
    }
    
    const handleExit = () => {
        setLoading(true)
        setUser({
            name: '',
            last_name: '',
            email: ''
        })
        history.push('/')
    }

    const Notifications = (type, message, title=null) => {
        switch (type) {
            case 'info':
                return NotificationManager.info(message, '', 3000);
            case 'success':
                return NotificationManager.success(message, '', 3000);
            case 'warning':
                return NotificationManager.warning(message, '', 3000);
            case 'error':
                return (
                    NotificationManager.error(message, '', 3000)
                );
            default:
                return (
                    NotificationManager.error(message, 'Click aqui!', 5000, () => {
                        alert('callback');
                    })
                );
        }       
    }

    if(loading){
        return <Loader />
    } else {
        return(
            <div className="conatiner-home">
                
                <div className="header">
                    <img src={logo} style={{width: '200px'}} />
                </div>
                
                <div className="content-home">
                    <div className="content-top">
                        <button className="btn-custom mt-0" onClick={handleExit}>
                            <BiArrowBack /> <p className="ml-1 mb-0">Sair</p>
                        </button>                        
                    </div>

                    <div className="user-card">
            
                        <div className="card">
                            <div className="card-header d-flex justify-content-center">
                                <h2 className="mb-0">Usuário Cadastrado</h2>
                            </div>
                            <div className="card-body">
                                {(user.nome !== '' && user.last_name !== '' && user.email !== '') ? 
                                    <div className="user">
                                        <strong>{user.name} {user.last_name}</strong>
                                        <strong>{user.email}</strong>
                                    </div>
                                    : 
                                    <div className="d-flex justify-content-center">
                                        <p>Usuário ainda não cadastrado</p>
                                    </div>
                                }
                                <MDBInput 
                                    outline 
                                    label="nome" 
                                    name="name" 
                                    type="text" 
                                    value={field.name} 
                                    onChange={handleChange}
                                />
                                <MDBInput 
                                    outline 
                                    label="sobrenome" 
                                    name="last_name" 
                                    type="text" 
                                    value={field.last_name} 
                                    onChange={handleChange}
                                />
                                <MDBInput 
                                    outline 
                                    label="Email" 
                                    name="email" 
                                    type="email" 
                                    value={field.email} 
                                    onChange={handleChange}
                                />

                                {(user.nome !== '' && user.last_name !== '' && user.email !== '') ?
                                    <div className="actions">
                                        <button className="btn-custom btn-danger" onClick={handleDelete}>
                                            <BiTrash /> <p className="ml-1 mb-0">Deletar</p>
                                        </button>
                                        <button className="btn-custom btn-warning" onClick={handleEdit}>
                                            <BiEdit /> <p className="ml-1 mb-0">Editar</p>
                                        </button>
                                    </div>
                                    :
                                    <button className="btn-custom" onClick={handleRegister}>
                                        <BiPlus /> <p className="ml-1 mb-0">Cadastar Usuário</p>
                                    </button>
                                }
                            </div>
                        </div>                        
                        
                    </div>
                </div>
               
                <div className="footer">
                    <p className="mb-0">Esta interface tem o objetivo de testar as requisições feitas ao reqres.in</p>
                </div>
            </div>
        )
    }
}