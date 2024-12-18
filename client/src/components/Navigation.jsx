import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCartItems } from '../store/CartSlice';
import { logout } from '../store/AuthSlice';

const Navigation = () => {

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { totalQuantity, cartItems } = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isToggled, setIsToggled] = useState(false);

    const onLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        setIsToggled(false)
        navigate('/login');
        dispatch(clearCartItems());
    }

    const onCloseMenu = () => {
        setIsToggled(false)
    }

    return (
        <>
            <div className='main-navigation'>
                <div>
                    <span className='logo'>
                       <NavLink><img src={logo} /></NavLink> 
                    </span>
                </div>

                <div className='middle-menu'>
                    <ul className={isToggled ? 'show' : ''}>
                        <li onClick={onCloseMenu} className={({ isActive }) => (isActive ? 'active' : undefined)}><NavLink to="/">HOME</NavLink></li>

                        <li onClick={onCloseMenu} className={({ isActive }) => (isActive ? 'active' : '')}><NavLink to="/products">PRODUCTS</NavLink></li>
                        {isAuthenticated && <li onClick={onCloseMenu} className={({ active }) => active ? 'active' : undefined}><NavLink to="/orders">ORDERS</NavLink></li>}
                        {user && user.isAdmin && <li onClick={onCloseMenu} className={({ active }) => active ? 'active' : undefined}><NavLink to="/users">USERS</NavLink></li>}

                        <li onClick={onCloseMenu} className={({ active }) => active ? 'active' : undefined}><NavLink to="/cart"><FontAwesomeIcon icon={faCartPlus} /><sup>({cartItems.length > 0 ? totalQuantity : "0"})</sup></NavLink></li>
                        <li onClick={onCloseMenu} id='sale-nav' className={({ active }) => active ? 'active' : undefined}><NavLink to="/sale" style={{ color: 'red', fontWeight: 'bold' }}>SALE</NavLink></li>
                    </ul>
                </div>
                <div className='authentication'>
                    <ul className={isToggled ? 'show' : ''}>
                        {!isAuthenticated && <li onClick={onCloseMenu} className={({ active }) => active ? 'active' : undefined}><NavLink to="/login">LOGIN <FontAwesomeIcon icon={faSignInAlt} /></NavLink></li>}
                        {!isAuthenticated && <li onClick={onCloseMenu} className={({ active }) => active ? 'active' : undefined}><NavLink to="/register">SIGN UP <FontAwesomeIcon icon={faUserPlus} /></NavLink></li>}
                        {isAuthenticated && <li className={({ active }) => active ? 'active' : undefined} onClick={onLogout}><NavLink to="/home">LOGOUT <FontAwesomeIcon icon={faSignOutAlt} /></NavLink></li>}
                        {isAuthenticated && <li onClick={onCloseMenu} className={({ active }) => active ? 'active' : undefined}><NavLink to="/profile"> <FontAwesomeIcon icon={faUserCircle} /></NavLink></li>}
                        
                    </ul>
                </div>
                <div className='responsive-action'>
                            <span onClick={() => setIsToggled((prevState) => !prevState)}>
                               <FontAwesomeIcon icon={isToggled ? faTimes : faBars} />
                            </span>
                        </div>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export default Navigation;
