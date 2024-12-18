import React from 'react';

const Layout = ({children, title}) => {
  return (
    <div className='main-layout'>
      {title && <h1 className='layout-title'>{title}</h1> }
      {children} 
    </div>
  )
}

export default Layout