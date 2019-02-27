import React, { Component } from 'react';
import { CirclePicker } from 'react-color';
import { Image, Panel } from 'react-bootstrap';
import './stores.css';

class Edititem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            Brand: '',
            type: '',
            warrenty:'',
            qty: 0,
            Price: '',
            Description: '',
            msg: '',
            showsuc: false,
            showerr: false,
            show: true,
            addError: '',
            background: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
    }
    handleChangeComplete = (color, event) => {
        this.setState({ background: color.hex });
    }
    nav() {
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
                            <a className="navbar-brand" href="/home"><Image src="../../assets/1.jpg" className="Imagedetails" /></a>
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
        )
    }
    componentDidMount() {
        var authToken = localStorage.token;
        fetch("http://localhost:4000/stores/edititemdetails/" + this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(data => {
            this.setState({
                Brand: data.brand,
                background: data.color,
                type: data.item,
                qty: data.qty,
                warrenty:data.warrenty,
                Price: data.price,
                Description: data.description,
                imagename: data.imagepath
            });
        });
        fetch("http://localhost:4000/items/showitems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
        }).then(function (response) {
            return response.json();
        }).then(details => {
            if (details.success) {
                this.setState({
                    items: details.data,
                    show: true
                })
            }
        });
    }
    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value
        let name = target.name;
        this.setState({
            [name]: value,
            msg: '',
            showsuc: false,
            showerr: false,
        });
    }
    handleSubmit(e) {
        var authToken = localStorage.token;
        e.preventDefault();
        const stores = {
            id: this.props.match.params.id,
            brand: this.state.Brand,
            color: this.state.background,
            description: this.state.Description,
            warrenty:this.state.warrenty,
            qty: this.state.qty,
            Item: this.state.type,
            price: parseFloat(this.state.Price),
        }
        fetch("http://localhost:4000/stores/edititem/" + this.props.match.params.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer' + authToken
            },
            body: JSON.stringify(stores)
        }).then(res => res.json())
            .then(json => {
                // console.log(json)
                if (json.success) {
                    this.setState({
                        showsuc: true,
                        msg: json.msg
                    })
                    this.resetForm();
                } else {
                    this.setState({
                        showerr: true,
                        msg: json.msg
                    })
                }
            })
    }

    resetForm = () => {
        this.setState({
            Brand: '',
            Color: '',
            type: '',
            Price: '',
            warrenty:'',
            imagename: '',
            Description: '',
            qty: '',
        })
    }
    formfield() {
        return (
            <div>
                <div className="container">
                    <form onSubmit={this.handleSubmit} name="inventry">
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Item :</label>
                            <select className="form-control" id="Select1" name="type" value={this.state.type} onChange={this.handleChange}>
                                <option value="1">select type</option>
                                {
                                    this.state.items.map(item =>
                                        <option value={item.name}>{item.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Pick device color :</label>
                            <CirclePicker onChangeComplete={this.handleChangeComplete} />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Brand :</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" name="Brand" placeholder="Brand" value={this.state.Brand} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Available Stock :</label>
                            <input type="number" className="form-control" id="exampleFormControlInput1" name="qty" placeholder="available stock" value={this.state.qty} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group col-md-8">
                                <label htmlFor="exampleFormControlInput1">warrenty period :</label>
                                <input type="number" className="form-control" id="exampleFormControlInput1" name="warrenty" placeholder="warrenty period" value={this.state.warrenty} onChange={this.handleChange} required />
                            </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Price :</label>
                            <input type="number" className="form-control" id="exampleFormControlInput1" name="Price" placeholder="Price in Rupees" value={this.state.Price} onChange={this.handleChange} />
                        </div>
                        <div className="form-group col-md-8">
                            <label htmlFor="exampleFormControlInput1">Description :</label>
                            <div className="input-group-prepend">
                            </div>
                            <textarea className="form-control" aria-label="With textarea" className="form-control" id="exampleFormControlInput1" name="Description" placeholder="Description" value={this.state.Description} onChange={this.handleChange}></textarea>
                        </div>
                        <br /><br />
                        <div className="form-group col-md-8">
                            <input type="submit" name="update" value="Submit" className="btn btn-info" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    render() {
        if (localStorage.token) {
            return (
                <div>
                    <div className="head">
                        {this.nav()}
                    </div>
                    <div className="container-fluid">
                        <h2 className="title">Update Item Details</h2>
                        <div className="row content">
                            <div className="col-md-1"></div>
                            <div className="col-md-8">
                                <hr />
                                {
                                    this.state.showerr ? (
                                        <div >
                                            <Panel bsStyle="danger" className="text-center">
                                                <Panel.Heading>
                                                    <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                                </Panel.Heading>
                                            </Panel>
                                        </div>
                                    ) : (
                                            <div>

                                            </div>
                                        )
                                }
                                {
                                    this.state.showsuc ? (
                                        <div className="adminmsg">
                                            <Panel bsStyle="success" className="text-center">
                                                <Panel.Heading>
                                                    <Panel.Title componentClass="h3">{this.state.msg}</Panel.Title>
                                                </Panel.Heading>
                                            </Panel>
                                        </div>
                                    ) : (
                                            <div>

                                            </div>
                                        )
                                }
                                <div className="container">
                                    {this.formfield()}
                                </div>
                                <div className="storesbutton ">
                                    <a href="/onlinestore" className="glyphicon glyphicon-circle-arrow-left">Store</a>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Edititem;