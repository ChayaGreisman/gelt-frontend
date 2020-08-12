import React from 'react';
import * as action from '../actionCreators'
import {connect, useStore} from 'react-redux'

class AccountsContainer extends React.Component{


    state={  
        user_id: this.props.currentUser.id,
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

    bankLogo=(account)=>{
        if (account.bank === 'Chase©️'){
            return <img src="./Chase.png" alt="chase-logo" className="bank-logo"/>
        }
        else if (account.bank === 'Wells Fargo©️'){
            return <img src="./WellsFargo.png" alt="wells-fargo-logo" className="bank-logo"/>
        }
        else if (account.bank === 'Bank of America©️'){
            return <img src="./BofA.png" alt="boa-logo" className="bank-logo"/>
        }
        else if (account.bank === 'Citibank©️'){
            return <img src="./Citibank.png" alt="citibank-logo" className="bank-logo"/>
        }
        else if (account.bank === 'TD Bank©️'){
            return <img src="./TD.png" alt="td-logo" className="bank-logo"/>
        }
    }
 
    

    render(){
        console.log(this.state)
        return (
            <React.Fragment>
            <button type="button" className="btn green-btn" data-toggle="modal" data-target="#newAccountModal">Sync Additional Account</button>
            {this.newAccountFormModal()}

            <div className="accounts">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {this.props.currentUser.accounts.map(account=> {
                            return(
                                <li className="nav-item">
                                    <a href={`#${account.id}`} className="nav-link account-tab-title" id={`${account.id}-${account.user_id}`} data-toggle="tab" role="tab" aria-controls={account.id} aria-selected="false">{this.bankLogo(account)}{account.name}</a>
                                </li>
                            ) 
                        }
                    )}
                </ul>

                <div className="tab-content" id="myTabContent">
                    {this.props.currentUser.accounts.map(account=> {
                            return(
                                <div className="tab-pane fade" id={account.id} role="tabpanel" aria-labelledBy={account.id}>
                                    <div className="account-details">
                                        <div className="account-detail">
                                        {this.bankLogo(account)} 
                                        </div>
                                        <div className="account-detail account-name">
                                        {account.name}
                                        </div>
                                        <div className="account-detail account-balance">
                                        BALANCE: ${account.balance}
                                        </div>  
                                    </div>
                                    <h3 className="transactions-title">TRANSACTIONS:</h3>
                                    <div className="transactions-list">
                                        
                                        <div className="transaction-row transaction-headers">
                                                <div>-----Date:</div>
                                                <div>Description:</div>
                                                <div>Amount:</div>
                                        </div>
                                        <hr></hr>
                                    {account.transactions.map(transaction=>{
                                        return (
                                        <div className="transaction-row">
                                            <div>{transaction.date}</div>
                                            <div>{transaction.description}</div>
                                            <div>{transaction.amount}</div>
                                        </div>
                                        )
                                    })}
                                    </div>
                                </div>
                            ) 
                        }
                    )}
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


  
