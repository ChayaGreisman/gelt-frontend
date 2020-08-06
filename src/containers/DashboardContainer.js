import React from 'react';


import TopBar from '../components/TopBar'
import AccountsContainer from './AccountsContainer'


const DashboardContainer = (props) => {

    return(
        <React.Fragment>

                <TopBar/>
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
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
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
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
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
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    </div>
                    </div>
                </div>
                </div>
                
                <div className="page-footer">
                    <img className="footer-logo" src='./plain-logo.png' alt="logo"/>
                    <div className="footer-copyright text-center py-3">
                        © {new Date().toISOString().substring(0, 4)}  Chaya M. Greisman
                    </div>
                </div>
        </React.Fragment>
    )

}
  
export default DashboardContainer;    