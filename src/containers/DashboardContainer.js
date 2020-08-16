import React from 'react';
import * as action from '../actionCreators'
import {connect, useStore} from 'react-redux'

import TopBar from '../components/TopBar'
import AccountsContainer from './AccountsContainer'
import BudgetingContainer from './BudgetingContainer';
import ToolsContainer from './ToolsContainer';
import CreditCardsContainer from './CreditCardsContainer';
import Loading from '../components/Loading'
import Footer from '../components/Footer';

class DashboardContainer extends React.Component {

    componentDidMount(){
        if (this.props.currentUser){
            console.log('just signed in, no refresh')
        }
        else if (localStorage.user_id) { 
            fetch('http://localhost:3000/users')
                .then(r=>r.json())
                .then(users=>{
                    this.props.fetchUsers(users)
                    let user = this.props.users.find(user=> user.id === parseInt(localStorage.user_id))
                    this.props.history.push(`/${user.name.replace(/\s+/g, '')}`)
                    this.props.setUser(user)
                })   
        } else {
            this.props.history.push('/')
        }
    }

    logout=()=>{
        localStorage.removeItem('user_id')
        this.props.setUser(null)
        this.props.history.push('/')
    }

    render(){
        return(
            <React.Fragment>
                {this.props.currentUser ?
                    <div>
                        <button type="button" className="btn logout-btn" onClick={this.logout}>Logout</button>
                        <TopBar/>
                        <h1 className="user-name">· {this.props.currentUser.name} ·</h1>
                        <div id="accordion">
                        <div className="expanding-section card">
                            <div className="card-header collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="headingOne">
                            <h5 className="mb-0 section-title"> 
                                MY ACCOUNTS     
                            </h5>
                            </div>

                            <div id="collapseOne" className="collapse" aria-labelledBy="headingOne" data-parent="#accordion">
                            <div className="card-body">
                                <AccountsContainer/>
                            </div>
                            </div>
                        </div>
                        <div className="expanding-section card">
                            <div className="card-header collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" id="headingTwo">
                            <h5 className="mb-0 section-title"> 
                                BUDGETING AND EXPENSES   
                            </h5>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledBy="headingTwo" data-parent="#accordion">
                            <div className="card-body">
                                <BudgetingContainer/>
                            </div>
                            </div>
                        </div>
                        <div className="expanding-section card">
                            <div className="card-header collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" id="headingThree">
                            <h5 className="mb-0 section-title">
                                CREDIT CARD OFFERS
                            </h5>
                            </div>
                            <div id="collapseThree" className="collapse" aria-labelledBy="headingThree" data-parent="#accordion">
                            <div className="card-body">
                                <CreditCardsContainer/>
                            </div>
                            </div>
                        </div>
                        <div className="expanding-section card">
                            <div className="card-header collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" id="headingFour">
                            <h5 className="mb-0 section-title">
                                ADDITIONAL TOOLS
                            </h5>
                            </div>
                            <div id="collapseFour" className="collapse" aria-labelledBy="headingFour" data-parent="#accordion">
                            <div className="card-body">
                                <ToolsContainer/>
                            </div>
                            </div>
                        </div>
                        </div>
                        <Footer/>
                    </div>
                    : <Loading/>}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);