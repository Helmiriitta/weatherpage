fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature')
.then(response => response.json())
.then(data => {
  const temperatures = data.map(datum => parseFloat(datum.temperature));
  const mean = temperatures.reduce((acc, val) => acc + val, 0) / temperatures.length;
  const sortedTemperatures = temperatures.slice().sort((a, b) => a - b);
  const mid = Math.floor(sortedTemperatures.length / 2);
  const median = sortedTemperatures.length % 2 !== 0 ? sortedTemperatures[mid] : (sortedTemperatures[mid - 1] + sortedTemperatures[mid]) / 2;
  const mode = sortedTemperatures.reduce((acc, val) => {
    acc[val] = acc[val] ? acc[val] + 1 : 1;
    return acc;
  }, {});
  const modeValues = Object.entries(mode).sort((a, b) => b[1] - a[1]);
  const range = sortedTemperatures[sortedTemperatures.length - 1] - sortedTemperatures[0];
  const variance = temperatures.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / temperatures.length;
  const stdDev = Math.sqrt(variance);
  
  document.getElementById('tempmean').textContent = mean.toFixed(2);
  document.getElementById('tempmedian').textContent = median.toFixed(2);
  document.getElementById('tempmode').textContent = modeValues[0][0];
  document.getElementById('temprange').textContent = range.toFixed(2);
  document.getElementById('tempstdDev').textContent = stdDev.toFixed(2);
})
.catch(error => console.error(error));

fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather/rain')
  .then(response => response.json())
  .then(data => {
    // Convert rain values to floats
    const rains = data.map(entry => parseFloat(entry.rain) / 1000000);

    // Calculate mean
    const mean = rains.reduce((acc, val) => acc + val, 0) / rains.length;

    // Calculate median
    const sortedRains = rains.sort((a, b) => a - b);
    const medianIndex = Math.floor(sortedRains.length / 2);
    const median = sortedRains.length % 2 === 0
      ? (sortedRains[medianIndex] + sortedRains[medianIndex - 1]) / 2
      : sortedRains[medianIndex];

    // Calculate mode
    const modeMap = {};
    let maxCount = 1;
    let mode = rains[0];
    for (let i = 0; i < rains.length; i++) {
      const rain = rains[i];
      if (!modeMap[rain]) {
        modeMap[rain] = 1;
      } else {
        modeMap[rain]++;
      }
      if (modeMap[rain] > maxCount) {
        maxCount = modeMap[rain];
        mode = rain;
      }
    }

    // Calculate range
    const minRain = Math.min(...rains);
    const maxRain = Math.max(...rains);
    const range = maxRain - minRain;

    // Calculate standard deviation
    const deviation = rains.reduce((acc, val) => acc + (val - mean) ** 2, 0) / rains.length;
    const stdDev = Math.sqrt(deviation);
    
    document.getElementById('rainmean').textContent = mean.toFixed(2);
    document.getElementById('rainmedian').textContent = median.toFixed(2);
    document.getElementById('rainmode').textContent = mode.toFixed(2);
    document.getElementById('rainrange').textContent = range.toFixed(2);
    document.getElementById('rainstdDev').textContent = stdDev.toFixed(2);
})
.catch(error => console.error(error));