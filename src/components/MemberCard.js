// MemberCard.jsx
import React from 'react';
import '../style/memberCard.css'; 


const MemberCard = ({ image, name, role, description }) => {
  return (
    <div className="member-card">
      <img src={image} alt={name} className="member-image" />
      <h3 className="member-name">{name}</h3>
      <p className="member-role">{role}</p>
      <p className="member-description">{description}</p>
    </div>
  );
};

export default MemberCard;
