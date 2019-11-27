window.onload = function () {


  // Setting all my global variables
  const button = document.querySelector("button");
  const search = document.querySelector("input");
  const mainSection = document.querySelector("#results");
  const nasaImages = document.querySelector("h1");

  // API request to load the Astronomy Picture of the Day
  // https://api.nasa.gov/
  async function imageOfTheDay() {
    const request = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=iyo7fdXSVeEViTSkRC2eixo1Ey3fYqCkXcgqaYM9`);
    const imageOfTheDayUrl = request.data.hdurl;
    const imageOfTheDayTitle = request.data.title;
    const imageOfTheDayYear = request.data.date;
    const imageOfTheDayDescription = request.data.explanation;

    // Populating the mainSection with the img of the day, title, year and description 
    const mainImageContainer = document.createElement("div");
    mainImageContainer.className = "mainImageContainer";

    const mainImg = document.createElement("img");
    mainImg.className = "mainImg";
    mainImg.src = imageOfTheDayUrl;
    mainImageContainer.append(mainImg);

    const mainTitle = document.createElement("p");
    mainTitle.className = "mainTitle";
    mainTitle.innerHTML =
      `<h2>Astronomy Picture of the Day</h2> 
        <p>${imageOfTheDayTitle}, ${imageOfTheDayYear}.</p> 
        <p>${imageOfTheDayDescription}</p>`;

    mainImageContainer.append(mainTitle);



    // const mainDescription = document.createElement("p");
    // mainDescription.className = "mainDescription";
    // mainDescription.innerHTML = imageOfTheDayDescription;
    // mainImageContainer.append(mainDescription);

    mainSection.appendChild(mainImageContainer);
  }
  imageOfTheDay();

  // Event handler click to tile H1 NASA Images 
  nasaImages.addEventListener("click", async function (evt) {
    evt.preventDefault()
    mainSection.innerHTML = "";
    imageOfTheDay();
  })

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

    // Collecting array of objects from nasa database 
    results = results.data.collection.items;

    if (results.length === 0) {
      // If the search imput word does not appear in databate array size returns 0 
      // Shows alert and set the mainSection back to the image of the day 
      alert("Image not found. Sorry, search for something else.");

    } else {

      // Cleaning the main section and description section data
      mainSection.innerHTML = "";

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

