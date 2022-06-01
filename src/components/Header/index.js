import './style.css';
import Logo from '../../assets/logo.png';
import Avatar from '../../assets/avatar.png';
import ExitIcon from '../../assets/exit.svg';
import { useNavigate } from 'react-router-dom';
import { removeItem } from '../../utils/localStorage';

const Header = ({ user, openModalProfile, setOpenModalProfile }) => {
    const navigate = useNavigate();

    const exitSession = () => {
        removeItem('token');
        navigate('/');
    }
    return (
        <div className='container-header'>
            <div className='logo'>
                <img src={Logo} alt='logo dindin' />
            </div>

            {user &&
                <div className='profile-area'>
                    <div className='content-user'>
                        <img src={Avatar} alt='Avatar' onClick={() => setOpenModalProfile(!openModalProfile)} />
                        <span>{user.nome ? user.nome : '...'}</span>
                    </div>
                    <img onClick={exitSession} className='exit' src={ExitIcon} alt='botão de sair' />
                </div>
            }
        </div>
    )
}

export default Header;