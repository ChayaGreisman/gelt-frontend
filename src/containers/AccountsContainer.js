import React from 'react';
import * as action from '../actionCreators'
import {connect, useStore} from 'react-redux'

class AccountsContainer extends React.Component{


    state={  
        name: '',
        acct_type: '',
        acct_number: '',
        routing_number: '',
        bank: 'Chase©️',
        balance: ''  
    }

    resetState = () => {
        this.setState({ 
            user_id: this.props.currentUser.id,
            name: '',
            acct_type: '',
            acct_number: '',
            routing_number: '',
            bank: 'Chase©️',
            balance: ''   
        })
    }

    // state={
    //     newAccount: {
    //         name: '',
    //         type: '',
    //         acct_number: '',
    //         routing_number: '',
    //         bank: '',
    //         balance: ''
    //     },
        
    // }

    // handleAccountChange = (e) => {
    //     this.setState({newAccount: {...this.state.newAccount, [e.target.name]: e.target.value}})
    // }

    // handleAccountChange = (e) => { 
    //     this.setState(prevState => ({newAccount: {...prevState.newAccount, [e.target.name]: e.target.value}}))
    // }

    handleAccountChange = (e) => { 
     this.setState({[e.target.name]: e.target.value})
    }

    toTitleCase= (str)=>{
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    handleClickSubmitAccount = () => {
        console.log('hit fetch')
            fetch('http://localhost:3000/accounts', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    name: this.toTitleCase(this.state.name),
                    acct_type: this.toTitleCase(this.state.acct_type),
                    acct_number: this.state.acct_number,
                    routing_number: this.state.routing_number,
                    bank: this.state.bank,
                    balance: parseFloat(this.state.balance)               
                })
            })
            .then(r=>r.json())
            .then(newAccount=>{
                this.props.handleNewAccount(newAccount)
                this.resetState()
            })
    }


    newAccountForm=()=>{
        return (
            <form>
            <div className="form-group">
                <label>Account Name</label>
                <input onChange={this.handleAccountChange} name="name" value={this.state.name} type="text" className="form-control new-account-input" placeholder="i.e. 'Chase Total Checkings'"/>
            </div>
            <div className="form-group">
                <label>Account Type</label>
                <input onChange={this.handleAccountChange}  name="acct_type" value={this.state.acct_type} type="text" className="form-control new-account-input" placeholder="Account Type"/>
            </div>
            <div className="form-group">
            <label>Bank</label>
                <select onChange={this.handleAccountChange} name="bank" value={this.state.bank} className="form-control new-account-input">
                    <option value="Chase©️">Chase©️</option>
                    <option value="Wells Fargo©️">Wells Fargo©️</option>
                    <option value="Bank of America©️">Bank of America©️</option>
                    <option value="Citibank©️">Citibank©️</option>
                    <option value="TD Bank©️">TD Bank©️</option>
                </select>
            </div>
            <div className="form-group">
                <label>Account Number</label>
                <input onChange={this.handleAccountChange} name="acct_number" value={this.state.acct_number} type="text" className="form-control new-account-input" placeholder="Account Number"/>
            </div>
            <div className="form-group">
                <label>Routing Number</label>
                <input onChange={this.handleAccountChange} name="routing_number" value={this.state.routing_number} type="text" className="form-control new-account-input" placeholder="Routing Number"/>
            </div>
            <div className="form-group">
                <label>Current Balance</label>
                <input onChange={this.handleAccountChange} name="balance" value={this.state.balance} type="number" min="0.00" step="0.01" className="form-control new-account-input" placeholder="00.00"/>
            </div>

            </form>
        )
    }

    newAccountFormModal=()=>{
        return (

            <div className="modal fade" id="newAccountModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Sync Account</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.resetState}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {this.newAccountForm()}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn cancel-btn" data-dismiss="modal" onClick={this.resetState}>Cancel</button>
                    <button type="button" className="btn green-btn" data-dismiss="modal" onClick={this.handleClickSubmitAccount}>Add Account</button>
                </div>
                </div>
            </div>
            </div>

        )

    }
 
    

    render(){
        console.log(this.state)
        return (
            <React.Fragment>
            <button type="button" className="btn green-btn" data-toggle="modal" data-target="#newAccountModal">Sync Additional Account</button>
            {this.newAccountFormModal()}
            <div className="accounts">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Account 1</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Account 2</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Account 3</a>
                </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledBy="home-tab">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledBy="profile-tab">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledBy="contact-tab">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps=(state)=> {
    return  {  
    currentUser: state.currentUser
    }
} 

const mapDispatchToProps=(dispatch)=>{
    return {
    handleNewAccount: (newAccount)=>dispatch(action.handleNewAccount(newAccount)),    
    setUser: (user)=>dispatch(action.setUser(user))
    }
}  

export default connect(mapStateToProps, mapDispatchToProps)(AccountsContainer);


  
