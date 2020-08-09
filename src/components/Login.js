import React from 'react';
import * as action from '../actionCreators'
import {connect, useStore} from 'react-redux'

class Login extends React.Component {

    state = {
        newUser: {
            name: '',
            password: '',
            email: '',
            dob: ''
        },
        login: {
            email: '',
            password: ''
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/users')
        .then(r=>r.json())
        .then(users=>this.props.fetchUsers(users))
    }

    handleLoginChange=(e)=>{
        this.setState({login: {...this.state.login, [e.target.name]: e.target.value}})
    }

    handleLoginSubmit = (e) => {
        e.preventDefault()
        let user = this.props.users.find(user=> user.email === this.state.login.email)
        if (user){
           if (user.password === this.state.login.password){
                this.props.setUser(user)
                this.props.history.push(`/${user.name.replace(/\s+/g, '')}`)
                localStorage.user_id = user.id
                console.log(this.props.currentUser)
                console.log(localStorage.user_id)  
           } else {
                alert("Incorrect Password!")
           }     
        } else {
         alert("User Email Not Found")   
        }
        this.setState({login: {email: '', password: '' }})                        
    }

    handleCreateAccountChange=(e)=>{
        this.setState({newUser: {...this.state.newUser, [e.target.name]: e.target.value}})
    }

    toTitleCase= (str)=>{
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    handleAccountSubmit=(e)=>{
        e.preventDefault()
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.toTitleCase(this.state.newUser.name),
                password: this.state.newUser.password,
                email: this.state.newUser.email,
                dob: this.state.newUser.dob
            
            })
        })
        .then(r=>r.json())
        .then(newUser=>{
            this.props.setUser(newUser)
            this.props.history.push(`/${newUser.name.replace(/\s+/g, '')}`)
            this.setState({newUser: {name: '', password: '', email: '', dob: ''}})
            localStorage.user_id = newUser.id
            console.log(this.props.currentUser) 
        })
    }

    render(){

        return (
            <React.Fragment>

            <div className="login-logo">  
            <img src='./plain-logo.png' alt="logo"/>
            </div> 
            <div className='start-forms'>
                <div className="login">
                    <h1>LOGIN</h1>
                    <hr></hr>
                    <form className="login-form" onSubmit={this.handleLoginSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" onChange={this.handleLoginChange} value={this.state.login.email} type="email" className="form-control" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" onChange={this.handleLoginChange} value={this.state.login.password} type="password" className="form-control" placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn login-btn">Login</button>
                    </form>
                </div>

                <div className="vertical-line"></div>

                <div className="create-account">
                <h1>CREATE ACCOUNT</h1>
                <hr></hr>
                    <form className="create-account-form" onSubmit={this.handleAccountSubmit}>
                        <div className="form-group">
                            <label >Name</label>
                            <input name="name" value={this.state.newUser.name} onChange={this.handleCreateAccountChange} type="text" className="form-control" placeholder="Enter name"/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input name="email" value={this.state.newUser.email} onChange={this.handleCreateAccountChange} type="email" className="form-control"  placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" value={this.state.newUser.password} onChange={this.handleCreateAccountChange} type="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label>DOB</label>
                            <input name="dob" value={this.state.newUser.dob} onChange={this.handleCreateAccountChange} type="date" className="form-control" />
                        </div>
                        <button type="submit" className="btn create-account-btn">Create Account</button>
                    </form>
                </div>
            </div>
            </React.Fragment>
        )
    }

  }

const mapStateToProps=(state)=> {
    return  {
    users: state.users,
    currentUser: state.currentUser
    }
} 

const mapDispatchToProps=(dispatch)=>{
    return {
    fetchUsers: (users)=>dispatch(action.fetchUsers(users)),
    setUser: (user)=>dispatch(action.setUser(user))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);