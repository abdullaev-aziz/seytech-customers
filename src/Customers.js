import React, {Component} from 'react';
import { Table } from 'reactstrap';
import Select from 'react-select';
import {Button} from 'reactstrap';
import {DebounceInput} from 'react-debounce-input';
import { Link } from 'react-router-dom';
import './App.css';

const options = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'github', label: 'Github' }
]

class Customers extends Component {

  constructor(){
    super()
    this.state = {
      value: "",
      searchBy: "name",
    }
  }


  increase = () => {
    this.setState({timer: this.state.timer+1})
  }

  onChange = (e) => {
    this.setState({value: e.target.value});
    console.log("Search", e.target.value)
  }

  onSelect = (item) => {
    this.setState({searchBy: item.value})
  }

  render(){
    const {customers} = this.props;
    const {value, searchBy, timer} = this.state;
    const filteredC = customers.filter(item=>{
      return item[searchBy].toLowerCase().includes(value.toLowerCase())
    })
    return (
      <div>
          <div class="row">
            <div class="col">
              <DebounceInput
                minLength={2}
                onChange={this.onChange}
                debounceTimeout={300}
            />
            </div>
            <div class="col"> <Select onChange={this.onSelect} options={options} /></div>
          </div>
        
        Searching by: {searchBy}
        
        <Table striped className="customers">
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Full Name</th>
              <th>State</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Payment</th>
              <th>Courses</th>
              <th>Role</th>
              <th>Github</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredC.map(customer=>{
                const { id, name, lastName, avatar, email, state, phone,
                role, github, courses, payment, status } = customer;
                const url = `/customer/${id}`;
                const urlEdit = `/customer/${id}/edit`;
                return (
                <tr>
                  <th scope="row">{id}</th>
                  <td><img src={avatar} /></td>
                  <td> <Link to={url}>{name} {lastName}</Link> </td>
                  <td>{state}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>{payment}</td>
                  <td>{courses}</td>
                  <td>{role}</td>
                  <td>{github}</td>
                  <td>
                    <Button className="mr-3" color="primary">
                      <Link className="text-white" to={urlEdit}>Edit</Link>
                    </Button>
                    <Button onClick={()=>this.props.delete(id)} color="danger">Delete</Button>
                  </td>
                </tr>
                )
              })
            }
            
          </tbody>
        </Table>
        <Button color="primary">Add new customer</Button>
      </div>
    )
  }
}

export default Customers;