import axios from "axios";
import Chart from 'chart.js/auto';



function findStockSymbol(apiKey) {
  const companyName = document.getElementById("companyName").value.trim();
  if (companyName === "") {
    alert("Please enter a company name.");
    return;
  }

  axios
    .get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${companyName}&apikey=${apiKey}`
    )
    .then((response) => {
      const stockSymbols = response.data.bestMatches;
      const durationSelect = document.getElementById("duration");
      const selectedDuration = durationSelect.value;
      console.log(selectedDuration);

      if (stockSymbols.length > 0) {
        const stockSymbolList = document.getElementById("stockSymbols");
        stockSymbolList.innerHTML = "";
        

        for (let index = 0; index < 2 ; index++) {
          const btn = document.createElement("btn");
          btn.setAttribute("class", `btn btn-secondary symbolresult`)
          btn.setAttribute("type", "button")
          btn.textContent = `[${stockSymbols[index]["1. symbol"]}] ${stockSymbols[index]["2. name"]} `

          console.log(stockSymbols[index])
          console.log(stockSymbols[index]["1. symbol"])
          btn.addEventListener("click", () => {

            document.getElementById('myChart').textContent = ""
            if (selectedDuration == "1min") {
              stockSymbolList.textContent = ""

              const selectedSymbol = document.createElement("btn");
              selectedSymbol.setAttribute('class', 'btn btn-success symbolresult')
              selectedSymbol.textContent = `Selected Symbol: ${stockSymbols[index]["1. symbol"]}`
              stockSymbolList.appendChild(selectedSymbol);
              minuteFetch(stockSymbols[index]["1. symbol"], apiKey)
            } else if (selectedDuration == "1day") {
                            
              stockSymbolList.textContent = ""

              const selectedSymbol = document.createElement("btn");
              selectedSymbol.setAttribute('class', 'btn btn-success symbolresult')
              selectedSymbol.textContent = `Selected Symbol: ${stockSymbols[index]["1. symbol"]}`
              stockSymbolList.appendChild(selectedSymbol);
              dayFetch(stockSymbols[index]["1. symbol"], apiKey)

            } else if (selectedDuration == "1week") {

              stockSymbolList.textContent = ""

              const selectedSymbol = document.createElement("btn");
              selectedSymbol.setAttribute('class', 'btn btn-success symbolresult')
              selectedSymbol.textContent = `Selected Symbol: ${stockSymbols[index]["1. symbol"]}`
              stockSymbolList.appendChild(selectedSymbol);
              weeklyFetch(stockSymbols[index]["1. symbol"], apiKey)

            } else if (selectedDuration == "1month") {
              
              stockSymbolList.textContent = ""

              const selectedSymbol = document.createElement("btn");
              selectedSymbol.setAttribute('class', 'btn btn-success symbolresult')
              selectedSymbol.textContent = `Selected Symbol: ${stockSymbols[index]["1. symbol"]}`
              stockSymbolList.appendChild(selectedSymbol);
              monthlyFetch(stockSymbols[index]["1. symbol"], apiKey)

            }
          })
          stockSymbolList.appendChild(btn);
        }  
      } else {
        alert(`Sorry, we couldn't find a stock symbol for ${companyName}`);
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Sorry, an error occurred while looking up stock symbols.");
    });
}

function minuteFetch(symbol, apiKey) {
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&outputsize=full&apikey=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      const times = Object.keys(data["Time Series (1min)"])
        .reverse()
        .slice(0, 100);
      const values = times.map(time => parseFloat(data["Time Series (1min)"][time]["4. close"])).reverse();

      // Calculate the 20-period moving average
      const movingAveragePeriod = 20;
      const movingAverageValues = [];
      for (let i = 0; i < values.length; i++) {
        if (i < movingAveragePeriod - 1) {
          movingAverageValues.push(null);
        } else {
          const sum = values.slice(i - movingAveragePeriod + 1, i + 1).reduce((acc, val) => acc + val, 0);
          movingAverageValues.push(sum / movingAveragePeriod);
        }
      }

      const ctx = document.getElementById("myChart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: times,
          datasets: [
            {
              label: "Price",
              data: values,
              fill: false,
              borderColor: "rgba(0, 0, 255, 1)",
              borderWidth: 1
            },
            {
              label: "20-Day Moving Average",
              data: movingAverageValues,
              fill: false,
              borderColor: "rgba(255, 0, 0, 1)",
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: [
              {
                type: "time",
                time: {
                  displayFormats: {
                    minute: "h:mm a"
                  }
                },
                max: times[99]
              }
            ],
            y: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              display: true
            }
          }
        }
      });
      chart.canvas.parentNode.style.overflow = "hidden";
    })
    .catch(error => console.log(error));
}

