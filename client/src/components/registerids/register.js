import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import Nav from '../front/nav';
import {Link} from 'react-router-dom';
import './register.css';

class Register extends Component {
    constructor(props) {
        super(props)
    }
    logout=(e)=>{
        e.preventDefault();
        localStorage.clear();
        sessionStorage.clear();
        this.props.history.push("/");
    }
    navbar() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="/home"><Image src="../assets/1.jpg" className="Imagedetails" /></a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="/Home">HOME</a></li>
                                <li className="custname"><a href="#">{sessionStorage.getItem('fname')}</a></li>
                                <li><a href="#" onClick={this.logout}>LOGOUT</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        );

    }
    render() {
        if(localStorage.token){
        return (
            <div>
                <div className="head">
                    <Nav />
                </div>
                <div className="container-fluid">
                <h2 className="title">REGISTER PAGE</h2>
                    <div className="row content">
                        <div className="col-sm-2 sidenav">
                        </div>
                        <div class="col-sm-8 text-left">
                            <div>
                                <ul>
                                        <hr />
                                    <h4 className="links"><Link to={"/customerids" } className="glyphicon glyphicon-user"> Customer</Link></h4>  
                                        <hr />
                                    <h4 className="links"><Link to={"/employeeids" } className="glyphicon glyphicon-thumbs-up"> Employee</Link></h4>  
                                        <hr />
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-2 sidenav">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
}
export default Register;