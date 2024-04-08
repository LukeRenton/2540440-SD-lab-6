module.exports = async function (context, req) {
    if (req.method === 'GET') {
        // Handle GET request to fetch cars data
        // const cars = require('../../cars.json');
        // context.res.json(cars);
        return context.res.status(200).json({ message: 'GET request received' });
    } 
    else if (req.method === 'POST') {
        // Handle POST request to add a new car
        try {
            const newCar = req.body;
            const cars = require('../../cars.json');
            cars.push(newCar);
            // You may need to save the updated cars data back to the file here
            context.res.status(201).json(newCar);
        } catch (error) {
            context.res.status(500).json({ error: 'Internal Server Error' });
        }
    } 
    else if (req.method === 'DELETE') {
        try {
            const urlParts = req.url.split('?');
            const carId = urlParts[0].split('/').pop(); // Extract carId from the URL
            const queryParams = urlParts[1] ? new URLSearchParams(urlParts[1]) : null; // Parse query parameters
            const index = queryParams ? queryParams.get('index') : null; // Get the index query parameter
            console.log("Index:", index);
    
            let cars = require('../../cars.json');
            if (index !== null) {
                // Convert index to integer
                const carIndex = parseInt(index, 10);
                if (carIndex >= 0 && carIndex < cars.length) {
                    cars.splice(carIndex, 1);
                    // You may need to save the updated cars data back to the file here
                    context.res.status(200).json({ message: `Car at index ${carIndex} deleted` });
                    return; // Return to exit the function after successful deletion
                }
            }
            // If index is invalid or car not found
            context.res.status(404).json({ error: `Car with index ${index} not found` });
        } catch (error) {
            context.res.status(500).json({ error: 'Internal Server Error' });
        }
    }  
    else {
        console.log("WE ENTERED INTO THE ELSE STATEMENT");
        context.res.status(404).json({ error: 'Not Found' });
    }
};