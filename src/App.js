import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Plot from 'react-plotly.js';

const GraphComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dataTypes, setDataTypes] = useState(['temperature', 'windspeed', 'rain']);  // Example data types
  const [selectedDataTypes, setSelectedDataTypes] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [layout, setLayout] = useState({
    width: 1000,  // Set the width of the graph
    height: 800  // Set the height of the graph
  });

  const fetchGraph = () => {
    const url = new URL('http://127.0.0.1:5000/get_graph');
    url.searchParams.append('start_date', `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')} 00:00`);
    url.searchParams.append('end_date', `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')} 23:59`);
    selectedDataTypes.forEach(type => url.searchParams.append('data_types', type));
    url.searchParams.append('aggregation_type', 'weekly');

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGraphData(data.data);
        console.log(url) // Set graph data (from backend)
        setLayout(prevLayout => ({ ...prevLayout, ...data.layout }));   // Set layout (from backend)
      })
      .catch((error) => console.error('Error fetching graph:', error));
  };

  const handleDataTypeChange = (event) => {
    const { options } = event.target;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setSelectedDataTypes(selected);
  };

  return (
    <div>
      <div>
        <label>Start Date:</label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      </div>
      <div>
        <label>End Date:</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      <div>
        <label>Data Types:</label>
        <select multiple={true} value={selectedDataTypes} onChange={handleDataTypeChange}>
          {dataTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <button onClick={fetchGraph}>Fetch Graph</button>
      <Plot data={graphData} layout={layout} />
    </div>
  );
};

export default GraphComponent;