var cars = []
var filters = {
  energy: "all",
  equipments: {
    gps: false,
    air_conditioning: false,
    audio_input: false
  }
}

function renderCar(car) {
  return (
    "<div class='car-card grey-border col'>" +
      '<div class="car-card-image" style="background-image: url(' + car.photoUrl + ')"/>' +
      "<div class='car-card-title text-ellipsis'>" + car.title + "</div>" +
    "</div>"
  )
}

function renderCars() {
  var filteredCars = cars
    .filter(function filterByEnergy(car){
      return filters.energy === "all" || car.energy === filters.energy
    })
    .filter(function filterByEquipment(car){
      return (!filters.equipments.gps || car.equipments.includes("gps")) &&
        (!filters.equipments.air_conditioning || car.equipments.includes("air_conditioning")) &&
        (!filters.equipments.audio_input || car.equipments.includes("audio_input"))
    })
  var html = filteredCars.length > 0 ? filteredCars.map(renderCar) : "No results found matching your criteria :("
  $("#cars-container").html(html)
}

function onLoadSuccess(carsData) {
  cars = carsData.cars
  renderCars()
}

function loadCars() {
  var url = "http://drivy-jobs.s3-eu-west-1.amazonaws.com/test-frontend/cars.json";
  $.ajax({
    url: url,
    dataType: 'json',
    type: 'GET',
    success: onLoadSuccess
  })
}

function attachEventListeners() {
  $(".select-energy").change(function(event){
    filters.energy = event.target.value
    renderCars()
  })
  $(".check-equipment").change(function(event){
    filters.equipments[event.target.value] = event.target.checked
    renderCars()
  })
}

$(function onDOMReady () {
  attachEventListeners()
  loadCars()
});
