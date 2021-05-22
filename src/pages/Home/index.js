import React, { useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { BiArrowBack, BiPlus } from 'react-icons/bi';

import './styles.css'

import Loader from '../../components/Loader';
import api from '../../services/api';

export default function Login({history}) {
    
    const [ loading, setLoading ] = useState(true);
    const [ field, setField ] = useState({
        name: '',
        last_name: '',
        email: ''
    });
    const [ users, setUses ] = useState([])

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/')
        }
        setTimeout(() => setLoading(false), 500)
    }, [history]);
    

    const handleExit = () => {
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
                    <h2 style={{fontWeight: 'bold'}}>Lista de Usuaios</h2>
                </div>
                
                <div className="content-home">
                    <div className="content-top">
                        <button className="btn-custom" onClick={handleExit}>
                            <BiArrowBack /> <p className="ml-1 mb-0">Sair</p>
                        </button>
                        
                    </div>

                    <div className="user">
                        
                    </div>
                </div>

                <div className="footer">
                    <p className="mb-0">Os dados da tabela são estaticos, apenas visuais.</p>
                </div>
            </div>
        )
    }
}