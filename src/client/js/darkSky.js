
function sky(proxy, geolatit, geolongi) {
fetch(`${proxy}https://api.darksky.net/forecast/1469add55d2500c04eddbd73805930c6/${geoLatit},${geoLongi}`)
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
})

}

export { sky };