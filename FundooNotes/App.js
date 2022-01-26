import React,{Component} from 'react';
import {Provider} from 'react-redux';
import Navigation from './src/Navigation/NavigationScreen';
import {store} from './src/Redux/store';

 class App extends Component { 

  render() {
    return (
      <Provider store={store}>
        <Navigation/>
       </Provider>
    )
  }
}

export default App;

