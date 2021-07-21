import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Series from './pages/Series'
import MovieDetail from './pages/MovieDetail'
import SerialDetail from './pages/SerialDetail'
import AddMovie from './pages/AddMovie'
import UpdateMovie from './pages/UpdateMovie'
import Favorites from './pages/Favorites'

export default function App() {

   const styles = {
    body: {
      paddingLeft: 0, 
      paddingTop: 50, 
      paddingBottom: 40,
      marginLeft: 0,
      backgroundSize: 'cover',
      overflow: 'hidden',
      backgroundImage: `url(https://images.pexels.com/photos/4722571/pexels-photo-4722571.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)`,
      fontFamiliy: 'Roboto Condensed'
    },
    wrapper: {
      marginRight: 10, 
      minHeight: '100vh', 
      fontFamiliy: 'Roboto Condensed'
    }
  }

  return (
    <Router>
      <div className="row router" style={styles.wrapper}>
          <div className="col-1">
              <Navbar />
          </div>
          <div className="col switch" style={styles.body}>
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/movies" component={Movies} />
                  <Route exact path="/tvSeries" component={Series} />
                  <Route exact path="/favorites" component={Favorites} />
                  <Route path="/movies/:id" component={MovieDetail} />
                  <Route path="/tvSeries/:id" component={SerialDetail} />
                  <Route path="/update/:id" component={UpdateMovie} />
                  <Route path="/addMovie" component={AddMovie} />
              </Switch>
          </div>
      </div>
    </Router>
  );
}
