import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup, Badge, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoApp() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );
  const [input, setInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [selectedTodoText, setSelectedTodoText] = useState('');
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (input === '') return;
    const newTodo = { id: new Date().getTime(), text: input, isDone: false };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, text) => {
    setShowModal(true);
    setSelectedTodoId(id);
    setSelectedTodoText(text);
  };

  const handleSaveEdit = (id, newText) => {
    if (newText === '') return;
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
    setShowModal(false);
  };

  const handleToggleDone = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    );
  };

  const handleDeleteDoneTasks = () => {
    setTodos(todos.filter((todo) => !todo.isDone));
  };

  return (
    <Container className="my-5">
      <h1 className="thick-text h1-margin">To-do List</h1>
      <hr className="hr-thick" />
      <Form.Group className="d-flex justify-content-between align-items-center my-3">
        <Form.Control
          type="text"
          placeholder="Add a task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="primary" onClick={handleAddTodo}>
          Add Task
        </Button>
        <Button variant="danger" onClick={handleDeleteDoneTasks}>
          Clear Completed
        </Button>
      </Form.Group>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item
            key={todo.id}
            className="d-flex justify-content-between align-items-center"
          >
            <div style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
              <Badge pill bg="success" className="me-2">
                {todo.isDone ? 'Done' : 'Not Done'}
              </Badge>
              {todo.text}
            </div>
            <div>
              <Button
                variant="success"
                size="sm"
                onClick={() => handleEditTodo(todo.id, todo.text)}
                className="me-2"
              >
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleDeleteTodo(todo.id)}>
                Delete
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="ms-2"
                onClick={() => handleToggleDone(todo.id)}
              >
                {todo.isDone ? 'Undo' : 'Done'}
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Existing text:</Form.Label>
            <Form.Control type="text" value={selectedTodoText} readOnly />
            <Form.Label>New text:</Form.Label>
            <Form.Control
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveEdit(selectedTodoId, newTodoText)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TodoApp;