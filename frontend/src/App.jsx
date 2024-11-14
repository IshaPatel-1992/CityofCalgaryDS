import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import MapComponent from './components/MapComponent';
import BarChartComponent from './components/BarChartComponent';
import EmergencyServicesComponent from './components/EmergencyServicesComponent';
import NewsFeedComponent from './components/NewsFeedComponent';
import TwitterFeedComponent from './components/TwitterFeedComponent';
import './App.css';


function App() {

  return (
    <div className="App">
      <HeaderComponent />
      <MapComponent />
      <BarChartComponent />
      <EmergencyServicesComponent />
      <NewsFeedComponent />
      <TwitterFeedComponent />
    </div>
  );
}

export default App;
