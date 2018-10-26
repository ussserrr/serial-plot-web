function parseInts32LE(hexString) {
  /*
   *  Parse string of hex digits to array of 32-bit-width little endian
   *  integers
   *
   *  To test use value
   *  hex_str = "237A08002A2C0A0071F25B2E";  // 555555 666666 777777777
   */

  const bytesInInt = 4;  // 32-bit value
  // truncate the string if its length is not a multiple of 'bytesInInt'
  const intsInStr = Math.floor(hexString.length / (bytesInInt*2));

  var ints = [];
  for (var i=0; i<intsInStr; i++) {
    var intStr = '';
    // rearrange each string to convert to little endian
    for (var j=0; j<bytesInInt; j++) {
      intStr += hexString.substring((i*2*bytesInInt) + ((bytesInInt*2-2)-(j*2)),
                                    (i*2*bytesInInt) + ((bytesInInt*2)-(j*2)) );
    }
    ints.push(parseInt(intStr, 16));  // base - 16 (hex)
  }

  return ints;
}



/*
 *  WebSocket client section
 */
const webSocketPort = 1200;
const socket = new WebSocket('ws://192.168.1.214:' + webSocketPort);
socket.addEventListener('open', function(event) {
  console.log("web socket is open on client");
  socket.send("start");  // send something to start getting values
});

socket.addEventListener('message', function(event) {
  const hexStr = event.data;
  pointsArr = parseInts32LE(hexStr);
});



/*
 *  Plotting section
 */
const updateTimeout = 50;  // ms
const numPlots = 2;
var pointsArr = new Array(numPlots);

// benchmark
const isBench = true;
if (isBench) {
  var cnt = 0;
  var prevTime = 0;
}

// override this function in 'renderer.js' to change default actions
var renderPlots = function() {
  pointsArr.forEach((point, i) => {
    console.log("ch" + i + ": " + point);
  });
  console.log('\n');
};

function updatePlots() {
  // benchmark
  if (isBench) {
    cnt++;
    const currentTime = performance.now();
    if ( (currentTime-prevTime) >= 1000 ) {
      console.log(cnt);
      prevTime = currentTime;
      cnt = 0;
    }
  }

  renderPlots();

  if (socket.readyState == 1) {  // 1: OPEN
    socket.send('');  // send something to get next point
  }
}

setInterval(updatePlots, updateTimeout);
