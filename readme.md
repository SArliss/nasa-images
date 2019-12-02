# NASA IMAGES 

## General info
This webpage uses an API to access the NASA database and allows user to perform a search for images. 
It also features a different astronomy and space science related image each day, along with a brief explanation written by a professional astronomer. 
	
## API
JSON is returned by all API responses, including errors. 

```
https://api.nasa.gov
```

#### HTTP Request:

Astronomy Picture of the Day:
```
https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
```
NASA Image library: 
```
https://images-api.nasa.gov/search?q=moon&media_type=image
```

At least one parameter is required, but all individual parameters are optional. 

Search results will come in the form of Collection+JSON, which contains results and information about how to retrieve more  details about each result. In the example above it will return a colection of objects with title "moon" and and media_type "image". 

## Wireframe

![Mockup](/mockup-nasa-images.png)

## Features
1 - Main page automatically loads the featured astronomy picture of the day

2 - User has the option to type a word (string) in the input field and search for images 

2 - An event listener with an async function is activated when user presses enter or clicks on search button 
  * It makes a request of data from NASA library 
  * Saves the data in a variable "results" 
  * Then it calls a render function passing results as its parameter 

3 - Render function 
  * Selects the pieces of data we want to show from the results (title, year, picture) 
  * A for loop iterates through the results 
  * Elements are created and appended in the DOM
  * Data is shown on the website 

4 - Open image 
  * If user clicks on one image, it opens a new tab with a larger version of the same image 

## Hosting with surge 
```
http://nasaimages.surge.sh
```
## Background source

Copyright (c) 2019 by WebSonick https://codepen.io/WebSonick/pen/vjmgu

```
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
```

## Aditional Features
* Add the description of the image on larger version.
* Add a third api to show the current weather on other planets. 
* Add trends search section.
* Fixed header and footer with scrollable content.

