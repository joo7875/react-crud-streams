import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
  return ReactDOM.createPortal(
    <div 
      onClick={props.onDismiss} 
      className='ui dimmer modals visible active'>
      
      {/* stopPropagation prevents bubble up to this event/Even if a modal is clicked, the modal won't disappear  */}
      <div 
        onClick={(e) => e.stopPropagation() } 
        className='ui standard modal visible active'>
        <div className='header'>{props.title}</div>
        <div className='content'>
          {props.content}
        </div>
        <div className='actions'>
          {props.actions}
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;