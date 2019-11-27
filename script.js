window.onload = function () {


  // Setting all my global variables
  const button = document.querySelector("button");
  const search = document.querySelector("input");
  const mainSection = document.querySelector("#results");

  // API request to load the Astronomy Picture of the Day
  // https://api.nasa.gov/
  async function imageOfTheDay() {
    const request = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=iyo7fdXSVeEViTSkRC2eixo1Ey3fYqCkXcgqaYM9`);
    const featuredImgUrl = request.data.hdurl;
    // Populating the mainSection
    const mainImg = document.createElement('img');
    mainImg.className = 'mainImg';
    mainImg.src = featuredImgUrl;
    mainSection.append(mainImg);
  }
  imageOfTheDay();

  // Event handler click to button and NASA API Request 
  button.addEventListener("click", async function (evt) {
    evt.preventDefault()
    const searchPicked = search.value;
    // Getting all the images avaiable in the database according to the searchPicked word 
    const results = await axios.get(`https://images-api.nasa.gov/search?q=${searchPicked}&media_type=image`);
    // Calling the renderResults function and passing the searchPicked results as a parameter. Two functions: Better usability 
    renderResults(results)
  })

  // Populating the website 
  function renderResults(results) {
    // Cleaning the main section and description section data
    mainSection.innerHTML = "";
    // Collecting array of objects from nasa database 
    results = results.data.collection.items;

    if (results.length === 0) {
      // If the search imput word does not appear in databate array size returns 0 
      // Shows alert and set the mainSection back to the image of the day 
      alert("Image not found. Sorry, search for something else.");
      imageOfTheDay();

    } else {

      // Creating a new div element ro receive all the data in the DOM
      const divContainer = document.createElement('div');
      divContainer.className = "container";

      for (let i = 0; i < results.length && i <= 200; i++) {

        const imgUrl = results[i].links[0].href;
        const title = results[i].data[0].title;
        const nasaID = results[i].data[0].nasa_id;
        let year = results[i].data[0].date_created;
        // const description = results[i].data[0].description;

        // Appending images 
        const posterImg = document.createElement('img');
        posterImg.className = 'poster';
        posterImg.src = imgUrl;
        posterImg.setAttribute('ID', nasaID);
        divContainer.append(posterImg);

        // Appending title and year 
        year = year.slice(0, 10);
        const titleHeader = document.createElement('h5');
        titleHeader.className = 'title-header';
        titleHeader.innerHTML = `${title}. ${year}.`;
        divContainer.append(titleHeader);

        // Appending the div container to the main section of the page 
        mainSection.appendChild(divContainer);

      } // Closing the if statement

    } // Closing the for loop


  } // Closing renderResults Function 


} // Closing windows.onload function 

