import React,{Fragment} from "react";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
  } from 'reactstrap';

import Registermodal from "./auth/register";
import Logout from "./auth/logout";
import Loginmodal from "./auth/loginmodal";


import {connect} from "react-redux";
import PropTypes from "prop-types";

class AppNavBar extends React.Component{
    state = {
        isOpen:false
    }

    toggle = () =>{
        this.setState({
            isOpen:!this.state.isOpen
        });
    }
    static propTypes = {
        auth :PropTypes.object.isRequired
    }

    render() {
        const {isAuthenticated,user} = this.props.auth;

        const authlinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ?`Welcome ${user.name}`:null}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>

            </Fragment>
        )
        const guestlink =(
            <Fragment>
                <NavItem>
                    <Registermodal/>
                </NavItem>
                <NavItem>
                    <Loginmodal/>
                </NavItem>
            </Fragment>
        )

        return(
            <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container> 
                    <NavbarBrand href="/">ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen = {this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated ? authlinks:guestlink}


                            <NavItem>
                                <NavLink href="https://github.com">
                                    Github
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        )
    }
}

const mapstatetoprops=(state)=>({
    auth:state.auth
})

export default connect(mapstatetoprops)(AppNavBar);