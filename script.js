window.onload = function () {



  // Setting all my global variables
  const button = document.querySelector("button");
  // Selecting the whole <input id="mainInput" type="text" placeholder="Type here"> 
  const search = document.querySelector("input");



  // NASA API Request 
  button.addEventListener("click", async function (evt) {
    evt.preventDefault()

    const searchPicked = search.value;
    console.log(searchPicked);

    // Getting all the images avaiable in the database according to the searchPicked word 
    const results = await axios.get(`https://images-api.nasa.gov/search?q=${searchPicked}&media_type=image`);
    console.log(results);

    // Calling the renderResults function and passing the searchPicked results as a parameter. Two functions: Better usability 
    renderResults(results)

  })


  function renderResults(results) {
    // Items index value will loop from i = 0 to items.length. Links and data index values are fixed to 0. 
    // Or until items.lenght lesser than 20 
    const imgUrl = results.data.collection.items[1].links[0].href;
    const title = results.data.collection.items[1].data[0].title;
    const nasaID = results.data.collection.items[1].data[0].nasa_id;
    const year = results.data.collection.items[1].data[0].date_created;
    const description = results.data.collection.items[1].data[0].description;

    console.log(imgUrl);
    console.log(title);
    console.log(nasaID);
    console.log(year);
    console.log(description);

  }






}
