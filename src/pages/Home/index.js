import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBIcon, MDBInput, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact';
import { NotificationManager } from 'react-notifications';
import { BiArrowBack, BiPlus } from 'react-icons/bi';

import './styles.css'

import Loader from '../../components/Loader';
import api from '../../services/api';

export default function Login({history}) {
    
    const [ modalRegister, setModalRegister ] = useState(false)
    const [ modalEdit, setModalEdit ] = useState(false)
    const [ modalDelete, setModalDelete ] = useState(false)
    const [ loading, setLoading ] = useState(true);
    const [ field, setField ] = useState({
        name: '',
        last_name: '',
        tel: '',
        email: ''
    });
    const [ user, setUser ] = useState({
        name: '',
        last_name: '',
        tel: '',
        email: ''
    });

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            history.push('/')
        }
        setTimeout(() => setLoading(false), 500)
    }, [history]);
    
    const handleChange = (event) => {
        const target = event.target;
        const {name, value} = target;

        setField({ ...field, [name]:value })
    }

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

    function openModalRegister(){
        setModalRegister(!modalRegister);
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

                        {(user.name === '') ? 
                            <div className="card">
                                <div className="card-header d-flex justify-content-center">
                                    <h2>Usuario Cadastrado</h2>
                                </div>
                                <div className="card-body">
                                    <p >Nenhum Usuario Cadastrado!</p>
                                    <button className="btn-custom">
                                        <BiPlus /> 
                                        <p className="ml-1 mb-0" onClick={() => openModalRegister()}>Cadastar Usuario</p>
                                    </button>
                                </div>
                                
                            </div>
                            :
                            <div>
                                <div className="card">
                                    <div className="card-header d-flex justify-content-center">
                                        <h2>Usuario Cadastrado</h2>
                                    </div>
                                    <div className="card-body">
                                        <div>
                                            <strong>Nome: </strong>
                                            <span>{user.name}</span>
                                        </div>
                                        <div>
                                            <strong>Sobrenome: </strong>
                                            <span>{user.last_name}</span>
                                        </div>
                                        <div>
                                            <strong>Telefone: </strong>
                                            <span>{user.tel}</span>
                                        </div>
                                        <div>
                                            <strong>Email: </strong>
                                            <span>{user.email}</span>
                                        </div>
                                        <button className="btn-custom">
                                            <BiPlus /> <p className="ml-1 mb-0">Cadastar Usuario</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                        
                        
                    </div>
                </div>
                <MDBModal isOpen={modalRegister} toggle={() => openModalRegister()}>
                                    <MDBModalHeader toggle={() => openModalRegister()}>MDBModal title</MDBModalHeader>
                                    <MDBModalBody>
                                    (...)
                                    </MDBModalBody>
                                    <MDBModalFooter>
                                        <MDBBtn color="secondary" onClick={() => openModalRegister()}>Close</MDBBtn>
                                        <MDBBtn color="primary">Save changes</MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>
                <div className="footer">
                    <p className="mb-0">Esta interface tem o objetivo de testar as requisições feitas ao reqres.in</p>
                </div>
            </div>
        )
    }
}