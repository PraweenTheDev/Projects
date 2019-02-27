import React, { Component } from 'react';
import { SwatchesPicker } from 'react-color';
import {
    Image, OverlayTrigger, Popover, Panel, FormGroup, FormControl, HelpBlock, ControlLabel, Button
    , Table
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './itemtypes.css';


class Itemtypes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            identifier: '',
            show: true,
            showinsert:false,
            showmsg:false,
            name: '',
            nameerr: '',
            msg: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
    }
    navbar() {
        return (
            <div >
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
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        );
    }
    handleSubmit(e) {
        var authToken = localStorage.token;
        const item = {
            name: this.state.name,
            identifier: this.state.identifier
        }
        e.preventDefault();
        if (this.handleValidation()) {
            fetch("http://localhost:4000/items/additemtype", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer' + authToken
                },
                body: JSON.stringify(item)
            })
                .then(res => res.json())
                .then(details => {
                    if (details.success) {
                        this.setState({
                            items: details.data,
                            msg:'successfully inserted!',
                            showmsg:true
                        })
                    } else {
                        this.setState({
                            showmsg:true,
                            msg:'cannot insert!',
                        })
                    }
                })
            window.location.reload();
        }
    }
    removeitem(id) {
        var authToken = localStorage.token;
        //console.log(authToken)
        fetch("http://localhost:4000/items/removeitems/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            if (data.success) {
                this.setState({
                    showmsg:true,
                    msg:'delete successfully!'
                })
                window.location.reload();
            } else {
                this.setState({
                    showmsg:true,
                    msg:'cannot delete!'
                })
            }
        })
    }
    handleValidation() {
        let formvalid = true
        if (!this.state.name) {
            this.setState({
                nameerr: 'field cannot be empty'
            })
            formvalid = false;
        }
        if (this.state.name !== "undefined") {
            if (!this.state.name.match("^[a-zA-Z\\s]*$")) {
                this.setState({
                    nameerr: 'name field not valid'
                })
                formvalid = false;
            }
        }
        return formvalid;
    }
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
            showmsg:false,
            nameerr: '',
        });
    }
    handleChangeComplete = (color, event) => {
        this.setState({ identifier: color.hex });
    }
    form() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Enter the Item Type :</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1" name="name" placeholder="Item Name" value={this.state.name} onChange={this.handleChange} required />
                        <span style={{ color: "#FD6571" }}>{this.state.nameerr}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Enter Identify color</label>
                        <SwatchesPicker onChangeComplete={this.handleChangeComplete} />
                    </div>
                    <div className="form-group col-md-2">
                        <div className="additembutton">
                            <input type="submit" name="submit" value="Submit" className="btn btn-info" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/items/showitems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(details => {
            console.log(details)
            if (details.success) {
                this.setState({
                    items: details.data
                })
            } else {
                this.setState({
                    show: false,
                    msg: details.msg
                })
            }
        });
    }
    render() {
        const popoverHoverFocus = (
            <Popover id="popover-trigger-hover-focus" title="Romove Button">
                <strong>Are you sure ???</strong>
            </Popover>
        );
        var count = 1;
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        {this.navbar()}
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">ITEM TYPES </h2>
                        <div className="col-sm-3">
                            {this.form()}
                        </div>
                        <div className="col-sm-8 contain">
                        
                        {
                            this.state.showmsg ? (
                                <Panel bsStyle="success" className="table">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                            </Panel.Heading>
                                        </Panel>
                            ):(
                                <div></div>
                            )
                        }
                            {
                                this.state.show ? (
                                    <Table responsive className="table">
                                        <thead>
                                            <tr>
                                                <th>Item Type</th>
                                                <th>Identify By</th>
                                                <th>Inserted At</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>{
                                            this.state.items.map(item =>
                                                <tr>
                                                    <td>{item.name}</td>
                                                    <td><svg height="100" width="100"className="identifer">
                                                        <circle cx="50" cy="50" r="15"  stroke-width="3" fill={item.identifier} />
                                                    </svg></td>
                                                    <td>{item.date}</td>
                                                    <td><OverlayTrigger
                                                        trigger={['hover', 'focus']}
                                                        placement="bottom"
                                                        overlay={popoverHoverFocus}
                                                    >
                                                        <button className="btn btn-danger" onClick={this.removeitem.bind(this, item._id)}>Remove</button>
                                                    </OverlayTrigger></td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                ) : (
                                        <Panel bsStyle="danger" className="table">
                                            <Panel.Heading>
                                                <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                            </Panel.Heading>
                                        </Panel>
                                    )
                            }
                        </div>
                        <div className="col-sm-3">
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default Itemtypes;