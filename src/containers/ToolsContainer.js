import React from 'react';

import Notebook from '../components/Notebook';
import { Calculator } from 'react-mac-calculator'




class ToolsContainer extends React.Component{

    render(){
        return(
            <React.Fragment>
                <div className="tools">
                    <img src="./calculator-image.png" alt="calculator"/>
                    {/* <div className="calculator-background">
                        <Calculator/> 
                    </div>                */}
                    <Notebook/>               
                </div>
            </React.Fragment>
        )
    }
}

export default ToolsContainer