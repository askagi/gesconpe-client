import './style.css';
import CloseIcon from '../../assets/close.svg';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { getItem } from '../../utils/localStorage';

const ModalProfile = ({
    setOpenModalProfile,
    user
}) => {

    const [form, setForm] = useState({ nome: user.nome, email: user.email, senha: '' });
    const [senhaConfirmada, setSenhaConfirmada] = useState('');
    const token = getItem('token');

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
            const response = await api.put('/usuario', {
                ...form
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status > 204) {
                return;
            }

            console.log('Exibir tela de confirmação: Conta criada com sucesso');
            setOpenModalProfile(false);
        } catch (error) {
            console.log(error.response.data.mensagem);
        }
    }

    const handleChangeInput = ({ target }) => {
        setForm({ ...form, [target.name]: target.value });
    }

    return (
        <div className='container-modal'>
            <div className='modal'>
                <div className='modal-header'>
                    <h2>Editar perfil</h2>
                    <img src={CloseIcon} alt='close icon' onClick={() => setOpenModalProfile(false)} />
                </div>
                <form className='modal-form' onSubmit={handleSubmit}>
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
                    <button type='submit'>Confirmar</button>
                </form>
            </div >
        </div >
    )
}

export default ModalProfile;