// Carbon emission factors (in kg CO2 per unit)
const EMISSION_FACTORS = {
    car: 0.404, // kg CO2 per mile
    publicTransport: 0.14, // kg CO2 per mile
    diet: {
        vegan: 0.7, // kg CO2 per day
        vegetarian: 1.2, // kg CO2 per day
        omnivore: 2.5 // kg CO2 per day
    },
    electricity: 0.92, // kg CO2 per kWh
    flight: 0.25 // kg CO2 per mile (average)
};

// Average flight distance (miles)
const AVERAGE_FLIGHT_DISTANCE = 2000;

// Global average carbon footprint (tons per year)
const GLOBAL_AVERAGE = 4.8;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.carbon-form');
    const footprintValue = document.getElementById('footprint-value');
    const comparisonText = document.getElementById('comparison-text');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get input values
        const carMiles = parseFloat(document.getElementById('car-miles').value) || 0;
        const publicTransportDays = parseFloat(document.getElementById('public-transport').value) || 0;
        const dietType = document.getElementById('diet').value;
        const electricity = parseFloat(document.getElementById('electricity').value) || 0;
        const flights = parseFloat(document.getElementById('flights').value) || 0;

        // Calculate daily emissions
        const carEmissions = carMiles * EMISSION_FACTORS.car * 365;
        const publicTransportEmissions = publicTransportDays * 10 * EMISSION_FACTORS.publicTransport * 52; // Assuming 10 miles per trip
        const dietEmissions = EMISSION_FACTORS.diet[dietType] * 365;
        const electricityEmissions = electricity * EMISSION_FACTORS.electricity * 12;
        const flightEmissions = flights * AVERAGE_FLIGHT_DISTANCE * EMISSION_FACTORS.flight;

        // Calculate total annual emissions in tons
        const totalEmissions = (carEmissions + publicTransportEmissions + dietEmissions + electricityEmissions + flightEmissions) / 1000;

        // Update the display
        footprintValue.textContent = totalEmissions.toFixed(1);

        // Update comparison text
        if (totalEmissions < GLOBAL_AVERAGE) {
            comparisonText.textContent = 'better than';
        } else if (totalEmissions > GLOBAL_AVERAGE) {
            comparisonText.textContent = 'worse than';
        } else {
            comparisonText.textContent = 'equal to';
        }

        // Update progress bar
        const progressPercentage = Math.min((1 - (totalEmissions / GLOBAL_AVERAGE)) * 100, 100);
        document.querySelector('.progress').style.width = `${progressPercentage}%`;
        document.querySelector('.stat-label').textContent = `${Math.round(progressPercentage)}% towards target`;
    });
}); 