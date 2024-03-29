import React from "react";
import "../public/css/Contacts.css"

export const Contacts = () => {
  return (
    <div className='container'>
    <div>
        <h1 className="contact-us" data-cy="cy-contact">Contact Us</h1>
      <div className="container">
        <div className="wrapper-contacts">
        <div className="map-container" data-cy="cy-contact-map-container">
          <iframe
            title="OpenStreetMap"
            data-cy="cy-contact-iframe"
            width="700"
            height="550"
            style={{ border: 0 }}
            src={`https://www.openstreetmap.org/export/embed.html?bbox=23.321271091461186%2C42.697921072294176%2C23.325827002525336%2C42.7005563269142&layer=mapnik&marker=42.699239%2C23.323549`}
            allowFullScreen
          ></iframe>
        </div>
        <div className="contact-info">
        <h3>Our Address</h3>
          <p>1 Banski Square</p>
          <p>1000 Sofia, Bulgaria</p>
          <p>Phone: +359-456-777</p>
          <p>Email: info@kitsector.com</p>
        </div>
        <div className="about-us">
            <h3>Our Mission</h3>
          <p> We are a team of aspiring young professionals that know the value and joy our football kits convey. This is why we are motivated to extend their life in an attempt to give that joy and happiness to other people as well!</p>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Contacts;