function dayFetch(symbol, apiKey) {
const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${apiKey}`;
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      const times = Object.keys(data["Time Series (Daily)"])
        .reverse()
        .slice(0, 100);
      const values = times.map(time => parseFloat(data["Time Series (Daily)"][time]["4. close"])).reverse();

      // Calculate the 20-period moving average
      const movingAveragePeriod = 20;
      const movingAverageValues = [];
      for (let i = 0; i < values.length; i++) {
        if (i < movingAveragePeriod - 1) {
          movingAverageValues.push(null);
        } else {
          const sum = values.slice(i - movingAveragePeriod + 1, i + 1).reduce((acc, val) => acc + val, 0);
          movingAverageValues.push(sum / movingAveragePeriod);
        }
      }

      const ctx = document.getElementById("myChart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: times,
          datasets: [
            {
              label: "Price",
              data: values,
              fill: false,
              borderColor: "rgba(0, 0, 255, 1)",
              borderWidth: 1
            },
            {
              label: "20-Day Moving Average",
              data: movingAverageValues,
              fill: false,
              borderColor: "rgba(255, 0, 0, 1)",
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: [
              {
                type: "time",
                time: {
                  displayFormats: {
                    minute: "h:mm a"
                  }
                },
                max: times[99]
              }
            ],
            y: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              display: true
            }
          }
        }
      });
      chart.canvas.parentNode.style.overflow = "hidden";
    })
    .catch(error => console.log(error));
}

function weeklyFetch(symbol, apiKey) {
const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&outputsize=full&apikey=${apiKey}`;
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      const times = Object.keys(data["Weekly Time Series"])
        .reverse()
        .slice(0, 100);
      const values = times.map(time => parseFloat(data["Weekly Time Series"][time]["4. close"])).reverse();

      // Calculate the 20-period moving average
      const movingAveragePeriod = 20;
      const movingAverageValues = [];
      for (let i = 0; i < values.length; i++) {
        if (i < movingAveragePeriod - 1) {
          movingAverageValues.push(null);
        } else {
          const sum = values.slice(i - movingAveragePeriod + 1, i + 1).reduce((acc, val) => acc + val, 0);
          movingAverageValues.push(sum / movingAveragePeriod);
        }
      }

      const ctx = document.getElementById("myChart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: times,
          datasets: [
            {
              label: "Price",
              data: values,
              fill: false,
              borderColor: "rgba(0, 0, 255, 1)",
              borderWidth: 1
            },
            {
              label: "20-Day Moving Average",
              data: movingAverageValues,
              fill: false,
              borderColor: "rgba(255, 0, 0, 1)",
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: [
              {
                type: "time",
                time: {
                  displayFormats: {
                    minute: "h:mm a"
                  }
                },
                max: times[99]
              }
            ],
            y: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              display: true
            }
          }
        }
      });
      chart.canvas.parentNode.style.overflow = "hidden";
    })
    .catch(error => console.log(error));
}

function monthlyFetch(symbol, apiKey) {
const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&outputsize=full&apikey=${apiKey}`;
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      const times = Object.keys(data["Monthly Time Series"])
        .reverse()
        .slice(0, 100);
      const values = times.map(time => parseFloat(data["Monthly Time Series"][time]["4. close"])).reverse();

      // Calculate the 20-period moving average
      const movingAveragePeriod = 20;
      const movingAverageValues = [];
      for (let i = 0; i < values.length; i++) {
        if (i < movingAveragePeriod - 1) {
          movingAverageValues.push(null);
        } else {
          const sum = values.slice(i - movingAveragePeriod + 1, i + 1).reduce((acc, val) => acc + val, 0);
          movingAverageValues.push(sum / movingAveragePeriod);
        }
      }

      const ctx = document.getElementById("myChart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: times,
          datasets: [
            {
              label: "Price",
              data: values,
              fill: false,
              borderColor: "rgba(0, 0, 255, 1)",
              borderWidth: 1
            },
            {
              label: "20-Day Moving Average",
              data: movingAverageValues,
              fill: false,
              borderColor: "rgba(255, 0, 0, 1)",
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: [
              {
                type: "time",
                time: {
                  displayFormats: {
                    minute: "h:mm a"
                  }
                },
                max: times[99]
              }
            ],
            y: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          elements: {
            point: {
              radius: 0
            }
          },
          plugins: {
            legend: {
              display: true
            }
          }
        }
      });
      chart.canvas.parentNode.style.overflow = "hidden";
    })
    .catch(error => console.log(error));
}


export { findStockSymbol };
