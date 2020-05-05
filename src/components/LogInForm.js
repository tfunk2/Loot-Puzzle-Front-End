import React from 'react'

export default function LogInForm(props) {
    

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ 
                    username: props.usernameState,
                    password: props.passwordState
            })
        }).then(response => response.json())
            .then(result => {
                console.log("login", result)
                localStorage.setItem("token", result.token);
                if (result.token) {
                    props.loginStatusUpdate("successful");
                    
                } else {
                    props.loginStatusUpdate("unsuccessful");
                }
            })
         
    }

    return (
        <div className="log-in-form-div">
            <form name="user" className="log-in-form" onSubmit={handleSubmit}>
                <input 
                    id={props.loginStatus === null ? "login-username-input" : ""  }
                    className={props.loginStatus === "unsuccessful" ? "input-invalid" : "login-input" }
                    type="text" 
                    name="username" 
                    value={props.usernameState} 
                    onChange={props.handleChange} 
                    placeholder="Username"
                />
                <input 
                    id={props.loginStatus === null ? "login-password-input" : ""  }
                    className={props.loginStatus === "unsuccessful" ? "input-invalid" : "login-input"}
                    type="text" 
                    name="password" 
                    value={props.passwordState} 
                    onChange={props.handleChange}
                    placeholder="Password"
                />
                <input type="submit" value="Log In"/>
            </form>
        </div>
    )
    
}