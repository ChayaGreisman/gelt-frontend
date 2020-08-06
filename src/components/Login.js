import React from 'react';
import * as action from '../actionCreators'
import {connect, useStore} from 'react-redux'

const Login = (props) => {
    return (
        <React.Fragment>

        <div className="login-logo">  
        <img src='./plain-logo.png' alt="logo"/>
        </div> 
        <div className='start-forms'>
            <div className="login">
                <h1>LOGIN</h1>
                <form className="login-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password"/>
                    </div>
                    <button type="submit" className="btn login-btn">Login</button>
                </form>
            </div>

            <div className="vertical-line"></div>

            <div className="create-account">
            <h1>CREATE ACCOUNT</h1>
                <form className="create-account-form" >
                    <div className="form-group">
                        <label >Name</label>
                        <input type="text" className="form-control" placeholder="Enter name"/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input  type="email" className="form-control"  placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input  type="password" className="form-control" placeholder="Password"/>
                    </div>
                    <div className="form-group">
                        <label>DOB</label>
                        <input type="date" className="form-control" />
                    </div>
                    <button type="submit" className="btn create-account-btn">Create Account</button>
                </form>
            </div>
        </div>
        </React.Fragment>
    );
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