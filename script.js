document.addEventListener('DOMContentLoaded', () => {
    const cpiInput = document.getElementById('cpi');
    const temperatureInput = document.getElementById('temperature');
    const estimateButton = document.getElementById('estimate-button');
    const jptOutput = document.getElementById('jpt');

    let slope_cpi = 0;
    let slope_temp = 0;
    let intercept = 0;


    // Load the model parameters from the JSON file
    fetch('model.json')
        .then(response => response.json())
        .then(data => {
            slope_cpi = data.slope1; // Assuming slope1 is for CPI
            slope_temp = data.slope2; // Assuming slope2 is for Temperature
            intercept = data.intercept;
            console.log('Model parameters loaded:', slope_cpi, slope_temp, intercept); //Debugging
        })
        .catch(error => {
            console.error('Error loading model parameters:', error);
            alert('Failed to load model parameters.  Check console.');
        });


    estimateButton.addEventListener('click', () => {
        const cpiValue = parseFloat(cpiInput.value);
        const temperatureValue = parseFloat(temperatureInput.value);

        if (isNaN(cpiValue) || isNaN(temperatureValue)) {
            alert('Please enter valid numbers for CPI and Temperature.');
            return;
        }

        // Make the JPT estimation using the loaded slopes and intercept
        const jpt = slope_cpi * cpiValue + slope_temp * temperatureValue + intercept;

        jptOutput.value = jpt.toFixed(2); // Display with 2 decimal places
    });
});