import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { url } from '../../utils/url';
import Lists from '../Lists';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
      page:0,
      laoding: false,
      loadingMore: false,
      url
    }
  }

  componentDidMount() {
    this.fetchApi(this.state.url);
    this.fetchMoreData();
  }

  fetchApi = (url) => {
    this.setState({loading: true})
    axios.get(url)
      .then((response) => this.setState({repositories: response.data.items, loading: false}))
      .catch(error => {
        console.log(error.response)
        if(error.response.status === 403) return;
      })
  }

  fetchMoreData = () => {
    document.addEventListener('scroll',  (event) => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.incrementPage();
        this.setState({loadingMore: true})
        let url = `${this.state.url}&page=${this.state.page}`;
        axios.get(url)
          .then(({data}) => {
            let items = [...this.state.repositories, ...data.items];
            this.setState({repositories: items, loadingMore: false})
          })
          .catch(error => {
            console.log(error)
          });
    }
  });
  }

  incrementPage = () => {
    this.setState(function (prevState) {
      return {
        page: prevState.page + 1
      };
    });
  }



  render() {
    const { repositories, loading, loadingMore } = this.state;
    return (
      <Fragment>
        {
          loading ? <div>loading....</div>
          : <Lists repositories={repositories} />
        }
        {loadingMore && <div>Loading more ....</div>}
      </Fragment>
    );
  }
}

export default Home;
