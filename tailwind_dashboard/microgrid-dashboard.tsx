import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie, Sector, LineChart, Line, ScatterChart, Scatter, ZAxis, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts';
import * as d3 from 'd3';
import _ from 'lodash';
import Papa from 'papaparse';

// Custom color palette for our visualizations
const COLORS = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', 
  '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
  '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5'
];

// Darker variations for hover effects
const DARK_COLORS = COLORS.map(color => {
  // Convert hex to RGB, darken, convert back to hex
  const r = Math.max(0, parseInt(color.slice(1, 3), 16) - 40);
  const g = Math.max(0, parseInt(color.slice(3, 5), 16) - 40);
  const b = Math.max(0, parseInt(color.slice(5, 7), 16) - 40);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
});

const CustomTooltip = ({ active, payload, label, valueFormat = val => val, nameFormat = name => name }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg border border-gray-700">
        <p className="font-bold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {nameFormat(entry.name)}: {valueFormat(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const renderActiveShape = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-midAngle * Math.PI / 180);
  const cos = Math.cos(-midAngle * Math.PI / 180);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#fff" className="text-sm">
        {payload.name}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#fff" className="text-sm">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={36} textAnchor={textAnchor} fill="#FFBB28" className="text-sm">
        {`${value.toLocaleString()} kW`}
      </text>
    </g>
  );
};

const HeatMapCell = ({ x, y, width, height, value, min, max, label }) => {
  const ratio = Math.min(1, Math.max(0, (value - min) / (max - min)));
  // Color scale from blue to red through green
  const color = d3.interpolateRgb("#2166ac", "#f4a582")(ratio);
  const textColor = ratio > 0.6 ? '#fff' : '#000';
  
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        className="transition-all duration-300 hover:opacity-80"
      />
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textColor}
        fontSize={10}
        fontWeight="bold"
      >
        {value > 0 ? value.toLocaleString() : '-'}
      </text>
      <title>{`${label}: ${value.toLocaleString()} kW`}</title>
    </g>
  );
};

