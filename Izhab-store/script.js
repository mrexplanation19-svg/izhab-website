// 🔊 Intro + show site
window.addEventListener("load", () => {

  const sound = document.getElementById("introSound");

  setTimeout(() => {
    sound.play().catch(()=>{});
  }, 500);

  setTimeout(() => {
    document.getElementById("intro").classList.add("fade-out");
  }, 2500);

  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  }, 3500);
});

// 🔥 Click to play sound (fix)
document.body.addEventListener("click", () => {
  document.getElementById("introSound").play();
});
const popularSearches = [
  "Premium Black Shirt",
  "Oversize T-shirt",
  "Hoodie",
  "Panjabi"
];

// 🎥 Video Slider
const videos = [
  "videos/video1.mp4",
  "videos/video2.mp4",
  "videos/video3.mp4",
  "videos/video4.mp4",
  "videos/video5.mp4"
];

let current = 0;
const video = document.getElementById("bgVideo");

video.src = videos[current];

video.addEventListener("ended", () => {
  current = (current + 1) % videos.length;
  video.src = videos[current];
  video.play();
});


// 🛒 Cart
function addToCart(name, price){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({name, price});
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCounters(); // 🔥 add this
}

// 🎯 Filter
function filterProducts(category){
  let items = document.querySelectorAll(".card");

  items.forEach(item => {
    if(category === "all" || item.dataset.category === category){
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
function searchProducts(){
  let input = document.getElementById("searchInput").value.toLowerCase();
  let items = document.querySelectorAll(".card");

  items.forEach(item => {
    let name = item.querySelector("h3").innerText.toLowerCase();

    if(name.includes(input)){
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
document.getElementById("searchInput").addEventListener("keyup", searchProducts);
let currentCategory = "all";

// set category
function setCategory(cat){
  currentCategory = cat;
  filterAndSearch();
}

// search input event
document.getElementById("searchInput").addEventListener("keyup", filterAndSearch);

// main function
function filterAndSearch(){

  let input = document.getElementById("searchInput").value.toLowerCase();
  let items = document.querySelectorAll(".card");
  let found = false;

  items.forEach(item => {

    let name = item.querySelector("h3").innerText.toLowerCase();
    let category = item.dataset.category;

    let matchSearch = name.includes(input);
    let matchCategory = (currentCategory === "all" || category === currentCategory);

    if(matchSearch && matchCategory){
      item.style.display = "block";
      found = true;
    } else {
      item.style.display = "none";
    }
    if(input !== "") saveHistory(input);
    showHistory();

  });

  // no result message
  document.getElementById("noResult").style.display = found ? "none" : "block";
}
const suggestionsBox = document.getElementById("suggestions");
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

  let input = searchInput.value.toLowerCase();
  suggestionsBox.innerHTML = "";

  let items = document.querySelectorAll(".card");

  // 🔥 Popular search (input empty)
  if(input === ""){
    popularSearches.forEach(item => {
      let li = document.createElement("li");
      li.innerText = "🔥 " + item;

      li.onclick = () => {
        searchInput.value = item;
        suggestionsBox.innerHTML = "";
        filterAndSearch();
      };

      suggestionsBox.appendChild(li);
    });
    return;
  }

  // 🔍 Normal + typo match
  items.forEach(item => {
    let name = item.querySelector("h3").innerText;

    if(isSimilar(name, input)){
      let li = document.createElement("li");
      li.innerText = name;

      li.onclick = () => {
        searchInput.value = name;
        suggestionsBox.innerHTML = "";
        filterAndSearch();
      };

      suggestionsBox.appendChild(li);
    }
  });

});

document.addEventListener("click", (e) => {
  if(!e.target.closest(".search-wrapper")){
    suggestionsBox.innerHTML = "";
  }
});
// simple similarity check
function isSimilar(word, input){
  return word.toLowerCase().includes(input) ||
         input.includes(word.toLowerCase());
}
let historyBox = document.getElementById("history");

// save search
function saveHistory(value){
  let history = JSON.parse(localStorage.getItem("history")) || [];

  if(!history.includes(value)){
    history.push(value);
    localStorage.setItem("history", JSON.stringify(history));
  }
}

// show history
function showHistory(){
  let history = JSON.parse(localStorage.getItem("history")) || [];
  historyBox.innerHTML = "";

  history.slice(-5).reverse().forEach(item => {
    let li = document.createElement("li");
    li.innerText = "🕘 " + item;

    li.onclick = () => {
      document.getElementById("searchInput").value = item;
      filterAndSearch();
    };

    historyBox.appendChild(li);
  });
}
function addToWishlist(name, price){
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  wishlist.push({name, price});

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  alert("Added to wishlist ❤️");
}
function toggleMenu(){
  document.getElementById("sidebar").classList.toggle("active");
}
function setCategory(cat){
  currentCategory = cat.toLowerCase();
  filterAndSearch();

  // 🔥 close menu
  document.getElementById("sidebar").classList.remove("active");
}
function toggleWishlist(btn, name, price){

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let index = wishlist.findIndex(item => item.name === name);

  if(index === -1){
    wishlist.push({name, price});
    btn.innerText = "❤️";
  } else {
    wishlist.splice(index,1);
    btn.innerText = "🤍";
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  updateCounters(); // 🔥 add this
}
window.addEventListener("load", () => {

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  document.querySelectorAll(".card").forEach(card => {
    let name = card.querySelector("h3").innerText;
    let btn = card.querySelector("button");

    if(wishlist.find(item => item.name === name)){
      btn.innerText = "❤️";
    }
  });

});
function updateCounters(){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  document.getElementById("cartCount").innerText = cart.length;
  document.getElementById("wishCount").innerText = wishlist.length;
}
window.addEventListener("load", () => {
  updateCounters();
});
window.addEventListener("load", () => {

  let isLoggedIn = localStorage.getItem("loggedIn");
  let username = localStorage.getItem("username");

  let acc = document.getElementById("accountLink");

  if(isLoggedIn === "true"){
    acc.innerText = "👤 " + username;
  }
});
function logout(){
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("username");
  location.reload();
}
function toggleMenu() {
  let menu = document.getElementById("menu");
  menu.classList.toggle("active");
}