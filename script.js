

window.onload = function () {

  const button = document.querySelector("#button");
  const search = "moon";

  button.addEventListener("click", async function (evt) {
    evt.preventDefault()
    const results = await axios.get(`https://images-api.nasa.gov/search?q=${search}&media_type=image`);
    console.log(results);
  })





}
