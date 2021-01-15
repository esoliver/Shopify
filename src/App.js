import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

class BodyData extends React.Component {
  state = {
    query: "",
    data: [],
    filteredData: [],
  };

  handleInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData = prevState.data.filter(element => {
        return element.name.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filteredData
      };
    });
  };

  getData = () => {
    fetch('http://www.omdbapi.com/?apikey=f7db3950&s=')
      .then(response => response.json())
      .then(data => {
        const { query } = this.state;
        const filteredData = data.filter(element => {
          return element.name.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          data,
          filteredData
        });
      });
  };

  componentWillMount() {
    this.getData();
  }

  render() {
    return (
    <div>
        <div className="searchForm">
          <p>Movie title</p>
          <form>
            <input 
              placeholder="Search..."
              value={this.state.query}
              onChange={this.handleInputChange}
            />
          </form>
          <div>{this.state.filteredData.map(i => <p>{i.name}</p>)}</div>
        </div>
        <div className="results">
          <p>Results for "{this.state.query}"</p>
          <ul></ul>
        </div>
        <div className="nominations">
          <p>Nominations</p>
        </div>
    </div>
    );
  }
}


export default BodyData;
