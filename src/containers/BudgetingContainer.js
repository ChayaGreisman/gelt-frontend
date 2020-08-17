import React from 'react';
import * as action from '../actionCreators'
import {connect, useStore} from 'react-redux'
import { Doughnut, Bar } from 'react-chartjs-2';

import CalendarBudget from '../components/CalendarBudget';


class BudgetingContainer extends React.Component{


    state = {
        user_id: this.props.currentUser.id,
        name: '',
        budgeted_amount: '',

        editCategoryId: '',
        editBudget: '',

    }

    resetState = () => {
        this.setState({
            user_id: this.props.currentUser.id,
            name: '',
            budgeted_amount: '',
           
            editCategoryId: '',
            editBudget: '',
        })
    }

    handleCategoryChange = (e) => { 
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

    handleClickSubmitCategory = () => {
        fetch('http://localhost:3000/categories', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.state.user_id,
                name: this.toTitleCase(this.state.name),
                budgeted_amount: parseFloat(this.state.budgeted_amount)               
            })
        })
        .then(r=>r.json())
        .then(newCategory=>{
            this.props.handleNewCategory(newCategory)
            this.resetState()
        })
    }

    newCategoryForm=()=>{
        return (
            <form>
            <div className="form-group">
                <label>Category</label>
                <input onChange={this.handleCategoryChange} name="name" value={this.state.name} type="text" className="form-control" placeholder="Category Name"/>
            </div>
            <div className="form-group">
                <label>Budgeted Amount</label>
                <input onChange={this.handleCategoryChange}  name="budgeted_amount" value={this.state.budgeted_amount} type="number" min="0.00" step="0.01" className="form-control" placeholder="00.00"/>
            </div>
            </form>
        )
    }

    newCategoryModal=()=>{
        return (

            <div className="modal fade" id="newCategoryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add Spending Category</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.resetState}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {this.newCategoryForm()}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn cancel-btn" data-dismiss="modal" onClick={this.resetState}>Cancel</button>
                    <button type="button" className="btn green-btn" data-dismiss="modal" onClick={this.handleClickSubmitCategory}>Add Category</button>
                </div>
                </div>
            </div>
            </div>

        )

    }

    editCategoryForm=()=>{
        return (
            <form>
            <div className="form-group">
                <label>New Budgeted Amount</label>
                <input onChange={this.handleCategoryChange}  name="editBudget" value={this.state.editBudget} type="number" min="0.00" step="0.01" className="form-control" placeholder="00.00"/>
            </div>
            </form>
        )
    }

    editCategoryModal=()=>{
        return (

            <div className="modal fade" id="editCategoryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{this.state.editName}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.resetState}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {this.editCategoryForm()}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn cancel-btn" data-dismiss="modal" onClick={this.resetState}>Cancel</button>
                    <button type="button" className="btn delete-btn" data-dismiss="modal" onClick={this.deleteCategory}>Delete Category</button>
                    <button type="button" className="btn green-btn" data-dismiss="modal" onClick={this.editCategory}>Save Changes</button>
                </div>
                </div>
            </div>
            </div>

        )

    }

    deleteCategory = () => {
        fetch(`http://localhost:3000/categories/${this.state.editCategoryId}`, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(r=>r.json())
        .then(() => {
            this.props.handleDeleteCategory(parseInt(this.state.editCategoryId))
            this.resetState()
        })
        
    }

    editCategory = () => {
        fetch(`http://localhost:3000/categories/${this.state.editCategoryId}`, {
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                budgeted_amount: parseFloat(this.state.editBudget)
            })
        })
        .then(r=>r.json())
        .then((editedCategory) => {
            this.props.handleEditedCategory(editedCategory)
            console.log('editedCtegory:', editedCategory,  'with edited:', this.props.currentUser.categories)
            this.resetState()
        })
    }


    categorySpendingTotal = (category) => {
        let currentMonth = new Date().toISOString().substring(0,7)
        let currentMonthTransactions = category.transactions.filter(transaction => transaction.date.includes(currentMonth))
        let total = 0
        currentMonthTransactions.forEach(transaction=>
            total += transaction.amount
        )
        // let roundedTwoDecimalDigits = total.toFixed(2)
        let roundedTwoDecimalDigits = Math.round(total * 100) / 100
        return Math.abs(roundedTwoDecimalDigits)
    }

    handleEditButtonClick = (e) => {
        let categoryId = e.target.id
        this.setState({editCategoryId: categoryId})
        let cat = this.props.currentUser.categories.find(category => category.id == categoryId)
        this.setState({editName: cat.name, editBudget: cat.budget})

    }

    

    render(){

        let colors = ['rgb(23, 80, 26)', '#b9bccc', 'rgb(161, 172, 217)', 'rgb(126, 217, 87)', 'rgb(92, 177, 56)', 'rgb(159, 223, 132)', 'rgb(50, 129, 16)', 'rgb(176, 182, 207)', 'rgb(62, 45, 94)', 'rgb(161, 133, 212)']

        let data = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: []
            }]
        }
        data.labels = this.props.currentUser.categories.map(category=>(`${category.name}`))
        data.datasets[0].data = this.props.currentUser.categories.map(category=>(category.budgeted_amount))
        
        data.datasets[0].backgroundColor = this.props.currentUser.categories.map(category=>(colors[Math.floor(Math.random() * colors.length)]))
        // data.datasets[0].backgroundColor = this.props.currentUser.categories.map(category=>('#' + Math.floor(Math.random()*16777215).toString(16)))

        


        let options={
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: false,
            },
            type:'bar',
            // scales: {
            //     xAxes: [{
            //         stacked: true
            //     }],
            //     yAxes: [{
            //         stacked: true
            //     }]
            // }
        }

        let barData = {
            labels: [],
            datasets: [
              {
                label: 'Budget',
                backgroundColor: 'rgb(161, 172, 217)',
                borderColor: 'rgb(161, 172, 217)',
                borderWidth: 1,
                // stack: 1,
                hoverBackgroundColor: 'rgb(132, 149, 214)',
                hoverBorderColor: 'black',
                data: []
              },
              {
                label: 'Actual',
                backgroundColor: 'rgb(30, 30, 75)',
                borderColor: 'rgb(30, 30, 75)',
                borderWidth: 1,
                // stack: 1,
                hoverBackgroundColor: 'rgb(18, 18, 61)',
                hoverBorderColor: 'black',
                data: []
              }
            ]
        }

        barData.labels = this.props.currentUser.categories.map(category=>(`${category.name}`))
        barData.datasets[0].data = this.props.currentUser.categories.map(category=>parseFloat(`${category.budgeted_amount}`))
        barData.datasets[1].data = this.props.currentUser.categories.map(category=>this.categorySpendingTotal(category))

        

        return(
            <React.Fragment>
                {this.editCategoryModal()}
                {this.newCategoryModal()}
                <div className="budget-squares">
                    <div className="category-list">
                        <h3> My Monthly Budget  </h3>
                        {this.props.currentUser.categories.map(category=>{  
                            return  <div className="category-row" key={category.id}>
                                        <div><strong><span className="btn edit-category-btn" id={category.id} data-toggle="modal" data-target="#editCategoryModal" onClick={this.handleEditButtonClick}>✎</span>{category.name}</strong></div>
                                        <div><span className="category-amount">${category.budgeted_amount}</span></div>
                                    </div>
                        })}
                        <span className="btn add-category-btn" data-toggle="modal" data-target="#newCategoryModal">+</span>
                    </div>

                    <div className="doughnut-chart-box">
                    <h3> · Budgeted Spending by Category · </h3>
                        <Doughnut 
                            data={data}
                            options={{
                                responsive: true,
                                maintainAspectRatio: true,
                            }}
                        />
                    </div>

                    <div className="bar-chart-box">
                        <h4> Current Month: {new Date().toString().substring(4,7)} {new Date().toString().substring(11,15)} </h4>
                        <h3>  Budgeted vs Actual Spending  </h3>
                        <Bar data={barData} options={options}/>  
                    </div>    
                </div>
                <CalendarBudget/>
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
    handleNewCategory: (newCategory)=>dispatch(action.handleNewCategory(newCategory)), 
    handleDeleteCategory: (categoryId)=>dispatch(action.handleDeleteCategory(categoryId)), 
    handleEditedCategory: (editedCategory)=>dispatch(action.handleEditedCategory(editedCategory)),
    setUser: (user)=>dispatch(action.setUser(user))
    }
}  

export default connect(mapStateToProps, mapDispatchToProps)(BudgetingContainer);