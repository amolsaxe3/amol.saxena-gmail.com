/* eslint react/no-unused-state:0 */
import React, { Component } from 'react';

export class CampusInput extends Component {

  //your code here
  constructor (props) {
	  super(props)
  
	  this.state = {
		name: '',
	  }
	  this.handleChange = this.handleChange.bind(this)

  }
  


	handleChange (ev) {
    console.log('ev===>',ev.target.value);
		this.setState({
			name: ev.target.value
		})
	}

  render() {
  
    return (
      <input onChange={this.handleChange} value={this.state.name}/>
      )
     }
}
