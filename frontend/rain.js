function myFunction() {
    var x=document.getElementById("myLinks");
    if(x.style.display==="block"){
      x.style.display="none";
    }else{
      x.style.display="block";
    }
} 

const APICALL_URL = "http://webapi19sa-1.course.tamk.cloud/v1/weather/rain";
const tbody = document.getElementById("data");

fetch(APICALL_URL)
.then(response => response.json())
.then((data) => {
  const reversedData = data.reverse();
  const labels = reversedData.map((reading) => {
    const date = new Date(reading.date_time);
    const day = reading.date_time.slice(8, 10);
    const month = reading.date_time.slice(5, 7);
    const year = reading.date_time.slice(0, 4);
    const hours = reading.date_time.slice(11, 13);
    const minutes = reading.date_time.slice(14, 16);
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  });
  const rains = reversedData.map(reading => (reading.rain/1000000).toFixed(2));

  const dataset = {
    label: "Sademäärä",
    data: rains,
    backgroundColor:'blue',
    borderColor:'blue',
    fill: false,
    tension: 0.1
  }; 
  const chartData = {
    labels: labels,
    datasets: [dataset]
  };
  const chartConfig = {
    type: "line",
    data: chartData,
    options: {}
  };
  new Chart(document.getElementById("myChart"), chartConfig);

  reversedData.forEach((reading) => {
    const date = reading.date_time.slice(8, 10);
    const month = reading.date_time.slice(5, 7);
    const year = reading.date_time.slice(0, 4);
    const formattedDate = `${date}/${month}/${year}`;
    const time = reading.date_time.slice(11, 16);
    const rain = (reading.rain / 1000000).toFixed(2); // convert to millimeters and round to 1 decimal place
    const row = `
    <tr>
      <td>${formattedDate}</td>
      <td>${time}</td>
      <td>${rain} mm</td>
    </tr>
    `;
    tbody.innerHTML += row;
  });
})
.catch(error => console.error(error));
