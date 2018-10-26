Simplest client application that continuously retrieves data from the server, parses it and prints to the browser' console. Used as a base for another (graphical) front-ends.

Override `renderPlots` function in your custom front-end to refresh plots.

## Useful parameters
 - `webSocketPort`
 - `updateTimeout`: set how many points will be requested per unit of time. The bigger the value – the lesser CPU usage but also the lesser the time resolution
 - `numPlots`: a number of channels to read and plot
 - `isBench`: boolean, controls whether to measure and output a current number of points per second or not
