import {GoogleCharts} from 'google-charts';
GoogleCharts.load('current', {packages: ['corechart', 'bar']});


var trend_list = []; 
function makeBarChart() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/trend_list', true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = (e) => {
    try {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        trend_list = res.trend_list;
        console.log(trend_list);
        GoogleCharts.load(drawAxisTickColors);
      }   
    } catch(err) {
      console.log(err);
    }   
  };  
  xhr.send();
  
}

function drawAxisTickColors(){
 var data = new GoogleCharts.api.visualization.DataTable();
      data.addColumn('timeofday', 'Time of Day');
      data.addColumn('number', 'Motivation Level');

      data.addRows([
        [{v: [8, 0, 0], f: '8 am'}, 1],
        [{v: [9, 0, 0], f: '9 am'}, 2],
        [{v: [10, 0, 0], f:'10 am'}, 3],
        [{v: [11, 0, 0], f: '11 am'}, 4],
        [{v: [12, 0, 0], f: '12 pm'}, 5],
        [{v: [13, 0, 0], f: '1 pm'}, 6],
        [{v: [14, 0, 0], f: '2 pm'}, 7],
        [{v: [15, 0, 0], f: '3 pm'}, 8],
        [{v: [16, 0, 0], f: '4 pm'}, 9],
        [{v: [17, 0, 0], f: '5 pm'}, 10],
      ]);

      var options = {
        title: 'Motivation Level Throughout the Day',
        hAxis: {
          title: 'Time of Day',
          format: 'h:mm a',
          viewWindow: {
            min: [7, 30, 0],
            max: [17, 30, 0]
          }
        },
        vAxis: {
          title: 'Rating (scale of 1-10)'
        }
      };

      var chart = new GoogleCharts.api.visualization.ColumnChart(
        document.getElementById('barchart_div'));

      chart.draw(data, options);  
}
export default makeBarChart; 
