import React, { useState } from 'react';
import { MDBInput } from 'mdbreact';

import './styles.css';

export default function Login() {
    return(
        <div className='conatiner'>
            <form className='content' method="post" name="teste">{/*onSubmit={handleSubmit}*/}
                     
                <div className="text-center mb-3 mt-3">
                    <h1 className='title'>Login</h1>
                </div>

                <div className="w-100 form-group row">
                    <div className='input-area' className="col-12 p-0">
                        <MDBInput outline className="form-control" label="Email" type="email" />
                    </div>
                    <div className='input-area' className="col-12 p-0">
                        <MDBInput outline className="form-control" label="senha" type="password" />
                    </div>
                </div>
                
                <button type="submit" className="btn-submit">Entrar</button>
            
            </form>
        </div>
    )
}