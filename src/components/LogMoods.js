import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  setMoodCount,
  fetchImpactsData,
} from "../redux/actions"; // Ensure this path is correct
import {
  Form,
  Button,
  Table,
  Container,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import Select from "react-select";
import "../styles/LogMoods.css"; // Import the CSS file

// Move feelingsDescriptions outside the component to prevent re-creation on each render
const feelingsDescriptions = {
  "Very Unpleasant": [
    "Anxious",
    "Depressed",
    "Overwhelmed",
    "Frustrated",
    "Sad",
    "Angry",
    "Desperate",
    "Numb",
    "Disgusted",
    "Hopeless",
  ],
  Unpleasant: [
    "Irritated",
    "Lonely",
    "Stressed",
    "Tired",
    "Bored",
    "Disappointed",
    "Resentful",
    "Exhausted",
    "Apprehensive",
    "Uneasy",
  ],
  "Slightly Unpleasant": [
    "Concerned",
    "Restless",
    "Indifferent",
    "Unsettled",
    "Worried",
    "Distracted",
    "Slightly Uneasy",
    "Discontented",
    "Frustrated",
    "Mildly Displeased",
  ],
  Neutral: [
    "Calm",
    "Content",
    "Relaxed",
    "Balanced",
    "Peaceful",
    "Indifferent",
    "Uninvolved",
    "Neutral",
    "Unemotional",
    "Unfazed",
  ],
  "Slightly Pleasant": [
    "Hopeful",
    "Satisfied",
    "Interested",
    "Curious",
    "Motivated",
    "Encouraged",
    "Optimistic",
    "Engaged",
    "Pleased",
    "Intrigued",
  ],
  Pleasant: [
    "Joyful",
    "Excited",
    "Cheerful",
    "Optimistic",
    "Grateful",
    "Proud",
    "Inspired",
    "Relaxed",
    "Energized",
    "Content",
  ],
  "Very Pleasant": [
    "Elated",
    "Ecstatic",
    "Thrilled",
    "Euphoric",
    "Blissful",
    "Radiant",
    "Exuberant",
    "Overjoyed",
    "Invincible",
    "Serene",
  ],
};

function LogMoods() {
  const [moods, setMoods] = useState([]);
  const [newMood, setNewMood] = useState({
    feeling: "",
    description: [],
    impact: "",
    optionalDescription: "",
  });
  const [descriptionOptions, setDescriptionOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [impacts, setImpacts] = useState([]);
  const [error, setError] = useState(null);
  const [editingMoodId, setEditingMoodId] = useState(null); // State to track the mood being edited
  const [timeFilter, setTimeFilter] = useState("all"); // State for time filter

  const dispatch = useDispatch();
  const moodCount = useSelector((state) => state.counter.moodCount);

  const API_BASE_URL = useMemo(
    () => process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api",
    []
  );

  useEffect(() => {
    const loadImpacts = async () => {
      try {
        const impactsData = await dispatch(fetchImpactsData()).unwrap();
        setImpacts(impactsData);
      } catch (error) {
        console.error("Error loading impacts:", error);
        setError("Failed to load impacts.");
      }
    };
    const loadMoods = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/moods`);
        const allMoods = response.data;
        setMoods(allMoods);
        dispatch(setMoodCount(allMoods.length));
      } catch (error) {
        console.error("Error loading moods:", error);
        setError("Failed to load moods.");
      } finally {
        setIsLoading(false);
      }
    };
    loadImpacts();
    loadMoods();
  }, [dispatch, API_BASE_URL]);

  const filterMoods = (moods, filter) => {
    const now = new Date();
    let filteredMoods = [...moods];

    if (filter === "lastHour") {
      filteredMoods = filteredMoods.filter(
        (mood) => new Date(mood.date) >= new Date(now - 60 * 60 * 1000) // 1 hour ago
      );
    } else if (filter === "last24Hours") {
      filteredMoods = filteredMoods.filter(
        (mood) => new Date(mood.date) >= new Date(now - 24 * 60 * 60 * 1000) // 24 hours ago
      );
    } else if (filter === "lastWeek") {
      filteredMoods = filteredMoods.filter(
        (mood) => new Date(mood.date) >= new Date(now - 7 * 24 * 60 * 60 * 1000) // 1 week ago
      );
    }

    return filteredMoods;
  };

  const handleChange = useCallback((e) => {
    const { name, value, options } = e.target;
    if (name === "description") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setNewMood((prevMood) => ({
        ...prevMood,
        description: selectedOptions,
      }));
    } else if (name === "feeling") {
      setNewMood((prevMood) => ({
        ...prevMood,
        feeling: value,
        description: [],
      }));
      setDescriptionOptions(feelingsDescriptions[value] || []);
    } else {
      setNewMood((prevMood) => ({ ...prevMood, [name]: value }));
    }
  }, []);

  const handleDescriptionChange = useCallback((selectedOptions) => {
    const descriptions = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setNewMood((prevMood) => ({ ...prevMood, description: descriptions }));
  }, []);

  const handleAddMood = useCallback(async () => {
    if (
      !newMood.feeling ||
      newMood.description.length === 0 ||
      !newMood.impact
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      let response;
      if (editingMoodId) {
        // Update mood if editing
        response = await axios.put(
          `${API_BASE_URL}/moods/${editingMoodId}`,
          newMood
        );
      } else {
        // Add new mood if not editing
        response = await axios.post(`${API_BASE_URL}/moods`, newMood);
        dispatch(increment());
      }
      const updatedMoods = editingMoodId
        ? moods.map((mood) =>
            mood._id === editingMoodId ? response.data : mood
          )
        : [...moods, response.data];
      setMoods(updatedMoods);
      resetForm();
      setError(
        editingMoodId
          ? "Mood log updated successfully!"
          : "Mood log added successfully!"
      );
    } catch (error) {
      console.error("Error adding/updating mood:", error);
      setError("Failed to add/update mood log. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [newMood, dispatch, API_BASE_URL, editingMoodId, moods]);

  const resetForm = () => {
    setNewMood({
      feeling: "",
      description: [],
      impact: "",
      optionalDescription: "",
    });
    setEditingMoodId(null); // Reset editing mood id
    setDescriptionOptions([]);
  };

  const handleEditMood = (mood) => {
    setNewMood({
      feeling: mood.feeling,
      description: mood.description,
      impact: mood.impact,
      optionalDescription: mood.optionalDescription || "",
    });
    setEditingMoodId(mood._id); // Set the ID of the mood being edited
  };

  const handleDeleteMood = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/moods/${id}`);
      setMoods((prevMoods) => prevMoods.filter((mood) => mood._id !== id));
      setError("Mood log deleted successfully!");
      dispatch(decrement());
    } catch (error) {
      console.error("Error deleting mood:", error);
      setError("Failed to delete mood log. Please try again.");
    }
  };

  useEffect(() => {
    console.log("Current moods state:", moods);
  }, [moods]);

  const filteredMoods = filterMoods(moods, timeFilter);

  return (
    <Container className="mood-tracker-container">
      <h2 className="text-center mb-4">Mood Tracker</h2>
      <h2>Total Moods: {moodCount}</h2>
      {error && (
        <Alert
          variant={error.includes("successfully") ? "success" : "danger"}
          onClose={() => setError(null)}
          dismissible
        >
          {error}
        </Alert>
      )}
      <Form className="mood-form">
        <Form.Group controlId="feelingSelect">
          <Form.Label>Feeling</Form.Label>
          <Form.Control
            as="select"
            name="feeling"
            value={newMood.feeling}
            onChange={handleChange}
          >
            <option value="">Select Feeling</option>
            <option>Very Unpleasant</option>
            <option>Unpleasant</option>
            <option>Slightly Unpleasant</option>
            <option>Neutral</option>
            <option>Slightly Pleasant</option>
            <option>Pleasant</option>
            <option>Very Pleasant</option>
          </Form.Control>
        </Form.Group>

        {descriptionOptions.length > 0 && (
          <Form.Group controlId="descriptionSelect">
            <Form.Label>
              What best describes this feeling? (Select all that apply)
            </Form.Label>
            <Select
              isMulti
              name="description"
              options={descriptionOptions.map((desc) => ({
                value: desc,
                label: desc,
              }))}
              className="basic-multi-select"
              classNamePrefix="select"
              value={newMood.description.map((desc) => ({
                value: desc,
                label: desc,
              }))}
              onChange={handleDescriptionChange}
              placeholder="Select descriptions..."
            />
          </Form.Group>
        )}

        <Form.Group controlId="impactSelect">
          <Form.Label>What's having the biggest impact on you?</Form.Label>
          <Form.Control
            as="select"
            name="impact"
            value={newMood.impact}
            onChange={handleChange}
          >
            <option value="">Select Impact</option>
            {impacts.map((impact) => (
              <option key={impact} value={impact}>
                {impact}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="optionalDescription">
          <Form.Label>Optional Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="optionalDescription"
            value={newMood.optionalDescription}
            onChange={handleChange}
          />
        </Form.Group>
        <br></br>
        <Button variant="primary" onClick={handleAddMood} disabled={isLoading}>
          {editingMoodId ? "Update Mood" : "Add Mood"}
        </Button>
      </Form>
      <Form.Group controlId="timeFilter">
        <Form.Label>Filter Moods By Time</Form.Label>
        <Form.Control
          as="select"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="lastHour">Last 1 Hour</option>
          <option value="last24Hours">Last 24 Hours</option>
          <option value="lastWeek">Last 1 Week</option>
        </Form.Control>
      </Form.Group>
      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Feeling</th>
              <th>Description</th>
              <th>Impact</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMoods.map((mood) => (
              <tr key={mood._id}>
                <td>{mood.feeling}</td>
                <td>{mood.description.join(", ")}</td>
                <td>{mood.impact}</td>
                <td>{mood.optionalDescription}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleEditMood(mood)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="primary"
                    onClick={() => handleDeleteMood(mood._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default LogMoods;
