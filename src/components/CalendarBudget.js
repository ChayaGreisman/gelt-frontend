import React from 'react';
import * as action from '../actionCreators'
import {connect, useStore} from 'react-redux'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';



class CalendarBudget extends React.Component{

    state = {
        dateSelected: new Date().toString().substring(0,16),
        isoDate: new Date().toISOString().substring(0, 10),

        description: '',
        amount: '',
        categoryId: this.props.currentUser.categories[0].id,
        accountId: this.props.currentUser.accounts[0].id

    }

    resetNewTransactionForm = () => {
        this.setState({        
            description: '',
            amount: '',
            categoryId: this.props.currentUser.categories[0].id,
            accountId: this.props.currentUser.accounts[0].id
        })
    }

    handleDateChoice = (value, event) => {
        const date = value.toISOString().substring(0, 10)
        this.setState({isoDate: date})
        this.setState({dateSelected: value.toString().substring(0,16)})
    }

    transactionsByDate = () =>{
        let transactions = []
        this.props.currentUser.accounts.forEach(account => {
            account.transactions.forEach(transaction=>{
                if (transaction.date === this.state.isoDate){
                    transactions.push(transaction)
                }
            })
        });
        return transactions
    }

    handleTransactionChange = (e) => { 
        this.setState({[e.target.name]: e.target.value})
    }

    newTransactionForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label>Description</label>
                    <input onChange={this.handleTransactionChange} name="description" value={this.state.description} type="text" className="form-control" placeholder="Transaction/Expense Description"/>
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input onChange={this.handleTransactionChange}  name="amount" value={this.state.amount} type="number" min="0.00" step="0.01" className="form-control" placeholder="00.00"/>
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select onChange={this.handleTransactionChange} name="categoryId" value = {this.state.categoryId} className="form-control" id="selectCategory">
                        {this.props.currentUser.categories.map(category=> <option value={category.id}>{category.name}</option>)}                     
                    </select>
                </div>
                <div className="form-group">
                    <label>Account:</label>
                    <select onChange={this.handleTransactionChange} name="accountId" value = {this.state.accountId} className="form-control" id="selectAccount">
                        {this.props.currentUser.accounts.map(account=> <option value={account.id}>{account.bank}-{account.name}</option>)}                     
                    </select>
                </div>
            </form>
        )
    }

    newTransactionModal = () => {
       return (
            <div className="modal fade" id="newTransactionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel"> ✎ Transaction Date: {this.state.dateSelected}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.resetNewTransactionForm}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {this.newTransactionForm()}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn cancel-btn" data-dismiss="modal" onClick={this.resetNewTransactionForm}>Cancel</button>
                    
                    <button type="button" className="btn green-btn" data-dismiss="modal" onClick={this.createTransaction}>Record Transaction</button>
                </div>
                </div>
            </div>
            </div> 
       )
    }

    createTransaction = () => {
    

        fetch('http://localhost:3000/transactions', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: this.state.isoDate,
                description: this.state.description,
                amount: parseFloat(-this.state.amount),
                category_id: parseInt(this.state.categoryId),
                account_id: parseInt(this.state.accountId)              
            })
        })
        .then(r=>r.json())
        .then(newTransaction=>{
            this.props.handleNewTransaction(newTransaction)
            this.resetNewTransactionForm()
        })


    }


    render(){
        console.log('TEST:',this.state)
        return(
            <React.Fragment>
            {this.newTransactionModal()}
            <div className="calendar-budget-box">
                <div>
                    <h1>SPENDING BY DATE</h1>
                    <Calendar onClickDay={this.handleDateChoice}/>
                </div>
                <div>
                    <img src="./spiral.png" alt='spiral-notebook' className="spiral"/>
                    <div className="chosen-date-box">
                        <h2>{this.state.dateSelected}</h2>
                            {this.transactionsByDate().length !== 0
                            ? this.transactionsByDate().map(transaction=><h5>{transaction.description}  {transaction.amount}</h5>)
                            : <div><h5>* No Recorded Spending for {this.state.dateSelected} *</h5><br></br><br></br></div>}
                        <br></br>    
                        <div className="add-transaction-btn">
                        <button type="button" className="btn" data-toggle="modal" data-target="#newTransactionModal"> ✎ Record Spending</button>
                        </div>
                    </div>
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
    handleNewTransaction: (newTransaction)=>dispatch(action.handleNewTransaction(newTransaction)), 
    }
}  

export default connect(mapStateToProps, mapDispatchToProps)(CalendarBudget);
