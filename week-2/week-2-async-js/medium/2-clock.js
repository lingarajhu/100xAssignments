function formateDate(date, use24hrs = true) {
  const hours = use24hrs ? date.getHours() : date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = use24hrs ? "" : date.getHours() > 12 ? "PM" : "AM";

  return `${hours}:${minutes}:${seconds}${ampm ? " " + ampm : ""}`;
}

function displayTime() {
  const date = new Date();
  const time24 = formateDate(date);
  const time12 = formateDate(date, false);

  console.clear();
  console.log(`24 hours formate: ${time24}`);
  console.log(`12 hours formate: ${time12}`);
}

function startClock() {
  displayTime();
  setInterval(displayTime, 1000);
}

startClock();
console.log("Press ctrl+c to stop");
