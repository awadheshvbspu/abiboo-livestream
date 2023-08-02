import React from 'react';
import Chart from 'react-apexcharts';


const Charts = () => {
    const options = {
      chart: {
        id: 'double-line-chart',
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May','june','Jul','Aug','Sep','Oct','Nov','Dec'],
      },
      yaxis: {
        categories: [ 0, 50, 100, 150, 200,250],
      },
      yaxis: {
        min: 0,
        max: 250,
        breakpoints: [
            {
              from: 0,
              to: 50,
            
            },
            {
              from: 50,
              to: 100,
            },
            {
                from: 100,
                to: 150,
              },
              {
                from: 150,
                to: 200,
              },
              {
                from: 200,
                to: 250,
              },
          ],
          
      },
      title: {
        text: 'Total Streams',
        align: 'left',
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
          color: '#333',
          marginTop:'40px',
        },
      },
      
      stroke: {
        curve: 'smooth',
      },
      responsive: [
        {
          breakpoint: 50,
          options: {
            chart: {
              width: '100%',
            },
          },
        },
      ],
    };
    
  
    const series = [
      {
        name: 'Streams',
        data: [98, 40, 10, 90, 20,120, 20, 90, 30, 100,25,54],
        color:'#576462',
      },
      {
        name: 'Customers',
        data: [49, 6, 75, 15, 130,10, 120, 10, 80, 30,50,20],
        color:'#614635',
      },
    ];
  
    return (
      <div className="chart">
        <Chart options={options} series={series} type="line" height="400" style={{border:'20px solid  #d1c3b4',backgroundColor:'white', borderRadius:'40px',marginTop:'50px'}}/>
      </div>
    );
  };
   export default Charts;