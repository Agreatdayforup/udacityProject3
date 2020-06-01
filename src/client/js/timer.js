
function timer(date) {
 var countDownDate = new Date(date).toDateString();
 let CDD = new Date(countDownDate).getTime() + (86400000 * 2);
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

export {timer};