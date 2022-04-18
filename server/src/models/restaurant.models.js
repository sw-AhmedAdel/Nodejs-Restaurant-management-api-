const Restaurant = require('./restaurant.mongo');
const fs= require('fs');
const path = require('path');

async function loadAllRestaurant() {
  const Restaurants = JSON.parse(fs.readFileSync(path.join(__dirname,'..','..','data','restaurants.json')));
  await Restaurant.create(Restaurants);
  console.log('loaded all Restaurants')
}

async function CreateRestaurant (restaurant) {
  const newRestaurant = new Restaurant(restaurant);
  await newRestaurant.save();
  return newRestaurant;
}

async function GetAllRestaurant(filter , limit , skip , sort) {
  return await Restaurant.find(filter)
  .limit(limit)
  .skip(skip)
  .sort(sort)
}

async function GetSingleRestaurant(filter) {
  return await Restaurant.findOne(filter);
}

async function UpdateRestaurant(editRestaurant , id) {
  const restaurant = await Restaurant.findByIdAndUpdate(id , editRestaurant , {
    new:true,
    runValidators:true,
  })

  return restaurant;
}

// when i delete Restaurant i must delete the all menu and reviewing on it 
async function DeleteRestaurant(id) {
  await Restaurant.findByIdAndDelete(id);
}


module.exports = {
  CreateRestaurant,
  GetSingleRestaurant,
  GetAllRestaurant,
  UpdateRestaurant,
  DeleteRestaurant,
  loadAllRestaurant
}

