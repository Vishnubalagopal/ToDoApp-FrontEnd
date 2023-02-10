import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from "axios";


function AddTaskForm() {
//   const [taskName, setTaskName] = useState('');
//   const [priority, setPriority] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Task Name:', taskName);
//     console.log('Priority:', priority);
//     setTaskName('');
//     setPriority('');
//   };
const [data, setData] = useState({ title: "",priority:"" });

function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
}

function handleSubmit(e) {
    e.preventDefault();

    const todo = {
        title: data.title,
        priority:data.priority
    };

    console.log({ todo });
    axios
        .post("http://localhost:8000/api/todo", data)
        .then((res) => {
            setData({ title: "",priority:""});
            console.log(res.data.message);
        })
        .catch((err) => {
            console.log("Error couldn't create TODO");
            console.log(err.message);
        });
}

  return (
    <div>

    <Form 
        onSubmit={handleSubmit}
        noValidate
    >
      <FormGroup>
        <Label for="taskName">Task Name</Label>
        <Input
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange}
          className="input"
        />
      </FormGroup>
      <FormGroup>
        <Label for="priority">Priority</Label>
        <Input
          type="select"
            name="priority"
            value={data.priority}
            onChange={handleChange}
            className="input"
        >
          <option value="">Select Priority</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </Input>
      </FormGroup>
      <Button color='danger' type="submit" className="button">Add Task</Button>
    </Form>

    </div>
  );
}

export default AddTaskForm;
