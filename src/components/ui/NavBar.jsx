import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../redux/actions/Auth';

export const NavBar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch( startLogout() );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
       <div className="container-fluid">
        
        <span className="navbar-brand">
          { name }
        </span>

        <button className="btn btn-danger" onClick={ handleLogout }>
          <span>Salir</span>
          <i className="fas fa-sign-out-alt ms-1"></i>
        </button>
       </div>
    </nav>
  )
}
