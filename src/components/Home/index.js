import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { url } from '../../utils/url';
import Lists from '../Lists';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
      laoding: false
    }
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    this.setState({loading: true})
    axios.get(url)
      .then(({ data }) => this.setState({repositories: data.items, loading: false}))
      .catch(error => console.log(error))
  }



  render() {
    const { repositories, loading } = this.state;
    console.log(repositories)
    return (
      <Fragment>
        {
          loading ? <div>loading....</div>
          : <Lists repositories={repositories} />
        }
      </Fragment>
    );
  }
}

export default Home;
