import React, {Component} from 'react';

class Todo extends Component {
    constructor(){
        super();
        this.state = {
            tasks: [{task:'check mails', id: 1}, {task: 'Read Articles', id: 2},{task: 'Complete Hw', id : 3}],
            currTask: ''
        }
    }

    render(){
        return (
            <ul>
                <input type= "text"/>
                <button>Submit</button>
                {
                    this.state.tasks.map((taskObj) => (
                        <li key = {taskObj.id}>
                            <p>{taskObj.task}</p>
                            <button>Delete</button>
                        </li>
                    ))
                }
            </ul>
        );
    }
}

export default Todo;