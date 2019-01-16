import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { url } from '../../utils/url';
import Lists from '../Lists';
import style from './style.css'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
      page:400,
      laoding: false,
      loadingMore: false,
      end: false,
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
        if(error.response.status === 403) this.setState({end: true});
      })
  }

  fetchMoreData = () => {
    document.addEventListener('scroll',  (event) => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if(this.state.end === false) {
          this.incrementPage();
          this.setState({loadingMore: true})
        } else
          this.setState({loadingMore: false})
        let url = `${this.state.url}&page=${this.state.page}`;
        this.loadMore(url)
    }
  });
  }

  loadMore = (url) => {
    axios.get(url)
      .then(({data}) => {
        let items = [...this.state.repositories, ...data.items];
        this.setState({repositories: items, loadingMore: false})
      })
      .catch(error => {
        this.setState({end: true, loadingMore: false});
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
    const { repositories, loading, loadingMore, end } = this.state;
    return (
      <Fragment>
        {
          loading ? <div>loading....</div>
          : <Lists repositories={repositories} />
        }
        { loadingMore && <div>Loading more ....</div> }
        { end && <div className="end">End</div> }
      </Fragment>
    );
  }
}

export default Home;
