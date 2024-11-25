import React, { useEffect, useState } from 'react';
import './NewsFeedComponent.css';

const NewsFeedComponent = () => {
  const [newsItems, setNewsItems] = useState([]);
  const fetchUrl = "https://newsroom.calgary.ca/tagfeed/en/tags/Police";

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "application/xml");
        const items = xmlDoc.querySelectorAll("item");

        const newsArray = [];
        for (let i = 0; i < 2; i++) {
          const title = items[i]?.childNodes[1]?.textContent || "";
          const description = items[i]?.childNodes[7]?.textContent || "";
          const pubDate = items[i]?.childNodes[10]?.textContent || "";

          newsArray.push({ title, description, pubDate });
        }

        setNewsItems(newsArray);
      } catch (error) {
        console.error("Error fetching the RSS feed: ", error);
      }
    };

    fetchRSS();
  }, []); // Runs only once when the component is mounted



  return (
    <div id="scroll-container">
      {newsItems.length > 0 ? (
        newsItems.map((item, index) => (
          <div key={index} className="news-item">
            <h3>{item.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: item.description}}></p>
            <p className="pubdate">{item.pubDate}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};


export default NewsFeedComponent;