import React, {Component} from 'react';
import './App.css';
import Tab from './tab'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tab tabJson = {{
          picUrl: ['./1.jpg', './2.jpg', './3.jpg', './4.jpg'],
          timer: 2000
        }} />
      </div>
    )
  }
}

export default App;
