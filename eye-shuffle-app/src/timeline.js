import {GoogleCharts} from 'google-charts';
GoogleCharts.load('current', {packages: ['corechart', 'line']});


var trend_list = [];
function makeChart() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/trend_list', true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = (e) => {
    try {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        trend_list = res.trend_list;
        console.log(trend_list);
        GoogleCharts.load(drawBasic);
      }
    } catch(err) {
      console.log(err);
    }
  };
  xhr.send();
  
}

function drawBasic() {

      var data = new GoogleCharts.api.visualization.DataTable();
      data.addColumn('number', 'X');
      for (var key in trend_list[0]) {
        data.addColumn('number', key);
      }

      var data_arr = [];
      for (var i = 0; i < trend_list.length; i++) {
        var data_point = [i];
        for (var key in trend_list[i]) {
          data_point.push(trend_list[i][key]);
        }
        data_arr.push(data_point);
      }
      data.addRows(data_arr);

      var options = {
        hAxis: {
          title: 'Frame'
        },
        vAxis: {
          title: 'Sentiment'
        }
      };

      var chart = new GoogleCharts.api.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    }


export default makeChart;
