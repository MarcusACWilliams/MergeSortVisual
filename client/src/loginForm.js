import React from "react";
import Dropdown from "react-dropdown";

import './css/index.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',

    };

    this.retreiveUsers = this.retreiveUsers.bind(this);
  }

    retreiveUsers() {

        fetch('http://127.0.0.1:3000/users')
            .then(res => res.json() )
                .then(
                    (result) => { 
                        console.log("Returning Users!");
                        console.log(result[0].name);
                        let names = [];

                        result.forEach( (user) => { 
                            names.push(user.name);
                        });

                        console.log(names);

                        this.setState({
                            users: this.props.users.concat(names)
                        });
                    },
                    (error) => { 
                        console.log("Throwing error");   
                    }
                )
    };

  render() {
    return (
    <div>
        <Dropdown options={this.props.options} onChange={this.props.cb} value={this.props.options[0]} placeholder="Select a User" />
    </div>
    );
  }
}

export default LoginForm;