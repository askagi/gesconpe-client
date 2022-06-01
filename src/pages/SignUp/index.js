import { useState } from 'react';
import api from '../../services/api';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import './style.css';

const SignUp = () => {
    const [form, setForm] = useState({ nome: '', email: '', senha: '' });
    const [senhaConfirmada, setSenhaConfirmada] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nome, email, senha } = form;

        if (!nome || !email || !senha) {
            alert('Todos os campos são obrigatórios.');
            return;
        }

        if (senha !== senhaConfirmada) {
            alert('As senhas estão diferentes');
            console.log(e.target.senhaConfirmada.style.borderColor = 'red');
            return;
        }

        try {
            const response = await api.post('/usuario', {
                ...form
            });

            console.log('Exibir tela de confirmação: Conta criada com sucesso');

            navigate('/');

        } catch (error) {
            console.log(error.response.data.mensagem);
        }
    }

    const handleChangeInput = ({ target }) => {
        setForm({ ...form, [target.name]: target.value });
    }

    return (
        <div className='container'>
            <Header />
            <div className='container-sign-up'>
                <div className='content-form'>
                    <h5>Cadastre-se</h5>
                    <form onSubmit={handleSubmit}>
                        <div className='content-input'>
                            <div className='input-group'>
                                <label htmlFor='nome'>Nome</label>
                                <input
                                    type='text'
                                    name='nome'
                                    value={form.nome}
                                    onChange={handleChangeInput}
                                    id='nome'
                                    required
                                />
                            </div>

                            <div className='input-group'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    name='email'
                                    value={form.email}
                                    onChange={handleChangeInput}
                                    id='email'
                                    required
                                />
                            </div>

                            <div className='input-group'>
                                <label htmlFor='senha'>Senha</label>
                                <input
                                    type='password'
                                    name='senha'
                                    value={form.senha}
                                    onChange={handleChangeInput}
                                    id='senha'
                                    required
                                />
                            </div>

                            <div className='input-group'>
                                <label htmlFor='senhaConfirmada'>Confirmação de Senha</label>
                                <input
                                    type='password'
                                    name='senhaConfirmada'
                                    value={senhaConfirmada}
                                    onChange={(e) => setSenhaConfirmada(e.target.value)}
                                    id='senhaConfirmada'
                                    required
                                />
                            </div>

                        </div>
                        <button type='submit'>Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;