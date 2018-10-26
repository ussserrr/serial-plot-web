import Chart from 'chart.js';

function addPoint(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
}

function removePoint(chart) {
  chart.data.labels.shift();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.shift();
  });
}

const numPoints = 150;  // length of the visible plot
var pointsCnt = 0;  // count up to 'numPoints'

const charts = new Array(numPlots);
const chartsColors = ['rgb(255, 99, 132)',  // magenta
                      'rgb(0, 158, 224)'];  // cyan
for (var i=0; i<numPlots; i++) {
  charts[i] = new Chart(document.getElementById('chart'+i), {
    type: 'line',
    data: {
      datasets: [{
        label: 'Channel '+(i+1),
        // backgroundColor: 'rgb(255, 99, 132)',  // fill color
        borderColor: chartsColors[i],
        borderWidth: 2,
        pointRadius: 0
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: 4095,
            stepSize: 512
          }
        }],
        xAxes: [{
          type: 'time',
          time: {
            unit: 'second'
          },
          ticks: {
            maxRotation: 0
          },
        }]
      },
      // elements: {
      //   line: {
      //     tension: 0,  // disables bezier curves
      //   }
      // }
    }
  });
}


// overridden function, append new points and redraw
renderPlots = function() {
  pointsCnt++;
  for (var i=0; i<numPlots; i++) {
    if (pointsCnt > numPoints) {
      pointsCnt = numPoints + 1;  // limit the counter after reaching 'numPoints'
      removePoint(charts[i]);  // drop the old point ...
    }
    addPoint(charts[i], new Date().getTime(), pointsArr[i]);  // ... and add a new one
    charts[i].update();
  }
};
