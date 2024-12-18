import React from 'react';

const Card = ({children, title, className, ...props}) => {
  return (
    <div {...props} className={`card-layout ${className ? className : ''}`}>
        <div className='card'>
          <h1 className='card-title'>{title}</h1>
          {children}
        </div>
    </div>
  )
}

export default Card