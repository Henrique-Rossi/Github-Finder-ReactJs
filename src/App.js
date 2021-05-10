// import logo from './logo.svg';
// import './App.css';

import axios from "axios";
import { Component } from "react";
import { Navbar } from "./Components/NavBar/NavBar";

import { Profile } from "./Components/Profile/Profile";
import { Repo } from "./Components/Repositorios/Repo";


class App extends Component {
  constructor() {
    super();
    this.state = {
      github: {
        url: "https://api.github.com/users",
        client_id: "Iv1.5f2a78a9ddc2e03e",
        client_secret: "aa8e373be64def7cf5611368095cebe4b0f8ea95",
        count: 10,
        sort: "created:asc"
      },
      user: [],
      repos: []
    };
  }

  /*funçãp input*/
  getUser = e => {
    const user = e.target.value;
    const { url, client_id, client_secret, count, sort } = this.state.github
    axios
      .get(
        `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
      )
      .then(({ data }) => this.setState({ user: data }));


    axios
      .get(
        `${url}/${user}/repos?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`
      )
      .then(({ data }) => this.setState({ repos: data }));

  }
  renderProfile = () => {
    const { user, repos } = this.state;
    return (
      <div className="row">
        <div className="col-md-4">
          <Profile user={user} />
        </div>
        <div className="col-md-8">
          {repos.map(repo => (
            <Repo repo={repo} key={repo.name} />
          ))}
        </div>
      </div>
    );
  };


  render() {
    const { user, repos } = this.state;
   
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <div className="card card-body">
            <h1>Pesquisar usuario do GitHub</h1>
            <p className="lead" >Digite um nome para encontrar o usuário e repositórios </p>
            <input onChange={this.getUser} id="search" type="text" className="form-control" required></input>
          </div>
          {user.length !== 0 ? this.renderProfile() : null}
        </div>
      </div>
    );
  }
}
export default App;
// user={user}/>:null