import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  ListGroup,
  Alert,
} from "react-bootstrap";
import axios from "axios"; // Import Axios
import "../styles/Journal.css"; // Import the CSS file

const Journal = () => {
  const [showModal, setShowModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
  });
  const [journalEntries, setJournalEntries] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch journal entries on component mount
  useEffect(() => {
    fetchJournalEntries();
  });

  const fetchJournalEntries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/journals"); // Use Axios for GET request
      setJournalEntries(response.data);
    } catch (err) {
      setError("Failed to fetch journal entries. Please try again.");
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setNewEntry({ title: "", content: "" });
    setError(null);
    setSuccess(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddEntry = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/journals",
        newEntry
      );
      setJournalEntries([...journalEntries, response.data]);
      setNewEntry({
        title: "",
        content: "",
      });
    } catch (error) {
      console.error("Error adding journal:", error);
    }
  };
  return (
    <Container className="journal-container">
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <Button variant="primary" size="lg" onClick={handleShow}>
            Start Writing
          </Button>
        </Col>
      </Row>

      {/* Modal for Writing Journal Entry */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Journal Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>} {/* Error Alert */}
          {success && <Alert variant="success">{success}</Alert>}{" "}
          {/* Success Alert */}
          <Form className="journal-form">
            <Form.Group controlId="journalTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={newEntry.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="journalContent" className="mt-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Write your thoughts here..."
                name="content"
                value={newEntry.content}
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="mt-3"
              onClick={handleAddEntry}
            >
              Save Entry
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Display Journal Entries */}
      <Row className="mt-5">
        <Col>
          <h3>Your Journal Entries</h3>
          {journalEntries.length === 0 ? (
            <p>No entries yet. Start writing!</p> // Message if no entries
          ) : (
            <ListGroup>
              {journalEntries.map((entry) => (
                <ListGroup.Item key={entry._id} className="journal-entry">
                  <h5>{entry.title}</h5>
                  <p>{entry.content}</p>
                  <small className="text-muted">
                    {new Date(entry.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                  </small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Journal;
