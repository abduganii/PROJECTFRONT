import React, { useContext, useState } from 'react';
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarItem,

    MDBCollapse,
    MDBBtn,
    MDBIcon,
    MDBNavbarNav,
    MDBInputGroup
} from 'mdb-react-ui-kit';
import routes from '../../shared/constants/routes';
import { Link, useNavigate } from "react-router-dom";
import GlobalContext from '../../shared/contexts/GlobalContext';
import { SearchItem } from '../../shared/apis/authApi';


export default function Header() {
    const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);
    const { token, setToken } = useContext<any>(GlobalContext)
    const { isAdmin, setIsAdmin } = useContext<any>(GlobalContext)
    const { userId, setUserId } = useContext<any>(GlobalContext)
    const navigate = useNavigate()
    const searchitem = async (e: any) => {
        const { Item } = await SearchItem({ text: e.target.value })
        console.log(Item)
    }

    return (
        <>
            <MDBNavbar expand='lg' light bgColor='light'>
                <MDBContainer fluid>
                    <MDBNavbarBrand >Navbar</MDBNavbarBrand>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarTogglerDemo02'
                        aria-controls='navbarTogglerDemo02'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse navbar show={showNavNoTogglerSecond}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                            <MDBNavbarItem>
                                <Link to={routes.HOME} className={"home-link"} >
                                    Home
                                </Link>
                            </MDBNavbarItem>
                            {token ? <>
                                <MDBNavbarItem>
                                    <Link to={routes.USER} className={"home-link"} >
                                        Userpage
                                    </Link>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <Link to={routes.ADDITEM + `/${userId}`} className={"home-link"} >
                                        Add
                                    </Link>
                                </MDBNavbarItem></> :
                                <>
                                    <MDBNavbarItem>
                                        <Link to={routes.LOGIN} className={"home-link"} >
                                            Userpage
                                        </Link>
                                    </MDBNavbarItem>
                                    <MDBNavbarItem>
                                        <Link to={routes.LOGIN} className={"home-link"} >
                                            Add
                                        </Link>
                                    </MDBNavbarItem></>}
                        </MDBNavbarNav>

                        {isAdmin == "true" || isAdmin == true ? <MDBBtn onClick={() => navigate(routes.MANEGEUSER)} style={{ marginBottom: "18px", paddingRight: "70px", marginRight: "10px" }} outline > Adminpanel </MDBBtn> : ""}

                        {token == "false" || token == false ? <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                            <MDBNavbarItem>
                                <Link to={routes.LOGIN} className={"home-link"} >
                                    Login
                                </Link>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <Link to={routes.REGISTOR} className={"home-link"} >
                                    Register
                                </Link>
                            </MDBNavbarItem>
                        </MDBNavbarNav> : <MDBBtn style={{ marginBottom: "18px", paddingRight: "50px", marginRight: "400px" }} outline onClick={() => {
                            setToken(false)
                            setIsAdmin(false)
                            setUserId(false)
                        }}>Logout</MDBBtn>}
                        <MDBInputGroup tag="form" className='d-flex w-auto mb-3' >
                            <input className='form-control' style={{ width: "400px" }} onChange={searchitem} placeholder="Type query" aria-label="Search" type='Search' />
                        </MDBInputGroup>
                    </MDBCollapse>


                </MDBContainer>
            </MDBNavbar>

        </>
    );
}