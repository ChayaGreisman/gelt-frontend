import React from 'react';
import * as action from '../actionCreators'
import {connect, useStore} from 'react-redux'

class Notebook extends React.Component {

    render(){
        return (
            <React.Fragment>
            <div className="notebook">  
                <img src="./spiral.png" alt='spiral-notebook' className="spiral"/>
                <h3 className="notebook-title">NOTES</h3>
                <div className="notebook-text">


                    <div className="overflow-auto notebook-notes">
                                                All Credit Cards » American Express Credit Cards
                            The Blue Business® Plus Credit Card from American Express
                            amex blue business Sponsored Card
                            414 User Reviews
                            By: American Express
                            Apply Now 
                            JUMP TO: REWARDS | APRs | REVIEWS | Q&A | CUSTOMER SERVICE INFO
                            minimum credit needed Good 
                            Accepted Credit Scores 

                            Excellent Credit, Good Credit

                            EDITOR’S TAKE
                            Review: The Blue Business® Plus Credit Card from American Express
                            Few 0% APR business credit cards can compete with The Blue Business® Plus Credit Card from American Express. Blue Business Plus has a $0 annual fee and offers 0% for 12 months on new purchases.

                            The Amex Blue Business Plus package includes rewards, too, albeit fairly unremarkable ones. Cardholders receive 2 points per $1 on their first $50,000 in purchases each year, followed by 1 point per $1 on amounts above that. When converted to cash back, those earning rates equate to just 0.85% - 1.7% back.

                            So, American Express Blue Business Plus is a good all-around business credit card, but it’s better for avoiding interest than earning rewards – at least compared to the competition. Below, you can find more details that should prove helpful in deciding whether or not to apply for the Blue Business Plus Card from Amex.

                            Amex Blue Business Plus Review Highlights:
                            Average ongoing rewards. The first $50,000 spent annually will yield 2 points per $1. Other purchases provide just 1 point per $1 spent, which is below the market average of 1.18 points/miles. So the Blue Business Plus Card is not the most rewarding option available to you and your business.
                            No annual fee. One of the best things about the Amex Blue Business Plus Card is its lack of an annual fee. This makes it roughly $20 per year cheaper than the average credit card. It does not, however, mean you should apply. There are well over 100 business credit cards with no annual fee, according to WalletHub’s database, and many of them are more rewarding than Amex Blue Business Plus.
                            Average interest-free intro period. The American Express Blue Business Plus Card offers 0% on new purchases for the first 12 months. That’s about what you would get from the average 0% APR credit card.
                            Good credit needed to qualify. Your personal credit standing will dictate your ability to get approved for any business credit card, and it needs to be good or excellent for you to qualify for Amex Blue Business Plus. And since over 40% of people don’t meet that threshold, you’d be wise to check your latest credit score for free before you apply.
                            Average regular APR. The Blue Business Plus Card’s APR could be anywhere from 13.24% to 19.24% (V). It all depends on your credit standing. So it figures that people with good credit will get a rate toward the high end of the range, with the low end being reserved for applicants whose credit history is excellent bordering on perfect. For context, the average APR among credit cards for good credit is 20.24%, while credit cards for excellent credit charge an average of 13.69%. 
                            Limited cardholder protections. Because business credit cards don’t enjoy the same user protections as consumer cards, issuers can increase the interest rates on business-card balances whenever they please – among other things. With consumer cards, they have to wait until you’re at least 60 days delinquent.
                            4.0 / 5
                            John KiernanJohn Kiernan, Credit Card Editor
                            Aug 6, 2020
                            Read Full Review 
                            The Blue Business® Plus Credit Card from American Express' Rewards
                            Earn up to $300 back to boost your business. You can earn up to $100 in the form of statement credits at each of the following merchants: Dell Technologies, DocuSign or FedEx after you make an eligible purchase on your new Card within the first 3 months of Card Membership.
                            Earn 2X Membership Rewards® points on everyday business purchases such as office supplies or client dinners. 2X applies to the first $50,000 in purchases per year, 1 point per dollar thereafter.
                            Enjoy the flexibility to put more purchases on the Card and earn rewards when you buy above your credit limit*.
                            You’ve got the power to use your Card beyond its credit limit* with Expanded Buying Power.
                            More buying power for your business means more opportunities to earn points. That’s everyday business with the Blue Business Plus Card.
                            *The amount you can spend above your credit limit is not unlimited. It adjusts with your use of the Card, your payment history, credit record, financial resources known to us, and other factors.
                            Terms Apply
                    </div>

                    <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked={true}/>
                    <label class="form-check-label" for="exampleRadios1">
                        Low
                    </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" checked={false}/>
                    <label class="form-check-label" for="exampleRadios2">
                        Average
                    </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" checked={false}/>
                    <label class="form-check-label" for="exampleRadios3">
                        High
                    </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option4" checked={false}/>
                    <label class="form-check-label" for="exampleRadios4">
                        Extremely High
                    </label>
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
    fetchUsers: (users)=>dispatch(action.fetchUsers(users)),
    setUser: (user)=>dispatch(action.setUser(user))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Notebook);