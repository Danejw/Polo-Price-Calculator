document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const minOrderSizeInput = document.getElementById('minOrderSize');
    const maxOrderSizeInput = document.getElementById('maxOrderSize');
    const orderSizeInput = document.getElementById('orderSize');
    const calculateButton = document.getElementById('calculateButton');
    const priceResult = document.getElementById('priceResult');
    const savingsResult = document.getElementById('savingsResult');
    const resultsContainer = document.getElementById('results');

    // Event listener for the Calculate button
    calculateButton.addEventListener('click', function() {
        // Get the values from the input fields
        let minPrice = parseFloat(minPriceInput.value);
        let maxPrice = parseFloat(maxPriceInput.value);
        let minOrderSize = parseFloat(minOrderSizeInput.value);
        let maxOrderSize = parseFloat(maxOrderSizeInput.value);
        let orderSize = parseFloat(orderSizeInput.value);

        // Validate input values
        if (isNaN(minPrice) || isNaN(maxPrice) || isNaN(minOrderSize) || isNaN(maxOrderSize) || isNaN(orderSize)) {
            alert('Please enter valid numbers for all fields.');
            return;
        }

        if (orderSize < 0 || minOrderSize < 0 || maxOrderSize < minOrderSize || minPrice < 0 || maxPrice < minPrice) {
            alert('Please ensure all values are logical and non-negative.');
            return;
        }

        // Clamp order size to the defined range
        orderSize = Math.max(minOrderSize, Math.min(orderSize, maxOrderSize));

        // Calculate the proportion of the order size within the range (reverse logic)
        let proportion = (orderSize - minOrderSize) / (maxOrderSize - minOrderSize);

        // Calculate the corresponding price using linear interpolation (reverse pricing)
        let price = maxPrice - (maxPrice - minPrice) * proportion;
        let totalCost = price * orderSize;

        // Calculate savings
        let originalCost = maxPrice * orderSize;
        let totalSavings = originalCost - totalCost;

        // Display results
        priceResult.textContent = `Price per polo: $${price.toFixed(2)}`;
        savingsResult.textContent = `Total savings: $${totalSavings.toFixed(2)} (Original cost: $${originalCost.toFixed(2)})`;
        resultsContainer.classList.remove('hidden');
    });
});
