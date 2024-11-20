import React from 'react';
import HeaderComponent from './components/HeaderComponent';
import MapComponent from './components/MapComponent';
import BarChartComponent from './components/BarChartComponent';
import EmergencyServicesComponent from './components/EmergencyServicesComponent';
import NewsFeedComponent from './components/NewsFeedComponent';
import TwitterFeedComponent from './components/TwitterFeedComponent';
import './App.css';
import BodyComponent from './components/BodyComponent';
import ContactUsComponent from './components/ContactUsComponent';
import FooterComponent from './components/FooterComponent.jsx'

function App() {

  return (
    <div className="App">
      <HeaderComponent />
      <BodyComponent />
      <MapComponent />
      <NewsFeedComponent />
      <ContactUsComponent />
      <FooterComponent />
    </div>
  );
}

export default App;
