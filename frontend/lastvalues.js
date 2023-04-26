function myFunction() {
  var x=document.getElementById("myLinks");
  if(x.style.display==="block"){
      x.style.display="none";
  }else{
      x.style.display="block";
  }
} 

const APICALL_URL = "http://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50";
const tbody = document.getElementById("data");

fetch(APICALL_URL)
.then((response) => response.json())
.then((data) => {
    data.forEach((item) => {
      const date = item.date_time.slice(8, 10);
      const month = item.date_time.slice(5, 7);
      const year = item.date_time.slice(0, 4);
      const formattedDate = `${date}/${month}/${year}`;
      const time = item.date_time.slice(11, 16);
      const value = Object.values(item.data)[0];
      const row = `
        <tr>
          <td>${formattedDate}</td>
          <td>${time}</td>
          <td>${value}</td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
})
.catch((error) => console.log(error));