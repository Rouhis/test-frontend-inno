import React, { useState } from 'react';
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
      <h1>Plotly Graph from Flask Backend</h1>

      {/* Dropdown for view type (Monthly or Daily) */}
      <label>View Type:</label>
      <select value={viewType} onChange={(e) => setViewType(e.target.value)}>
        <option value="Monthly">Monthly</option>
        <option value="Daily">Daily</option>
      </select>

      {/* Dropdown for year */}
      <label>Year:</label>
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        {[2020, 2021, 2022, 2023].map((yr) => (
          <option key={yr} value={yr}>
            {yr}
          </option>
        ))}
      </select>

      {/* Dropdown for month */}
      <label>Month:</label>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
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

      {/* Input for day selection, only shown when viewType is Daily */}
      {viewType === 'Daily' && (
        <>
          <label>Day:</label>
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            min="1"
            max="31"
          />
        </>
      )}

      {/* Dropdown for data type */}
      <label>Data Type:</label>
      <select value={dataType} onChange={(e) => setDataType(e.target.value)}>
        {['Temperature', 'Rain', 'Wind', 'Both'].map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* Button to fetch the graph */}
      <button onClick={fetchGraph}>Load Graph</button>

      {/* Render the graph using Plotly */}
      {graphData.length > 0 && (
        <Plot
          data={graphData}
          layout={layout}
          style={{ width: '100%', height: '100%' }}  // Adjust the size of the graph
        />
      )}
    </div>
  );
};

export default GraphComponent;
