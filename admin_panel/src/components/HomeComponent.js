
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Nav from 'react-bootstrap/Nav';

export const HomeComponent = ({ name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <section id="" >
		  <div className="containerAdmin"  style={{paddingLeft:310, backgroundColor:'rgb(70, 70, 70)'}}>
        <div style={{height:800}}>
          {/* aria-orientation="vertical" */}
          Home
          
        </div>
        
        
      </div>
  </section>
  )
}
