import React from 'react';
import * as action from '../actionCreators'
import {connect, useStore} from 'react-redux'

class CreditCardsContainer extends React.Component {

    state = {
        cards: [],
        savedCards: [],
        startIndex: 0,
        creditScoreSort: "All",
        accountTypeSort: "All",
        noAnnualFee: false,
        showSavedCards: false  
       
    }

    handleClickShowCards = () => {
        this.setState({showSavedCards: !this.state.showSavedCards})
    }

    componentDidMount(){
        fetch('http://localhost:3000/cards')
        .then(r=>r.json())
        .then(cards=>this.setState({cards}))

        fetch('http://localhost:3000/saved_cards')
        .then(r=>r.json())
        .then(savedCards=>this.setState({savedCards}))
    }

    nextThree = () => {
        let newIndex = this.state.startIndex + 1 
        this.setState({ startIndex: newIndex >= this.cardsToDisplay().length - 2 ? 0 : newIndex })
    }

    prevThree = () => {
        if(this.state.startIndex > 0){
            this.setState({ startIndex: this.state.startIndex -1 })
        } 
    }

    handleChange = (e) => { 
        this.setState({[e.target.name]: e.target.value})
    }

    handleCheckAnnualFee = (e) => { 
        this.setState({noAnnualFee: !this.state.noAnnualFee})
    }

    accountTypeFilter = () => {
        if (this.state.accountTypeSort !== "All"){
            return this.state.cards.filter(card=> card.user_type.includes(this.state.accountTypeSort))
        } 
        return this.state.cards
    }

    cardsToDisplay = () =>{
        let displayCards = this.accountTypeFilter()
        if (this.state.creditScoreSort !== "All"){
            if (this.state.noAnnualFee === false){
              return displayCards.filter(card=> card.credit_type.includes(this.state.creditScoreSort))  
            } 
            else if (this.state.noAnnualFee === true){
                let cards = displayCards.filter(card=> card.credit_type.includes(this.state.creditScoreSort))
                return cards.filter(card=>card.annual_fee === 0)
            }
            
        } else {
            if (this.state.noAnnualFee === false){
                return displayCards 
              } 
              else if (this.state.noAnnualFee === true){
                return displayCards.filter(card=>card.annual_fee === 0)
              }
        }
    }

    includesCard = (id) => {
        let cardIncluded = this.props.currentUser.cards.find(c=>c.id===id)
        if(cardIncluded){
            return true
        } else {
            return false
        }
    }

