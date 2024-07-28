import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function PerfectTutor() {
  return (
    <>
      <h1>Why Perfect Tutor</h1>

      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="../assets/home/perfectTutor/one.png" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="../assets/home/perfectTutor/personal.png"
        />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="../assets/home/perfectTutor/flexible.png"
        />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>

      <h2>
        When you choose Perfect Tutor, you can be confident for investing in the
        most reliable tutoring services available in your area
      </h2>

      <Button variant="primary">Know more..</Button>


      {/* testimonials */}
    <h1>Testimonials</h1>

      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="../assets/home/perfectTutor/student2.png" />
      <Card.Body>
        <Card.Title>Ayush Bajwan</Card.Title>
        <Card.Text>
        Thank you for your dedication and support. Your guidance and encouragement have made a significant impact on my learning journey. I appreciate the time and effort you invest in helping us understand and excel. Your passion for teaching truly inspires me. Thank you for being an exceptional teacher!
        </Card.Text>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="../assets/home/perfectTutor/student2.png" />
      <Card.Body>
        <Card.Title>Anuj Srivastav</Card.Title>
        <Card.Text>
        Thank you for your dedication and support. Your guidance and encouragement have made a significant impact on my learning journey. I appreciate the time and effort you invest in helping us understand and excel. Your passion for teaching truly inspires me. Thank you for being an exceptional teacher!
        </Card.Text>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="../assets/home/perfectTutor/teacher2.png" />
      <Card.Body>
        <Card.Title>Prena Rana</Card.Title>
        <Card.Text>
        Thank you for your dedication and support. Your guidance and encouragement have made a significant impact on my learning journey. I appreciate the time and effort you invest in helping us understand and excel. Your passion for teaching truly inspires me. Thank you for being an exceptional teacher!
        </Card.Text>
      </Card.Body>
    </Card>
    </>
  );
}

export default PerfectTutor;
