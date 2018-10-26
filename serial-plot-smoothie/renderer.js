const Smoothie = require('smoothie');

const dataSets = new Array(numPlots);
const charts = new Array(numPlots);

// 0: green, 1st: red
const chartLineColors = ['rgba(0, 255, 0, 1)', 'rgba(255, 0, 0, 1)'];
const chartFillColors = ['rgba(0, 255, 0, 0.2)', 'rgba(255, 0, 0, 0.2)'];

for (var i=0; i<numPlots; i++) {
  dataSets[i] = new Smoothie.TimeSeries();

  charts[i] = new Smoothie.SmoothieChart({
    minValue: 0.0,
    maxValue: 4095.0,
    tooltip: true,
    timestampFormatter: Smoothie.SmoothieChart.timeFormatter,
    interpolation: 'linear'
  });

  charts[i].addTimeSeries(dataSets[i], {
    strokeStyle: chartLineColors[i],
    fillStyle: chartFillColors[i],
    lineWidth: 1
  });

  charts[i].streamTo(document.getElementById("chart"+i), 0);
}


// overridden function, append new points
renderPlots = function() {
  for (var i=0; i<numPlots; i++) {

    dataSets[i].append(
      new Date().getTime(),
      pointsArr[i]
    );

  }
};
