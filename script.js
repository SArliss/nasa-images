

window.onload = function () {

  // Setting all my global variables
  const button = document.querySelector("#button");
  const search = document.querySelector("input");
  const searchPicked = search.value;

  button.addEventListener("click", async function (evt) {
    evt.preventDefault()
    const results = await axios.get(`https://images-api.nasa.gov/search?q=${searchPicked}&media_type=image`);
    console.log(results);
  })





}
