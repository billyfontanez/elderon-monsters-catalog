import { Component } from 'react';

import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      monsters: [],
      searchField:''
    };
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/williamfontanez/monsters/main/monsters.json')
    .then((response) => response.json())
    .then((users) => this.setState(() => {
      return{monsters:users}
    },
    () =>{
      console.log(this.state)
    }
    ));
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(
      () => {
      return {searchField};
    });
  }

  render(){
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    return (
      <div className="App">
        <input
        className='search-box'
        type='search'
        placeholder='Search Monsters'
        onChange={onSearchChange}
        />
        {
          filteredMonsters.map((monster) => {
            return(
              <div key={monster.id}>
                <h1>{monster.name}</h1>
                <h2>{monster.username}</h2>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default App;
