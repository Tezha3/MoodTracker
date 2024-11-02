import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../styles/LandingPage.css"; // Importing CSS from styles folder

function LandingPage() {
  return (
    <div className="landing-page">
      <Container className="text-center text-white">
        <h1 className="mt-3">Track Your Daily Moods</h1>
        <p>Understand your emotional patterns with ease.</p>
      </Container>

      {/* Features section with background */}
      <div className="features-section features-bg">
        <Container>
          <Row className="landing-cards mt-1">
            <Col md={4} className="mb-1">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Easy Mood Logging</Card.Title>
                  <Card.Text>
                    Quickly add your daily moods with intuitive selections and
                    detailed notes.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-1">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Insightful Analytics</Card.Title>
                  <Card.Text>
                    Visualize your mood trends with interactive charts and gain
                    deeper understanding.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-1">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Personalized Reminders</Card.Title>
                  <Card.Text>
                    Stay consistent with gentle reminders to log your moods
                    every day.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default LandingPage;
