//import styles from './App.module.css'
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx';
import Home from './components/Home/Home.jsx';
import Activity from './components/Activity/Activity.jsx';
import Detail from './components/Details/Detail.jsx';



function App() {
  return (

    <BrowserRouter>
      {/* className={styles.App} */}
      <div >
        <Route exact path='/' component={Landing} />
        <Route path='/home/:id' component={Detail} />
        <Route exact path='/home' component={Home} />
        <Route path='/activities' component={Activity} />
        {/* <Route path='/search' component={SearchBar} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
