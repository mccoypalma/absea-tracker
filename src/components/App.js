import React, { Component } from 'react';
import { NavbarElem } from './navbar';
import { Footer } from './footer';
import { HeaderHome } from './Homepage.js'
import { MainHome } from './Homepage.js'
import { TrackerPage } from './TrackerPage.js'
import { Route, Switch } from 'react-router-dom';

export class App extends Component {
render() {
  return (
    <div className="body-contain">
      <header className="app-header">
        <NavbarElem/>
        <Switch>
          <Route exact path="/" component={HeaderHome}/>
        </Switch>
      </header>
      <main>
        <Switch>
          <Route exact path="/" component={MainHome}/>
          <Route path="/trackertable" component={TrackerPage}/>
        </Switch>
      </main>
      <Footer/>
    </div>
);
}
}

export default App;
