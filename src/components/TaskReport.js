import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem,Button } from 'reactstrap';
import axios from 'axios';
import { Link } from "react-router-dom";


function TaskReport() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8000/api/todo')
        .then(response => {
          setTasks(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

  const pendingTasks = tasks.filter((task) => task.status === 'pending');
  const cancelledTasks = tasks.filter((task) => task.status === 'cancelled');
  const completedTasks = tasks.filter((task) => task.status === 'completed');
  const deletedTasks = tasks.filter((task) => task.status === 'deleted');

  const sortedTasks = tasks.sort((a, b) => {
    if (a.status < b.status) return -1;
    if (a.status > b.status) return 1;
    return 0;
  });

  return (
    <div>
      <h3>Report of Tasks</h3>
      <ListGroup>
        <ListGroupItem>
          Pending Tasks: {pendingTasks.length}
        </ListGroupItem>
        <ListGroupItem>
          Cancelled Tasks: {cancelledTasks.length}
        </ListGroupItem>
        <ListGroupItem>
          Completed Tasks: {completedTasks.length}
        </ListGroupItem>
        <ListGroupItem>
          Deleted Tasks: {deletedTasks.length}
        </ListGroupItem>
      </ListGroup>
      <h3>Sorted Tasks List</h3>
      <ListGroup>
        {sortedTasks.map((task) => (
          <ListGroupItem key={task.id}>
            {task.title} ({task.status})
          </ListGroupItem>
        ))}
      </ListGroup>

    </div>
  );
}

export default TaskReport;
