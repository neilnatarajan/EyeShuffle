import {GoogleCharts} from 'google-charts';
GoogleCharts.load('current', {packages: ['corechart', 'bar']});


var bar_chart = {}; 
function makeBarChart() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/bar_chart', true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = (e) => {
    try {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        bar_chart = res.bar_chart;
        console.log(bar_chart);
        GoogleCharts.load(drawAxisTickColors);
      }   
    } catch(err) {
      console.log(err);
    }   
  };  
  xhr.send();
  
}
const EMOTIONS = ['happiness', 'anger', 'contempt', 'digust', 'fear', 'neutral', 'sadness', 'surprise'];

function drawAxisTickColors(){
 var data = new GoogleCharts.api.visualization.DataTable();
     
      data.addColumn('number', 'X');
      // data.addColumn('timeofday', 'Time of Day');
      // data.addColumn('number', 'Motivation Level');
      var data_rows = [];
      var index = 0; 

      for(let emotion of EMOTIONS){
        data.addColumn('number',emotion);
      }
      for(var key in bar_chart){
        // data.addColumn('number',key);

        //create the  row to be added
        const toAdd = [{v: parseInt(key), f: key}];
        console.log(key);
        for(let emotion of EMOTIONS){
          // var toAdd = [];
          toAdd.push(bar_chart[key][emotion] || 0);
          // data_rows.push([{v: [key], f: 'key'}, bar_chart[key][myKey]]);
        }
        data_rows.push(toAdd);
      }
      console.log(data_rows);
      data.addRows(data_rows);
      
      // data.addRows([
      //   [{v: [8, 0, 0], f: '8 am'}, 1],
      //   [{v: [9, 0, 0], f: '9 am'}, 2],
      //   [{v: [10, 0, 0], f:'10 am'}, 3],
      //   [{v: [11, 0, 0], f: '11 am'}, 4],
      //   [{v: [12, 0, 0], f: '12 pm'}, 5],
      //   [{v: [13, 0, 0], f: '1 pm'}, 6],
      //   [{v: [14, 0, 0], f: '2 pm'}, 7],
      //   [{v: [15, 0, 0], f: '3 pm'}, 8],
      //   [{v: [16, 0, 0], f: '4 pm'}, 9],
      //   [{v: [17, 0, 0], f: '5 pm'}, 10],
      // ]);

      var options = {
        title: 'Bar Chart',
        hAxis: {
          title: 'Demographic',
          viewWindow: {
            min: [7, 30, 0],
            max: [17, 30, 0]
          }
        },
        vAxis: {
          title: 'Number of Occurences of Emotion'
        }
      };

      var chart = new GoogleCharts.api.visualization.ColumnChart(
        document.getElementById('barchart_div'));

      chart.draw(data, options);  
}
export default makeBarChart; 
