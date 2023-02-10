import React, { useState, useEffect } from 'react';
import { Table, Badge } from 'reactstrap';
import axios from "axios";
import { Button} from 'reactstrap';


function TaskList() {
    
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

const handleComplete = (id) => {
  axios.put(`http://localhost:8000/api/todo/${id}`, {
    status: 'completed'
  })
    .then(response => {
      setTasks(tasks.map(task => {
        if (task._id === id) {
          task.status = 'completed';
        }
        return task;
      }));
    })
    .catch(error => {
      console.error(error);
    });
};

const handleCancel = (id) => {
  axios.put(`http://localhost:8000/api/todo/${id}`, {
    status: 'cancelled'
  })
    .then(response => {
      setTasks(tasks.map(task => {
        if (task._id === id) {
          task.status = 'cancelled';
        }
        return task;
      }));
    })
    .catch(error => {
      console.error(error);
    });
};

const handleDelete = (id) => {
  axios.delete(`http://localhost:8000/api/todo/${id}`)
    .then(response => {
      setTasks(tasks.filter(task => task._id !== id));
    })
    .catch(error => {
      console.error(error);
    });
};

  return (
    <div>
    <Table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Status</th>
          <th>Actions</th>

        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task._id}>
            <td>{index + 1}. {task.title} ({task.priority}) [
                {task.status === 'completed' ? <i className="fa fa-check" /> : 'x'}
                {task.status === 'cancelled' ? <i className="fa fa-times" /> : "Completed"}
                ]</td>
            <td>
              {task.status === 'pending' && (
                <Badge color="secondary">Pending</Badge>
              )}
              {task.status === 'completed' && (
                <Badge color="success">
                  Completed <i className="fa fa-check"></i>
                </Badge>
              )}
              {task.status === 'cancelled' && (
                <Badge color="danger">
                  Cancelled <i className="fa fa-times"></i>
                </Badge>
              )}
              {task.status === 'deleted' && (
                <Badge color="warning">Deleted</Badge>
              )}
            </td>
            <td>
            &nbsp;<Button variant="success" size='sm' onClick={() => handleComplete(task._id)}>Complete</Button>
                &nbsp;<Button variant="danger" size='sm' onClick={() => handleCancel(task._id)}>Cancel</Button>
                &nbsp;<Button variant="danger" size='sm' onClick={() => handleDelete(task._id)}>Delete</Button>


            </td>
          </tr>
        ))}
      </tbody>
    </Table>

  </div>
         );
        }

export default TaskList;
