import './style.css';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { setItem, getItem } from '../../utils/localStorage';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        const token = getItem('token');
        if (token) {
            navigate('/home');
        }
    }, []);

    const loginUser = async () => {
        try {
            const response = await api.post('/login', {
                email,
                senha
            });

            const { token } = response.data;
            setItem('token', token);
            navigate('/home');

        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !senha) {
            alert('Todos os campos são obrigatórios');
            return;
        }

        await loginUser();
    }

    return (
        <div className='container'>
            <Header />
            <div className='container-login'>
                <div className='left'>
                    <h1>Controle suas <span className='purple'>finanças</span>, sem planilha chata.</h1>
                    <p>
                        Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.
                    </p>

                    <button onClick={() => navigate('/sign-up')} type='button'>Cadastre-se</button>
                </div>
                <div className='right'>
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className='content-input'>
                            <div className='input-group'>
                                <label htmlFor='email'>E-mail</label>
                                <input
                                    type='email'
                                    name='email'
                                    id='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='input-group'>
                                <label htmlFor='senha'>Senha</label>
                                <input
                                    type='password'
                                    name='senha'
                                    id='senha'
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type='submit'>Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn;