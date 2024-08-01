import React, { useState } from "react";
import "../style/about.css";
import MemberCard from "../components/MemberCard";
import member1 from "../assets/home/members/member1.jpg";
import member2 from "../assets/home/members/member2.jpg";
import member3 from "../assets/home/members/member3.jpg";
import member4 from "../assets/home/members/member4.jpg";
import member5 from "../assets/home/members/member5.jpg";
import member6 from "../assets/home/members/member6.jpg";
import member7 from "../assets/home/members/member7.jpg";

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const members = [
    {
      image: member1,
      name: "Ganesh Sharma",
      role: "Math Tutor",
      description:
        "Expert in calculus and algebra with over 10 years of experience.",
    },
    {
      image: member2,
      name: "Neeraj Gupta",
      role: "Science Tutor",
      description:
        "Specializes in physics and chemistry, making complex concepts easy to understand.",
    },
    {
      image: member3,
      name: "Sanjeev Thalod",
      role: "Science Tutor",
      description:
        "Specializes in physics and chemistry, making complex concepts easy to understand.",
    },
    {
      image: member4,
      name: "Ayush Bajwan",
      role: "Science Tutor",
      description:
        "Specializes in physics and chemistry, making complex concepts easy to understand.",
    },
    {
      image: member5,
      name: "Abhimanyu Bhat",
      role: "Science Tutor",
      description:
        "Specializes in physics and chemistry, making complex concepts easy to understand.",
    },
    {
      image: member6,
      name: "Prerna Rana",
      role: "Science Tutor",
      description:
        "Specializes in physics and chemistry, making complex concepts easy to understand.",
    },
    {
      image: member7,
      name: "Anuj Srivastav",
      role: "Science Tutor",
      description:
        "Specializes in physics and chemistry, making complex concepts easy to understand.",
    },
  ];

  return (
    <div className="about-container">
      <div className="stats-container">
        <div className="stat stat-1">
          <h2>1000+</h2>
          <p>Tutors</p>
        </div>
        <div className="stat stat-2">
          <h2>20k</h2>
          <p>Happy Students</p>
        </div>
        <div className="stat stat-3">
          <h2>10000</h2>
          <p>Classes Completed</p>
        </div>
      </div>

      <div className="how-it-works-container">
        <h2>How It Works</h2>
        <div className="main-step">
          <div className="step">
            <h3>Selection of Tutor</h3>
            <p>
              On the basis of student's learning profile and personality, we
              select best tutor who is qualified ,experienced and has proven
              track record of best result.
            </p>
          </div>
          <div className="step">
            <h3>Arrange Demo</h3>
            <p>
              We schedule demo class at your place. If you do not like demo, we
              will replace tutor.
            </p>
          </div>
          <div className="step">
            <h3>Start Learning</h3>
            <p>
              Start learning and track your progress, Once perfect tutor is
              matched, schedule classes, start learning and track student’s
              progress.
            </p>
          </div>
        </div>
      </div>

      {/* button part */}
      <div className="cta-container">
        <h2>Ready to Get Started?</h2>
        <button className="cta-button">Book Free Demo Classes</button>
      </div>

      {/* beyond tutoring  */}
      <div className="beyond-tutoring-container">
        <h2>Beyond Tutoring</h2>
        <ul className="beyond-tutoring-list">
          <li>
            Our Tutor provides proper guidance to their students whenever they
            require, finds the easiest ways to solve their queries, assists them
            to complete their projects given in their schools and colleges, and
            helps them become strong in their weak fields.
          </li>
          <li>
            Our Tutor develops interest in their students who are weak in some
            particular subjects. He finds different modules and methods to
            create involvement of students in their targeted subjects and
            topics.
          </li>
          <li>
            The work of our home tutor does not end with his subject; his work
            ends when a student becomes a good human being while getting growth
            in Academics.
          </li>
        </ul>
      </div>

      {/* why home tutions */}
      <div className="why-home-tuitions-container">
        <h2>Why Home Tuitions</h2>
        <ul className="why-home-tuitions-list">
          <li>
            In old age, people learned in a one-to-one environment for thousands
            of years. In current times, home tuition is building upon this
            ages-old tradition.
          </li>
          <li>
            The student’s needs are concentrated on fully, meaning any specific
            questions or misunderstandings they may have are not lost in the
            tumult of classroom dynamics.
          </li>
          <li>
            You or your child will increase in confidence, enjoyment, and
            motivation in the subject and develop personal discipline that can
            be applied to any subject.
          </li>
          <li>
            Our large staff of Teachers/mentors includes graduate and
            post-graduate professionals, high school teachers, and university
            faculty who teach in a wide range of subjects from elementary
            through college levels in a professional way with a personal touch,
            discovering the student’s strengths and challenges in learning. We
            are committed to helping students succeed in their education.
          </li>
        </ul>
      </div>

      {/* Card Section */}
      <div className="members-container">
        <h2>Meet Our Team</h2>
        <div className="members-grid">
          {members.map((member, index) => (
            <MemberCard
              key={index}
              image={member.image}
              name={member.name}
              role={member.role}
              description={member.description}
            />
          ))}
        </div>
      </div>

      {/* FAQS */}
      <div className="faqs-container">
        <h2>FAQs</h2>
        <div
          className={`accordion ${activeIndex === 0 ? "open" : ""}`}
          onClick={() => toggleAccordion(0)}
        >
          <div className="accordion-header">
            <h3>What is the duration of a typical tutoring session?</h3>
            <span
              className={`accordion-icon ${activeIndex === 0 ? "open" : ""}`}
            >
              +
            </span>
          </div>
          <div
            className={`accordion-content ${activeIndex === 0 ? "open" : ""}`}
          >
            <p>
              The duration of a typical tutoring session is usually one hour,
              but it can be adjusted based on the student’s needs and schedule.
            </p>
          </div>
        </div>
        <div
          className={`accordion ${activeIndex === 1 ? "open" : ""}`}
          onClick={() => toggleAccordion(1)}
        >
          <div className="accordion-header">
            <h3>How are tutors selected for each student?</h3>
            <span
              className={`accordion-icon ${activeIndex === 1 ? "open" : ""}`}
            >
              +
            </span>
          </div>
          <div
            className={`accordion-content ${activeIndex === 1 ? "open" : ""}`}
          >
            <p>
              Tutors are selected based on the student's learning profile,
              subject requirements, and the tutor's qualifications and
              experience.
            </p>
          </div>
        </div>
        <div
          className={`accordion ${activeIndex === 2 ? "open" : ""}`}
          onClick={() => toggleAccordion(2)}
        >
          <div className="accordion-header">
            <h3>Can I change my tutor if I am not satisfied?</h3>
            <span
              className={`accordion-icon ${activeIndex === 2 ? "open" : ""}`}
            >
              +
            </span>
          </div>
          <div
            className={`accordion-content ${activeIndex === 2 ? "open" : ""}`}
          >
            <p>
              Yes, you can request a change of tutor if you are not satisfied
              with the current one. We will work with you to find a more
              suitable match.
            </p>
          </div>
        </div>
        <div
          className={`accordion ${activeIndex === 3 ? "open" : ""}`}
          onClick={() => toggleAccordion(3)}
        >
          <div className="accordion-header">
            <h3>Are the tutoring sessions flexible?</h3>
            <span
              className={`accordion-icon ${activeIndex === 3 ? "open" : ""}`}
            >
              +
            </span>
          </div>
          <div
            className={`accordion-content ${activeIndex === 3 ? "open" : ""}`}
          >
            <p>
              Yes, tutoring sessions are flexible and can be scheduled at a time
              that works best for you or your child.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
