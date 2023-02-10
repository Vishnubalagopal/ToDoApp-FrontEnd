import { BrowserRouter,Route,Routes } from 'react-router-dom';
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import TaskReport from './components/TaskReport';

function App() {
  return (
    
    <div className="App">
            <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">TODO LIST</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/report-todo">Task Report</Nav.Link>
            <Nav.Link href="/create-todo">Add Task</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
<br></br><br></br>
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<TaskList/>} />
        <Route path="/create-todo" element={<AddTaskForm/>} />
        <Route path="/report-todo" element={<TaskReport/>} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
