// Personal API Key for OpenWeatherMap API
const apiKey = 'fdd866ab888116ae211293e5a329e01d&units=imperial'; // Replace 'YOUR_API_KEY' with your actual API key and add '&units=imperial' if needed.

// Function to fetch weather data from OpenWeatherMap API
const getWeatherData = async (zip) => {
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

// Function to post data to the server
const postData = async (url = '', data = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error posting data.');
    }

    return response.json();
  } catch (error) {
    console.error('Error posting data:', error);
    return null;
  }
};

// Function to update the UI with weather data and user response
const updateUI = (data) => {
  if (data && data.temperature !== undefined && data.date !== undefined && data.userResponse !== undefined) {
    document.getElementById('date').textContent = `Date: ${data.date}`;
    document.getElementById('temp').textContent = `Temperature: ${data.temperature}°F`;
    document.getElementById('content').textContent = `User Response: ${data.userResponse}`;
  } else {
    console.error('Invalid or missing data fields in the response.');
  }
};

// Event listener for the "Generate" button
document.getElementById('generate').addEventListener('click', async () => {
  const zip = document.getElementById('zip').value;
  const userResponse = document.getElementById('feelings').value;

  const weatherData = await getWeatherData(zip);

  if (weatherData) {
    const data = {
      temperature: weatherData.main.temp,
      date: new Date().toLocaleDateString(),
      userResponse: userResponse,
    };

    postData('/weather', data).then(() => {
      updateUI(data);
    });
  }
});
