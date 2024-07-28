import React from 'react';
import '../style/hiringlist.css';

const Card = ({ classname, href, iconname, title, description }) => {
  return (
    <div className={`card-container ${classname}`}>
      <div className="card">
        <a href={href}>
          <div className="card--display">
            <i className="material-icons">{iconname}</i>
            <h2>{title}</h2>
          </div>
          <div className="card--hover">
            <h2>{title}</h2>
            <p>{description}</p>
            <p className="link">Click to see project</p>
          </div>
        </a>
        <div className="card--border"></div>
      </div>
    </div>
  );
};

const Hiringlist = () => {
  const cardData = [
    {
      classname: 'purple',
      href: "I'm a Tutor",
      iconname: "I",
      title: "I'm a Tutor",
      description: 'Perfect Tutor connects Students with the Home Tutors and Online Tutors. We provide full-time & part-time Home Tuition Jobs and Online Tuition Jobs. You can teach the students of all Classes from KG to XII. You can also teach the students of Colleges, Universities, Competitive Exams, Hobby & Languages, etc. Interested Tutors can Sign Up for Free to get Online and Home Tutoring Jobs. '
    },
    {
      classname: 'green',
      href: "",
      iconname: 'public',
      title: "I'm a Student",
      description: 'If you are looking for the top-qualified Home Tutor or Online Tutor for tuition classes at your Home or Online. You can simply post your learning requirement for Free on our Perfect Tutor Platform and get an instant response from experienced and the best-qualified tutors & teachers of your home area or nearest location. Students can Sign Up to join us and our teacher’s community. '
    },
    {
      classname: 'purple',
      href: "",
      iconname: 'train',
      title: "I'm a Tution Center",
      description: "Are you looking for admission enquiries of students in your school or college? We are here to provide you with all the support your college or school needs. We can help you with relevant leads, hiring faculty for you, and branding & promoting your school or college. So don't think so much just sign up and get all the benefits from today."
    },
    {
      classname: "green",
      href: 'androidupdate',
      iconname: "",
      title:  "I'M A SCHOOL OR COLLEGE",
      description: "Are you looking for tuition leads or seeking students for admission in the courses offered by your institute? We are here to enhance your institute's growth. We can help you with verified leads, hiring teaching faculty for your institute, and branding & promoting your institute. So don't think so much just sign up and get all the benefits from now."
    }
  ];

  return (
    <div className="card-list">
      {cardData.map((card, index) => (
        <Card
          key={index}
          classname={card.classname}
          href={card.href}
          iconname={card.iconname}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default Hiringlist;
