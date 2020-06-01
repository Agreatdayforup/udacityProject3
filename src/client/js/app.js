

/* Global Variables */
const searchForm = document.querySelector('form')
const cordData = {};
let geoCountry = {};
let geoCC = {};
let geoLatit = {};
let geoLongi = {};
let pixaData = {};
let countryData = {};
let countryCurr = {};
let countryReg = {};
let countryLang = {};




let degree = document.querySelector('.degree');
let tempDescription = document.querySelector('.tempDescrip');
let date = document.querySelector('#date');
const tripDate = date.value;
let city = document.querySelector('.dest');
let resCityTitle = document.querySelector('.resCity');
const bodyBack = document.getElementById("bodyMain");
    
// Destination date for user

const destDate = date.value;
console.log(destDate)


// Destination city for user
const destCity = city.value;



// Helps prevent Cors error
const proxy = 'https://cors-anywhere.herokuapp.com/';


    // DarkSky API information
    const darkApi = `${proxy}https://api.darksky.net/forecast/1469add55d2500c04eddbd73805930c6/${geoLatit},${geoLongi}`;

    //Geonames APIusername and api address
    const geoUser = 'agreatdayfor';
    const geoNamesApi = `http://api.geonames.org/searchJSON?q=${destCity}&maxRows=1&username=${geoUser}`;

    // Pixabay API Information
    const pixaKey = '14937162-57809441d2782a1b475398b82';
    const pixabayApi = `https://pixabay.com/api/?key=${pixaKey}&q=${destCity}&orientation=horizontal`



//form submittion with API Requests inside


function handleSubmit(event) {
    event.preventDefault()
// searchForm.addEventListener('submit', (e) => {
//     e.preventDefault()
    console.log('testing')
   

    resCityTitle.textContent = `The weather in ${destCity} for ${tripDate} is!`
            console.log(destCity)
            console.log(destDate)


     
// Geonames API Fetch
     fetch(geoNamesApi)
     .then(response => {
         return response.json();
     })
     .then(data => {
            geoLatit = data.geonames[0].lat;
            geoLongi = data.geonames[0].lng;
            geoCountry = data.geonames[0].countryName;
            geoCC = data.geonames[0].countryCode;
        
        
        console.log(geoLatit)
        console.log(geoLongi)
        console.log(data);
        console.log(geoCC);
        console.log(geoCountry);

     return fetch(`${proxy}https://api.darksky.net/forecast/1469add55d2500c04eddbd73805930c6/${geoLatit},${geoLongi}`)
        .then(response => {
            return response.json();
            
        }).then(data => {
            console.log(data);
            let { temperature, summary, icon } = data.currently;
            
            //set Dom from API
            degree.textContent = temperature + "-F";
            tempDescription.textContent = summary;
            // Set Icon
            setIcons(icon, document.querySelector('.icon'));


            

            return fetch(pixabayApi)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data.hits[0].largeImageURL);
                    pixaData = data.hits[0].largeImageURL;
                    let pixaImg = document.getElementById("resImg");
                    pixaImg.style.backgroundImage = `url(${pixaData})`;
                    pixaImg.style.filter = 'grayscale(75%)';
                    pixaImg.style.opacity = '0.8';
                    
                    const restCountry = `https://restcountries.eu/rest/v2/alpha/${geoCC}`

                    return fetch(restCountry)
                    .then(response => {
                        return response.json();
                    }).then(data => {
                        countryData = data.population;
                        countryCurr = data.currencies[0].name;
                        countryReg = data.region;
                        countryLang = data.languages[0].name;

                        document.getElementById("countryDes").innerHTML = geoCountry + "'s population is " + countryData + ", there currency is the " + countryCurr + " and the language spoken is " + countryLang;
                        console.log(countryLang);
                        console.log(countryData);
                    })
                })
            
            // function to change icon to a gif version  from DevED youtube
            function setIcons(icon, iconID) {
            const skycons = new Skycons({color: 'white'});
            const currentIcon = icon.replace(/-/g, '_').toUpperCase();
                skycons.play();
                return skycons.set(iconID, Skycons[currentIcon]);
            }
    })
        
    })


    var countDownDate = new Date(destDate).toDateString();
    let CDD = new Date(countDownDate).getTime();
    console.log(countDownDate)
    console.log(CDD);

     // Get today's date and time
     let now = new Date().getTime();

    // Update the count down every 1 second
    let x = setInterval(function() {


    // Find the differance from today to the trip date
    let distance = parseInt(CDD - now);
    

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    // Display the result 
    document.getElementById("countDown").innerHTML = days + "d's " + " till your trip departs";
  
  }, 1000);

}

export { handleSubmit } ;
