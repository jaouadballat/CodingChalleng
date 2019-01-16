import React, { Component } from 'react';
import axios from 'axios';

import { url } from '../../utils/url';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    axios.get(url)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }



  render() {
    return (
      <div>jaouad</div>
    );
  }
}

export default Home;