const MicrogridDashboard = () => {
  const [microgridData, setMicrogridData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [activePieIndex, setActivePieIndex] = useState(0);
  const [activeHeatmapMetric, setActiveHeatmapMetric] = useState('total');
  const [topStates, setTopStates] = useState([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await window.fs.readFile('Microgrid Dataset.xlsx');
        
        // Use SheetJS to parse the Excel file
        const workbook = XLSX.read(response, {
          cellDates: true
        });
        
        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        
        // Clean up the data
        const cleanedData = jsonData.map(row => ({
          ...row,
          // Convert all capacity fields to numbers and handle missing values
          'Total Capacity (kW)': parseFloat(row['Total Capacity (kW)'] || 0) || 0,
          'Generation Capacity (kW)': parseFloat(row['Generation Capacity (kW)'] || 0) || 0,
          'Storage Capacity (kW)': parseFloat(row['Storage Capacity (kW)'] || 0) || 0,
          'CHP Capacity (kW)': parseFloat(row['CHP Capacity (kW)'] || 0) || 0,
          'Solar Capacity (kW)': parseFloat(row['Solar Capacity (kW)'] || 0) || 0,
          'Wind Capacity (kW)': parseFloat(row['Wind Capacity (kW)'] || 0) || 0,
          'Hydro Capacity (kW)': parseFloat(row['Hydro Capacity (kW)'] || 0) || 0,
          'Fuel Cell Capacity (kW)': parseFloat(row['Fuel Cell Capacity (kW)'] || 0) || 0,
          'Diesel Capacity (kW)': parseFloat(row['Diesel Capacity (kW)'] || 0) || 0,
          'Natural Gas Capacity (kW)': parseFloat(row['Natural Gas Capacity (kW)'] || 0) || 0,
          'Biogas Capacity (kW)': parseFloat(row['Biogas Capacity (kW)'] || 0) || 0,
          'Other Capacity (kW)': parseFloat(row['Other Capacity (kW)'] || 0) || 0,
          'Energy Storage (kWh)': parseFloat(row['Energy Storage (kWh)'] || 0) || 0,
          // Handle text fields
          'State': row['State'] || 'Unknown',
          'Project/Facility Name': row['Project/Facility Name'] || 'Unknown',
          'Grid Connected': row['Grid Connected'] || 'Unknown',
          'Primary Application': row['Primary Application'] || 'Other',
          'Operational Year': row['Operational Year'] ? String(row['Operational Year']) : 'Unknown',
        }));
        
        console.log("Loaded data:", cleanedData.length, "rows");
        setMicrogridData(cleanedData);
        
        // Get top 10 states by number of microgrids
        const stateCount = _.countBy(cleanedData, 'State');
        const topStatesByCount = Object.entries(stateCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([state]) => state);
        
        setTopStates(topStatesByCount);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Prepare data for visualizations
  
  // 1. Total capacity by technology type
  const techColumns = [
    'Solar Capacity (kW)',
    'Wind Capacity (kW)',
    'Hydro Capacity (kW)',
    'Fuel Cell Capacity (kW)',
    'Diesel Capacity (kW)',
    'Natural Gas Capacity (kW)',
    'Biogas Capacity (kW)',
    'CHP Capacity (kW)',
    'Other Capacity (kW)'
  ];
  
  const techNames = {
    'Solar Capacity (kW)': 'Solar',
    'Wind Capacity (kW)': 'Wind',
    'Hydro Capacity (kW)': 'Hydro',
    'Fuel Cell Capacity (kW)': 'Fuel Cell',
    'Diesel Capacity (kW)': 'Diesel',
    'Natural Gas Capacity (kW)': 'Natural Gas',
    'Biogas Capacity (kW)': 'Biogas',
    'CHP Capacity (kW)': 'CHP',
    'Other Capacity (kW)': 'Other'
  };
  
  const totalByTech = techColumns.map(tech => {
    const total = microgridData.reduce((sum, item) => sum + (item[tech] || 0), 0);
    return {
      name: techNames[tech],
      value: total
    };
  }).filter(item => item.value > 0).sort((a, b) => b.value - a.value);
  
  // 2. Storage capacity distribution
  const storageData = microgridData
    .filter(item => item['Energy Storage (kWh)'] > 0)
    .map(item => ({
      name: item['Project/Facility Name'] || 'Unknown',
      storage: item['Energy Storage (kWh)'] || 0,
      capacity: item['Total Capacity (kW)'] || 0,
      state: item['State'] || 'Unknown'
    }))
    .sort((a, b) => b.storage - a.storage)
    .slice(0, 20);
  
  // 3. Technology mix by state (for our heatmap)
  const heatmapData = {};
  if (topStates.length > 0) {
    topStates.forEach(state => {
      const stateData = microgridData.filter(item => item['State'] === state);
      
      const stateTotal = {
        total: stateData.reduce((sum, item) => sum + (item['Total Capacity (kW)'] || 0), 0),
        generation: stateData.reduce((sum, item) => sum + (item['Generation Capacity (kW)'] || 0), 0),
        storage: stateData.reduce((sum, item) => sum + (item['Storage Capacity (kW)'] || 0), 0),
      };
      
      const techTotals = techColumns.reduce((acc, tech) => {
        const techName = techNames[tech];
        acc[techName.toLowerCase()] = stateData.reduce((sum, item) => sum + (item[tech] || 0), 0);
        return acc;
      }, {});
      
      heatmapData[state] = {
        ...stateTotal,
        ...techTotals
      };
    });
  }
  
  // 4. Deployment over time
  const timeData = _(microgridData)
    .filter(item => item['Operational Year'] && !isNaN(parseInt(item['Operational Year'])))
    .groupBy(item => item['Operational Year'])
    .map((items, year) => ({
      year: parseInt(year),
      count: items.length,
      totalCapacity: items.reduce((sum, item) => sum + (item['Total Capacity (kW)'] || 0), 0),
      storageCapacity: items.reduce((sum, item) => sum + (item['Storage Capacity (kW)'] || 0), 0),
      solar: items.reduce((sum, item) => sum + (item['Solar Capacity (kW)'] || 0), 0),
      wind: items.reduce((sum, item) => sum + (item['Wind Capacity (kW)'] || 0), 0),
      hydro: items.reduce((sum, item) => sum + (item['Hydro Capacity (kW)'] || 0), 0),
      diesel: items.reduce((sum, item) => sum + (item['Diesel Capacity (kW)'] || 0), 0),
      natural_gas: items.reduce((sum, item) => sum + (item['Natural Gas Capacity (kW)'] || 0), 0),
    }))
    .filter(item => item.year >= 1980 && item.year <= 2025)
    .sortBy('year')
    .value();
  
  // 5. Grid connectivity stats
  const gridStats = _(microgridData)
    .groupBy(item => item['Grid Connected'] || 'Unknown')
    .map((items, status) => ({
      name: status,
      value: items.length
    }))
    .filter(item => item.name !== 'Unknown' || item.value > 0)
    .value();
  
  // 6. Primary application stats
  const applicationStats = _(microgridData)
    .groupBy(item => item['Primary Application'] || 'Other')
    .map((items, app) => ({
      name: app,
      value: items.length
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)
    .value();
  
  // 7. Storage capacity relation to total capacity
  const storageRelation = microgridData
    .filter(item => 
      item['Energy Storage (kWh)'] > 0 && 
      item['Total Capacity (kW)'] > 0
    )
    .map(item => ({
      totalCapacity: item['Total Capacity (kW)'],
      storageCapacity: item['Energy Storage (kWh)'],
      state: item['State'] || 'Unknown',
      name: item['Project/Facility Name'] || 'Unknown',
    }));
  
  // 8. Technology mix radar chart data
  const radarData = topStates.slice(0, 5).map(state => {
    const stateData = heatmapData[state] || {};
    return {
      state,
      solar: stateData.solar || 0,
      wind: stateData.wind || 0,
      hydro: stateData.hydro || 0,
      diesel: stateData.diesel || 0,
      natural_gas: stateData.natural_gas || 0,
      chp: stateData.chp || 0,
    };
  });
  
  // 9. Technology mix over time
  const techOverTime = timeData
    .filter(item => item.year >= 2010)
    .map(item => ({
      year: item.year,
      Solar: item.solar || 0,
      Wind: item.wind || 0,
      Hydro: item.hydro || 0,
      Diesel: item.diesel || 0,
      'Natural Gas': item.natural_gas || 0,
    }));
  
  // Prepare heatmap data based on selected metric
  const prepareHeatmapData = () => {
    if (!topStates.length || Object.keys(heatmapData).length === 0) return [];
    
    const metrics = activeHeatmapMetric === 'total' 
      ? techColumns.map(col => techNames[col].toLowerCase())
      : ['total', 'generation', 'storage'];
    
    return topStates.map(state => {
      const result = { state };
      metrics.forEach(metric => {
        result[metric] = heatmapData[state]?.[metric] || 0;
      });
      return result;
    });
  };
  
  const heatmapMetricData = prepareHeatmapData();
  
  const getHeatmapMax = () => {
    if (activeHeatmapMetric === 'total') {
      return Math.max(...Object.values(heatmapData).flatMap(state => 
        Object.entries(state)
          .filter(([key]) => techColumns.map(col => techNames[col].toLowerCase()).includes(key))
          .map(([_, value]) => value)
      ));
    } else {
      return Math.max(...Object.values(heatmapData).map(state => state[activeHeatmapMetric] || 0));
    }
  };
  
  // Format numbers with commas
  const numberFormatter = (number) => {
    return number.toLocaleString();
  };
  
  // Calculate the totals
  const totalCapacity = microgridData.reduce((sum, item) => sum + (item['Total Capacity (kW)'] || 0), 0);
  const totalGeneration = microgridData.reduce((sum, item) => sum + (item['Generation Capacity (kW)'] || 0), 0);
  const totalStorage = microgridData.reduce((sum, item) => sum + (item['Energy Storage (kWh)'] || 0), 0);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center text-white">
        <div className="text-2xl font-bold">Loading Microgrid Data...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-4">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-400 mb-2 md:mb-0">Microgrid Power Analysis Dashboard</h1>
        <div className="bg-gray-800 p-2 rounded-lg flex gap-4">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400">TOTAL CAPACITY</span>
            <span className="text-xl font-bold text-blue-400">{numberFormatter(totalCapacity)} kW</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400">GENERATION</span>
            <span className="text-xl font-bold text-green-400">{numberFormatter(totalGeneration)} kW</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400">STORAGE</span>
            <span className="text-xl font-bold text-orange-400">{numberFormatter(totalStorage)} kWh</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400">MICROGRIDS</span>
            <span className="text-xl font-bold text-purple-400">{numberFormatter(microgridData.length)}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex mb-6 border-b border-gray-700">
        <button 
          className={`px-4 py-2 font-semibold ${activeTab === 'overview' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('overview')}
        >
          Power Generation Overview
        </button>
        <button 
          className={`px-4 py-2 font-semibold ${activeTab === 'storage' ? 'text-orange-400 border-b-2 border-orange-400' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('storage')}
        >
          Storage Capacity
        </button>
        <button 
          className={`px-4 py-2 font-semibold ${activeTab === 'geographic' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('geographic')}
        >
          Geographic Distribution
        </button>
        <button 
          className={`px-4 py-2 font-semibold ${activeTab === 'trends' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('trends')}
        >
          Temporal Trends
        </button>
      </div>

      {/* Content Sections */}
      <div className="flex-1">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technology Mix Pie Chart */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Power Generation Mix</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activePieIndex}
                      activeShape={renderActiveShape}
                      data={totalByTech}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                      onMouseEnter={(_, index) => setActivePieIndex(index)}
                    >
                      {totalByTech.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip valueFormat={val => `${numberFormatter(val)} kW`} />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {totalByTech.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 mr-1"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-xs">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Top Technologies Bar Chart */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Capacity by Technology (kW)</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={totalByTech}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis type="number" tickFormatter={numberFormatter} stroke="#aaa" />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={80} 
                      stroke="#aaa"
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      formatter={(value) => [numberFormatter(value) + ' kW', 'Capacity']}
                      contentStyle={{ backgroundColor: '#333', border: 'none' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {totalByTech.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Primary Applications */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Primary Applications</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={applicationStats}
                    margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis type="number" stroke="#aaa" />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={120}
                      stroke="#aaa"
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      formatter={(value) => [value, 'Count']}
                      contentStyle={{ backgroundColor: '#333', border: 'none' }}
                    />
                    <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]}>
                      {applicationStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Grid Connectivity */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Grid Connectivity</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gridStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {gridStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
        
        {/* Storage Tab */}
        {activeTab === 'storage' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Facilities by Storage Capacity */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg md:col-span-2">
              <h2 className="text-xl font-bold mb-4 text-center">Top Facilities by Storage Capacity (kWh)</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={storageData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis type="number" tickFormatter={numberFormatter} stroke="#aaa" />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={150}
                      stroke="#aaa"
                      tick={{ fontSize: 10 }}
                    />
                    <Tooltip 
                      formatter={(value) => [numberFormatter(value) + ' kWh', 'Storage Capacity']}
                      contentStyle={{ backgroundColor: '#333', border: 'none' }}
                    />
                    <Bar dataKey="storage" fill="#f39c12" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Storage vs Total Capacity Scatter Plot */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Storage vs Total Capacity</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis 
                      type="number" 
                      dataKey="totalCapacity" 
                      name="Total Capacity" 
                      unit=" kW"
                      stroke="#aaa"
                      tickFormatter={numberFormatter}
                      label={{ value: 'Total Capacity (kW)', position: 'insideBottom', offset: -10, fill: '#aaa' }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="storageCapacity" 
                      name="Storage Capacity" 
                      unit=" kWh"
                      stroke="#aaa"
                      tickFormatter={numberFormatter}
                      label={{ value: 'Storage Capacity (kWh)', position: 'insideLeft', angle: -90, offset: -15, fill: '#aaa' }}
                    />
                    <ZAxis range={[50, 400]} />
                    <Tooltip 
                      formatter={(value) => [numberFormatter(value), '']}
                      contentStyle={{ backgroundColor: '#333', border: 'none' }}
                    />
                    <Scatter name="Storage Relation" data={storageRelation} fill="#ff7f0e" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Storage Capacity by State */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Storage Capacity by State (kWh)</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={topStates.map(state => ({ 
                      state, 
                      storage: _.sumBy(
                        microgridData.filter(item => item['State'] === state), 
                        'Energy Storage (kWh)'
                      )
                    })).sort((a, b) => b.storage - a.storage)}
                    margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="state" stroke="#aaa" />
                    <YAxis tickFormatter={numberFormatter} stroke="#aaa" />
                    <Tooltip 
                      formatter={(value) => [numberFormatter(value) + ' kWh', 'Storage Capacity']}
                      contentStyle={{ backgroundColor: '#333', border: 'none' }}
                    />
                    <Bar dataKey="storage" fill="#f39c12" radius={[4, 4, 0, 0]}>
                      {topStates.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
        
        {/* Geographic Tab */}
        {activeTab === 'geographic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Heat Map Controls */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg md:col-span-2 flex items-center justify-between">
              <h2 className="text-xl font-bold">Technology Distribution Heat Map</h2>
              <div className="flex gap-2">
                <button 
                  className={`px-3 py-1 rounded ${activeHeatmapMetric === 'total' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                  onClick={() => setActiveHeatmapMetric('total')}
                >
                  By Technology
                </button>
                <button 
                  className={`px-3 py-1 rounded ${activeHeatmapMetric === 'capacity' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                  onClick={() => setActiveHeatmapMetric('capacity')}
                >
                  By Capacity Type
                </button>
              </div>
            </div>
            
            {/* Heat Map */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg md:col-span-2">
              <div className="h-96">
                {activeHeatmapMetric === 'total' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topStates.map(state => {
                        const stateData = heatmapData[state];
                        return {
                          state,
                          solar: stateData?.solar || 0,
                          wind: stateData?.wind || 0,
                          hydro: stateData?.hydro || 0,
                          'fuel cell': stateData?.['fuel cell'] || 0,
                          diesel: stateData?.diesel || 0,
                          'natural gas': stateData?.['natural gas'] || 0,
                          biogas: stateData?.biogas || 0,
                          chp: stateData?.chp || 0,
                          other: stateData?.other || 0,
                        };
                      })}
                      margin={{ top: 20, right: 30, left: 30, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis 
                        dataKey="state" 
                        stroke="#aaa"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                        interval={0}
                      />
                      <YAxis 
                        tickFormatter={numberFormatter} 
                        stroke="#aaa"
                        label={{ value: 'Capacity (kW)', angle: -90, position: 'insideLeft', offset: -10, fill: '#aaa' }}
                      />
                      <Tooltip 
                        formatter={(value) => [numberFormatter(value) + ' kW', '']}
                        contentStyle={{ backgroundColor: '#333', border: 'none' }}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Bar dataKey="solar" name="Solar" stackId="a" fill="#f1c40f" />
                      <Bar dataKey="wind" name="Wind" stackId="a" fill="#3498db" />
                      <Bar dataKey="hydro" name="Hydro" stackId="a" fill="#2ecc71" />
                      <Bar dataKey="fuel cell" name="Fuel Cell" stackId="a" fill="#9b59b6" />
                      <Bar dataKey="diesel" name="Diesel" stackId="a" fill="#e74c3c" />
                      <Bar dataKey="natural gas" name="Natural Gas" stackId="a" fill="#1abc9c" />
                      <Bar dataKey="biogas" name="Biogas" stackId="a" fill="#d35400" />
                      <Bar dataKey="chp" name="CHP" stackId="a" fill="#7f8c8d" />
                      <Bar dataKey="other" name="Other" stackId="a" fill="#95a5a6" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
                
                {activeHeatmapMetric === 'capacity' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topStates.map(state => {
                        const stateData = heatmapData[state];
                        return {
                          state,
                          generation: stateData?.generation || 0,
                          storage: stateData?.storage || 0
                        };
                      })}
                      margin={{ top: 20, right: 30, left: 30, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis 
                        dataKey="state" 
                        stroke="#aaa"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                        interval={0}
                      />
                      <YAxis 
                        tickFormatter={numberFormatter} 
                        stroke="#aaa"
                        label={{ value: 'Capacity (kW)', angle: -90, position: 'insideLeft', offset: -10, fill: '#aaa' }}
                      />
                      <Tooltip 
                        formatter={(value) => [numberFormatter(value) + ' kW', '']}
                        contentStyle={{ backgroundColor: '#333', border: 'none' }}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Bar dataKey="generation" name="Generation Capacity" fill="#3498db" />
                      <Bar dataKey="storage" name="Storage Capacity" fill="#f39c12" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
            
            {/* Technology Radar Chart */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Technology Mix Comparison (Top 5 States)</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={90} data={radarData}>
                    <PolarGrid stroke="#555" />
                    <PolarAngleAxis dataKey="state" tick={{ fill: '#aaa' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 'auto']} tickFormatter={value => {
                      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                      if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                      return value;
                    }} />
                    {Object.keys(radarData[0] || {}).filter(key => key !== 'state').map((key, index) => (
                      <Radar 
                        key={key}
                        name={key.charAt(0).toUpperCase() + key.slice(1)} 
                        dataKey={key} 
                        stroke={COLORS[index % COLORS.length]} 
                        fill={COLORS[index % COLORS.length]} 
                        fillOpacity={0.6} 
                      />
                    ))}
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Microgrids by State */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Microgrids by State</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={_(microgridData)
                      .countBy('State')
                      .map((count, state) => ({ state, count }))
                      .sortBy(item => -item.count)
                      .slice(0, 10)
                      .value()}
                    margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="state" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {topStates.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
        
        {/* Trends Tab */}
        {activeTab === 'trends' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deployment Over Time */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg md:col-span-2">
              <h2 className="text-xl font-bold mb-4 text-center">Microgrid Deployment by Year</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeData}
                    margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="year" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip 
                      formatter={(value) => [value, 'Count']}
                      contentStyle={{ backgroundColor: '#333', border: 'none' }}
                    />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" dot={{ stroke: '#8884d8', strokeWidth: 2 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Total Capacity Over Time */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Total Capacity by Year (kW)</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeData}
                    margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="year" stroke="#aaa" />
                    <YAxis 
                      tickFormatter={value => {
                        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                        if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                        return value;
                      }} 
                      stroke="#aaa"
                    />
                    <Tooltip 
                      formatter={(value) => [numberFormatter(value) + ' kW', 'Capacity']}
                      contentStyle={{ backgroundColor: '#333', border: 'none' }}
                    />
                    <Line type="monotone" dataKey="totalCapacity" stroke="#27ae60" strokeWidth={2} dot={{ stroke: '#27ae60', strokeWidth: 2 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Technology Mix Over Time */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Technology Evolution (2015-2024)</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={techOverTime}
                    margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="year" stroke="#aaa" />
                    <YAxis 
                      tickFormatter={value => {
                        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                        if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                        return value;
                      }}
                      stroke="#aaa"
                    />
                    <Tooltip 
                      formatter={(value) => [numberFormatter(value) + ' kW', '']}
                      contentStyle={{ backgroundColor: '#333', border: 'none' }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="Solar" stackId="1" stroke="#f1c40f" fill="#f1c40f" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="Wind" stackId="1" stroke="#3498db" fill="#3498db" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="Hydro" stackId="1" stroke="#2ecc71" fill="#2ecc71" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="Diesel" stackId="1" stroke="#e74c3c" fill="#e74c3c" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="Natural Gas" stackId="1" stroke="#1abc9c" fill="#1abc9c" fillOpacity={0.8} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Dashboard Footer */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Microgrid Power Analysis Dashboard • {microgridData.length} Microgrids Analyzed</p>
      </div>
    </div>
  );
};

export default MicrogridDashboard;