# Serial-plot-web
![cover](/serial-plot-smoothie/cover.png)


## Architecture
Project consists of 3 parts:

  - server (`serial-plot-server`)
    - responsible for the serial port communication (npm' `serialport` package)
    - WebSocket server to deliver serial port data (npm' `ws`)
    - Web Server for clients to connect (`express`)
  
  - client (`serial-plot-client`)
    - WebSocket to receive data from the server (native JS support)
    - parsing of this data (such behavior can be modified to delegate this task to the server)
    - function to be repeat for redrawing
    - (optional) simple benchmark to measure a number of points in 1 second

  - one of renderers (Epoch, Smoothie or Chart.js at the moment)
    - serve package-specific stuff


## Serial communication
Un-encoded simple integer binary data is assumed. You should transmit numbers in series according to number of channels (2 in this demo). Some out-of-sync situations can be meet though but it's possible to implement some sort of synchronization mechanism. And generally it should not be hard to set the app "on another rails" in terms of data format.


## Installation and configuration
To install modules go to each subdirectory (exclude `serial-plot-client`) and run `npm install` to install necessary dependencies. For front-ends you additionally needs to run `webpack` to collect plotting packages.


## Quick-start usage
Firstly connect your serial device. Run the server: `node serial-plot-server/server.js` (see [README.md](/serial-plot-server/README.md)). Start a browser and go to http://localhost:3000/serial-plot-client/client.html. Then open DevTools and in a console you will see serial port messages. Similarly you can run any of available graphic front-ends.


## Some notes about plotting packages
3 packages had been tested as a plotting tool and every has its own peculiarities. Some performance measures can be find in correspond directories – screenshots from Chrome' built-in profiler.

The best in both performance and visual appearance is Smoothie. It's fast, simple, can be easily integrated and has nice skin by default. Epoch is opposite: slow and requires additional files to be included. Chart.js is somewhere in the middle.

There are also another known charting and plotting libraries but they were not been applied to this project yet. Highcharts and CanvasJS are the most likely candidates for this position.


## TODOs
- [ ] dedicated 'public' directory (with allowed for clients content)
- [ ] demo mode (simulate the serial connection when it is not present)
- [ ] grid of plots MxN (CSS or something else)
- [ ] do not include 'dist' to repository (generate 'dist' directory on every new set-up)
- [ ] play/pause (basic control elements)
- [ ] additional front-ends (Highcharts, CanvasJS, ...)
