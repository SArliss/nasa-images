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
    let imageOfTheDayUrl = request.data.url;
    const imageOfTheDayTitle = request.data.title;
    const imageOfTheDayYear = request.data.date;
    const imageOfTheDayDescription = request.data.explanation;
    const mediaType = request.data.media_type;

    // Populating the mainSection with the img of the day, title, year and description 
    const mainImageContainer = document.createElement("div");
    mainImageContainer.className = "mainImageContainer";

    const mainImageDiv = document.createElement("div");
    mainImageDiv.className = "mainImageDiv";

    // Check if media is image or video 
    if (mediaType === "image") {
      const mainImg = document.createElement("img");
      mainImg.setAttribute('src', imageOfTheDayUrl);
      mainImg.className = "mainImg";
      mainImageDiv.append(mainImg);

      // if media type is not image then it's supossed to be video   
    } else {
      const mainImg = document.createElement("iframe");
      mainImg.setAttribute('src', imageOfTheDayUrl);
      mainImg.className = "mainVideo";
      mainImageDiv.append(mainImg);
    }

    // Creating text area 
    const mainTitle = document.createElement("div");
    mainTitle.className = "mainTitleAndDescription";
    mainTitle.innerHTML =
      `<h3>Astronomy Media of the Day</h3>
        <p> ${imageOfTheDayTitle}, ${imageOfTheDayYear}.</p> 
        <p>${imageOfTheDayDescription}</p>`;

    mainImageContainer.append(mainImageDiv);
    mainImageContainer.append(mainTitle);

    mainSection.appendChild(mainImageContainer);
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

    // Collecting array of objects from nasa database 
    results = results.data.collection.items;

    if (results.length === 0) {
      // If the search imput word does not appear in databate array size returns 0 
      // Shows alert and set the mainSection back to the image of the day 
      alert("Sorry, image not found.");

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

        // Creating and appending images 
        const divImage = document.createElement('div');
        divImage.className = 'divImage';

        const posterImg = document.createElement('div');
        posterImg.className = 'poster';
        posterImg.innerHTML = `<a href="${imgUrl}" target="_blank" ><img src="${imgUrl}"
                              style="max-width:200px; max-height:220px; margin:0 auto;"></a>`;
        posterImg.setAttribute('ID', nasaID);
        divImage.append(posterImg);

        // Creating and appending title and year 
        const divSearchImgInfo = document.createElement('div');
        divSearchImgInfo.className = 'divSearchImgInfo';

        year = year.slice(0, 10);
        const searchImgInfo = document.createElement('p');
        searchImgInfo.className = 'searchImgInfo';
        searchImgInfo.innerHTML = `${title}. <br> ${year}.`;
        divSearchImgInfo.append(searchImgInfo);

        // Adding divSearchImgInfo and divImage to another div
        const divImgAndTitle = document.createElement('div');
        divImgAndTitle.className = 'divImgAndTitle';

        // Appending all the divs to mainSection 
        divImgAndTitle.append(divImage);
        divImgAndTitle.append(divSearchImgInfo);
        divContainer.append(divImgAndTitle);
        mainSection.appendChild(divContainer);

      } 

    } 


  } 

} 

