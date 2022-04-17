console.log('Js Loaded');

const dateDiv = document.querySelector('#dateDiv');
const timeDiv = document.querySelector('#timeDiv');

if (dateDiv && timeDiv) {
  updateDateTime();
  setInterval(() => {
    updateDateTime();
  }, 1000);
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
}

function updateDateTime() {
  const today = new Date();
  const dateContent = `${today.getDate()} ${today.toLocaleString('default', {
    month: 'long',
  })}`;
  const timeContent = formatAMPM(today);

  dateDiv.textContent = dateContent;
  timeDiv.textContent = timeContent;

  console.log(`Time updated: ${dateContent} - ${timeContent}`);
}
