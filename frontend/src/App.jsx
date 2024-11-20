import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import MapComponent from './components/MapComponent';
import BarChartComponent from './components/BarChartComponent';
import EmergencyServicesComponent from './components/EmergencyServicesComponent';
import NewsFeedComponent from './components/NewsFeedComponent';
import TwitterFeedComponent from './components/TwitterFeedComponent';
import './App.css';
import BodyComponent from './components/BodyComponent';


function App() {

  return (
    <div className="App">
      <HeaderComponent />
      <BodyComponent />
      <MapComponent />
      <NewsFeedComponent />
    </div>
  );
}

export default App;
