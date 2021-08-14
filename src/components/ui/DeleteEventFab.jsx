import React from 'react';
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../redux/actions/Events';

export const DeleteEventFab = () => {

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch( eventStartDelete() )
  }
  

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={ handleDelete }
    >
      <i className="fa fa-trash mx-1"></i>
    </button>
  )
}

