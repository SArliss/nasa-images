# NASA IMAGES 

## General info
This webpage access the NASA database and shows high quality images and videos accordingly to users input search. 
	
## API
This website uses the images.nasa.gov API. JSON is returned by all API responses, including errors. 

###### Request:
```
https://images-api.nasa.gov/search?q=moon&media_type=image
```

At least one parameter is required, but all individual parameters are optional. 

Search results will come in the form of Collection+JSON, which contains results and information about how to retrieve more  details about each result. In the example above it will return a colection of objects with title "moon" and and media_type "image". 

## Features
1 - User types a string in the input field 

2 - An event listener with an async function is activated when user clicks on search button 
  * It makes a request of data from NASA library 
  * Save the data in a variable "results" 
  * Then it calls a render function passing results as its parameter 

3 - Render function 
  * Selects the pieces of data we want to show from the results (title, picture, description) 
  * Either a for or foreach loop iterate through the results 
  * Elements are created and appended in the DOM
  * Data is shown on the website 

4 - Select and Zoon function
  * If user clicks on image, it zooms out. 
  * When user click on image again, it zooms back. 

## Aditional Features
* Add a second api to show the current weather on other planets. 
