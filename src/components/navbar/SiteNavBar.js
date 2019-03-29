import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class SiteNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Navbar color="dark" dark>
                <NavbarBrand href="/homepage">High Info Voter</NavbarBrand>
                    <Nav pullRight>
                        <NavItem>
                            <NavLink href="/homepage">Homepage</NavLink>
                        </NavItem>
                    </Nav>
            </Navbar>
        )
    }
}