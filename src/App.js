import React, { useState } from 'react';
import './App.css';
import Plot from 'react-plotly.js';

const GraphComponent = () => {
  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(7);
  const [day, setDay] = useState(1);  // For daily view
  const [viewType, setViewType] = useState('Monthly');  // Monthly or Daily
  const [dataType, setDataType] = useState('Both');
  const [graphData, setGraphData] = useState([]);
  const [layout, setLayout] = useState({});

  const fetchGraph = () => {
    let url;

    // Choose the API endpoint based on the selected view type (Monthly or Daily)
    if (viewType === 'Monthly') {
      url = `http://127.0.0.1:5000/get_graph?year=${year}&month=${month}&data_type=${dataType}`;
    } else if (viewType === 'Daily') {
      url = `http://127.0.0.1:5000/get_graph_for_day?year=${year}&month=${month}&day=${day}&data_type=${dataType}`;
    }

    // Fetch the graph data from the backend with the selected year, month, day (if applicable), and data type
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGraphData(data.data);  // Set graph data (from backend)
        setLayout(data.layout);   // Set layout (from backend)
      })
      .catch((error) => console.error('Error fetching graph:', error));
  };

  return (
    <div>
      {/* Flex container for select dropdowns and chart */}
      <div style={{ borderRadius: '8px', height: '100vh', display: 'flex', justifyContent: 'space-between', margin: '0 15%' }}>      
        {/* Left side: 1/3 width for dropdowns */}
        <div style={{borderRadius: '8px', flex: 1, maxHeight: '50%', maxWidth: '33%', background: '#3CB371', padding: '1rem'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <label style={{width: '200px', textAlign: 'center', marginBottom: '1rem', color: '#FFFFFF'}}>View Type:</label>
            <select style={{width: '200px', marginBottom: '1rem', padding: '0.5rem', border: 'none', borderRadius: '4px', background: '#FFFFFF'}} value={viewType} onChange={(e) => setViewType(e.target.value)}>
              <option value="Monthly">Monthly</option>
              <option value="Daily">Daily</option>
            </select>
            
            <label style={{width: '200px', textAlign: 'center', marginBottom: '1rem', color: '#FFFFFF'}}>Select Year</label>
            <select style={{width: '200px', marginBottom: '1rem', padding: '0.5rem', border: 'none', borderRadius: '4px', background: '#FFFFFF'}} value={year} onChange={(e) => setYear(e.target.value)}>
              {[2020, 2021, 2022, 2023].map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
  
            <label style={{width: '200px', textAlign: 'center', marginBottom: '1rem', color: '#FFFFFF'}}>Select Month</label>
            <select style={{width: '200px', marginBottom: '1rem', padding: '0.5rem', border: 'none', borderRadius: '4px', background: '#FFFFFF'}} value={month} onChange={(e) => setMonth(e.target.value)}>
              {[
                { name: 'January', value: 1 },
                { name: 'February', value: 2 },
                { name: 'March', value: 3 },
                { name: 'April', value: 4 },
                { name: 'May', value: 5 },
                { name: 'June', value: 6 },
                { name: 'July', value: 7 },
                { name: 'August', value: 8 },
                { name: 'September', value: 9 },
                { name: 'October', value: 10 },
                { name: 'November', value: 11 },
                { name: 'December', value: 12 },
              ].map((mnth) => (
                <option key={mnth.value} value={mnth.value}>
                  {mnth.name}
                </option>
              ))}
            </select>
  
            {viewType === 'Daily' && (
              <>
                <label style={{width: '200px', textAlign: 'center', marginBottom: '1rem', color: '#FFFFFF'}}>Select Day</label>
                <input 
                  style={{width: '200px', marginBottom: '1rem', padding: '0.5rem', border: 'none', borderRadius: '4px', background: '#FFFFFF'}}
                  type="number"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  min="1"
                  max="31"
                />
              </>
            )}
  
            <label style={{width: '200px', textAlign: 'center', marginBottom: '1rem', color: '#FFFFFF'}}>Select Data Type</label>
            <select style={{width: '200px', marginBottom: '1rem', padding: '0.5rem', border: 'none', borderRadius: '4px', background: '#FFFFFF'}} value={dataType} onChange={(e) => setDataType(e.target.value)}>
              {['Temperature', 'Rain', 'Wind', 'Both'].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
  
            <button onClick={fetchGraph} style={{width: '200px', marginTop: '1rem', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', backgroundColor: '#FF7F50', color: '#FFFFFF'}}>Load Graph</button>
          </div>
        </div>
        
        {/* Right side: 2/3 width for chart */}
        <div style={{ borderRadius: '8px', flex: 2, maxHeight: '50%', maxWidth: '66%',  marginLeft: '8rem', background: 'lightgray'}}>
          {graphData.length > 0 && (
            <Plot
              data={graphData}
              layout={layout}
              style={{ width: '100%', height: '100%' }}  // Adjust the size of the graph
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphComponent;
