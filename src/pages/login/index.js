import React, { useEffect, useState } from 'react';
import { MDBInput } from 'mdbreact';
import { NotificationManager } from 'react-notifications';

import './styles.css';

import Loader from '../../components/Loader';
import api from '../../services/api';

export default function Login({history}) {  

    const [ loading, setLoading ] = useState(true);
    const [ field, setField ] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        localStorage.clear();
        setTimeout(() => setLoading(false), 500)
    }, []);
    
    const handleChange = (event) => {
        const target = event.target;
        const {name, value} = target;

        setField({ ...field, [name]:value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!field.email || !field.password) {
            Notifications('error', 'Preencha todos os campos!');
            setLoading(false);
        } else {
            api.post('/login', field)
                .then(function (response) {
                    console.log(response);
                    localStorage.setItem('token', response.data.token)
                    history.push('/home')
                })
                .catch(function () {
                    Notifications('error', 'Usuario e/ou senha inválidos!');
                    setLoading(false);
                })
        }
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
            <div className='conatiner'>
                <form className='content-login' method="post" name="teste" onSubmit={handleSubmit}>
                        
                    <div className="text-center mb-3 mt-3">
                        <h1 className='title'>Login</h1>
                    </div>

                    <div className="w-100 form-group row">
                        <div className="col-12 p-0">
                            <MDBInput 
                                outline 
                                className="form-control"
                                name="email"  
                                label="Email" 
                                type="email"
                                value={field.email} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="col-12 p-0">
                            <MDBInput 
                                outline 
                                className="form-control"
                                name="password"  
                                label="senha" 
                                type="password"
                                value={field.password} 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn-submit" onClick={handleSubmit}>Entrar</button>
                </form>
                    
            </div>
        )
    }
}