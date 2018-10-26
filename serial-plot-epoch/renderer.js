require("d3");
require("epoch-charting");

const dataSets = new Array(numPlots);
const charts = new Array(numPlots);

for (var i=0, now=new Date().getTime(); i<numPlots; i++) {
  dataSets[i] = [{
    label: 'Series ' + i,
    values: [{
      time: now,
      y: 0.0
    }]  // we need initial data
  }];

  charts[i] = $('#line' + i).epoch({
    type: 'time.line',
    data: dataSets[i],
    axes: ['left', 'bottom'],
    fps: 60,
    queueSize: 1,
    range: [0, 4095]
  });
}


// overridden function, append new points
renderPlots = function() {
  for (var i=0; i<numPlots; i++) {

    charts[i].push( [{
      time: new Date().getTime(),
      y: pointsArr[i]
    }] );

  }
};