    handleBookmarkClick = (e) => {

        // alert(`ID OF CARD: ${e.target.id} EVENT TARGET: ${e.target}`)
        // console.log(`ID OF CARD: ${e.target.id} EVENT TARGET: ${e.target}`)
       
        if(this.includesCard(parseInt(e.target.id))===true){
            alert(`need to delete saved card and remove from user card array, ID: ${e.target.id}`)
        } else {
            
            fetch('http://localhost:3000/saved_cards', {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: this.props.currentUser.id,
                    card_id: e.target.id
                })
            })
            .then(r=>r.json())
            .then(newSavedCard=>{
                this.props.handleNewSavedCard(newSavedCard.card)
            })
        }

    }

    userSavedCard = (card) =>{
        let cardSaved = this.props.currentUser.cards.find(c=>c.id===card.id)
        if (cardSaved){
            return true
        } else {
            return false
        }
    }

    render(){
        // let threeCards = this.state.cards.slice(this.state.startIndex,this.state.startIndex+3)
        let threeCards = this.cardsToDisplay().slice(this.state.startIndex,this.state.startIndex+3)
        
        return(
            <React.Fragment>

                <div className="cc-display-options">

                    <div>
                        <em>Voted Best of 2020</em>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                    </div>



                    <form>
                    <div class="form-group form-check">
                        <input type="checkbox" name="noAnnualFee" className="check-annualFee" onChange={this.handleCheckAnnualFee} checked={this.state.noAnnualFee}/>
                        <label>No Annual Fee</label>
                    </div>
                    </form>

                    <form>
                    <div className="form-group">
                        <label>Account Type:</label>
                        <select name="accountTypeSort" value = {this.state.accountTypeSort} onChange={this.handleChange} className="choose-account-type" >
                            <option className="cc-option" value="All">View All</option>
                            <option className="cc-option" value="Personal">Personal</option>
                            <option className="cc-option" value="Business">Business</option>
                            <option className="cc-option" value="Student">Student</option>
                        </select>
                    </div>
                    </form>
                    
                    <form>
                    <div className="form-group">
                        <label>Credit Score:</label>
                        <select name="creditScoreSort" value = {this.state.creditScoreSort} onChange={this.handleChange} className="choose-credit-level" >
                            <option className="cc-option" value="All">View All</option>
                            <option className="cc-option" value="Excellent">Excellent</option>
                            <option className="cc-option" value="Good">Good</option>
                            <option className="cc-option" value="Fair">Fair</option>
                            <option className="cc-option" value="Bad">Bad</option>
                            <option className="cc-option" value="Limited">Limited History</option>
                        </select>
                    </div>
                    </form>
                </div>
                

                {this.cardsToDisplay().length === 0 ? <h3 className="no-cards"><em>SORRY! GELT©️ COULD NOT FIND CREDIT CARDS THAT MATCH THAT CRITERIA</em></h3>
                    :<div className="cc-cards-container">

                    <svg onClick={this.prevThree} viewBox="0 0 16 16" class="bi bi-arrow-left-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.646 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L6.207 7.5H11a.5.5 0 0 1 0 1H6.207l2.147 2.146z"/>
                    </svg>


                    {threeCards.map(card => {
                        return (
                            <div className="cc-card">
                                <div className="bookmark">

                                    {this.userSavedCard(card)
                                        ? <svg onClick={this.handleBookmarkClick} id={card.id} name={card.id} width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-bookmark-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path name={card.id} id={card.id} fill-rule="evenodd" d="M3 3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12l-5-3-5 3V3z"/>
                                        </svg>

                                        : <svg onClick={this.handleBookmarkClick} id={card.id} name={card.id} width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-bookmark" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path name={card.id} id={card.id} fill-rule="evenodd" d="M8 12l5 3V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10.234z"/>
                                        </svg>
                                    }
                                </div>

                                <h5 className="card-name">{card.name}
                                {card.best && 
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                                }
                                </h5>
                                <small><span>{card.company} by <a className="bank-link" href={card.bank_url} target="_blank">{card.bank}</a></span></small>
                                
                                <div>
                                <img className="cc-image" src = {card.img_url} alt="credit-card"/>
                                </div>

                                <h6 className="annual-fee">Annual Fee: ${card.annual_fee}</h6>
                                <div className="overflow-auto card-description">
                                    {card.description}
                                </div>
                                <a href={card.application_url} target="_blank">
                                    <button className="btn btn-success">
                                    Apply Now 
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-hand-index-thumb apply-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M6.75 1a.75.75 0 0 0-.75.75V9.5a.5.5 0 0 1-.854.354l-2.41-2.411a.517.517 0 0 0-.809.631l2.512 4.185 1.232 2.465a.5.5 0 0 0 .447.276h6.302a.5.5 0 0 0 .434-.252l1.395-2.442a2.5 2.5 0 0 0 .317-.991l.272-2.715a1 1 0 0 0-.995-1.1H13.5v1a.5.5 0 1 1-1 0V7.154a4.208 4.208 0 0 0-.2-.26c-.187-.222-.368-.383-.486-.43-.124-.05-.392-.063-.708-.039a4.844 4.844 0 0 0-.106.01V8a.5.5 0 1 1-1 0V5.986c0-.167-.073-.272-.15-.314a1.657 1.657 0 0 0-.448-.182c-.179-.035-.5-.04-.816-.027l-.086.004V8a.5.5 0 1 1-1 0V1.75A.75.75 0 0 0 6.75 1zM8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v6.543L3.443 6.736A1.517 1.517 0 0 0 1.07 8.588l2.491 4.153 1.215 2.43A1.5 1.5 0 0 0 6.118 16h6.302a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.272-2.715a2 2 0 0 0-1.99-2.199h-.582a5.114 5.114 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.634 2.634 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046l-.048.002zm2.094 2.025z"/>
                                    </svg>
                                    </button>
                                </a>
                            </div>
                        )
                    })}

                    <svg onClick={this.nextThree}  viewBox="0 0 16 16" className="bi bi-arrow-right-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8.354 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z"/>
                    </svg>
                </div>}

                <div className="bookmarked-option">
                    <button onClick={this.handleClickShowCards} className="btn bookmarked-btn">
                        My Bookmarked Cards
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bookmark-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3 3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12l-5-3-5 3V3z"/>
                        </svg>
                    </button>
                </div>

                
                {this.state.showSavedCards &&
                    <div className="bookmarked-cards-gallery">
                    {this.props.currentUser.cards.map(card=>
                        <a href={card.application_url} target="_blank"><img className="bookmarked-cards-gallery-img" src={card.img_url} alt="credit-card"/></a>
                    
                    )}
                    </div>
                }
                

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
        handleNewSavedCard: (newSavedCard)=>dispatch(action.handleNewSavedCard(newSavedCard)),
        }
    }
      
    export default connect(mapStateToProps, mapDispatchToProps)(CreditCardsContainer);