import React,{Fragment}  from "react";
import {logout} from "../../action/AuthAction";

import {connect} from "react-redux";
import { NavLink } from "reactstrap";
import PropTypes from "prop-types";

class Logout extends React.Component{

    static propTypes ={
        logout: PropTypes.func.isRequired,

    }

    render (){
        return(
            <Fragment>
                <NavLink onClick={this.props.logout} href="#">
                    Logout
                </NavLink>
            </Fragment>

        )
        
    }

}


export default connect(null,{logout})(Logout);
