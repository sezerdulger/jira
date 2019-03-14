import React, { Component } from 'react';
import axios from 'axios';

class Rate extends Component {
  constructor() {
    super();

    this.state={rates: {}};
    
    axios.get('/api/1.0/issues/points')
      .then( (response) => {
        console.log(response);
        this.setState({rates: response.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    let rates = Object.keys(this.state.rates).map(p=>{
      return (
        <tr>
          <td>
            {p}
          </td>
          <td>
            % {this.state.rates[p]}
          </td>
        </tr>
      );
    });
    return (
      <div>
        <table>
        {rates}
        </table>
      </div>
    );
  }
}

export default Rate;
