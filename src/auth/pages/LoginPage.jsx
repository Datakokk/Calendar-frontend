import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}
const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export const LoginPage = () => {
    
    const { startLogin, startRegister, errorMessage } = useAuthStore();
    
    const {loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm( loginFormFields );
    const {registerName, registerPassword2, registerEmail, registerPassword, onInputChange: onRegisterInputChange } = useForm( registerFormFields );

    const loginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({email:loginEmail, password:loginPassword });
    };

    const registerSubmit = ( event ) => {
        event.preventDefault();
        if( registerPassword !== registerPassword2 ){
            Swal.fire('Registration failed', 'Passwords are not the same');
            return;
        }
         startRegister({email:registerEmail, name:registerName, password:registerPassword});
    }

    useEffect(() => {
      if( errorMessage !== undefined ){
        Swal.fire('Authentication error', errorMessage, 'error');
      }

    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Logg inn</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="E-post"
                                name='loginEmail'
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Passord"
                                name='loginPassword'
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Melde deg på</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Navn"
                                name='registerName'
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="E-post"
                                name='registerEmail'
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Passord"
                                name='registerPassword'
                                value={ registerPassword }
                                onChange={ onRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Gjenta passord"
                                name='registerPassword2'
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Opprett konto" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}