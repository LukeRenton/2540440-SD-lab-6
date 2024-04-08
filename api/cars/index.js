// Define cars data directly within the index.js file because .json files dont get uploaded to Azure :D
const cars = [
    {
        "make": "Toyota",
        "model": "Camry",
        "year": 2022,
        "price": 250000
    },
    {
        "make": "Honda",
        "model": "Accord",
        "year": 2021,
        "price": 200000
    },
    {
        "make": "Ford",
        "model": "Mustang",
        "year": 2020,
        "price": 300000
    }
];

module.exports = async function (context, req) {
    if (req.method === 'GET') {
        context.res.json(cars);
    } 
    else if (req.method === 'POST') {
        try {
            const newCar = req.body;
            cars.push(newCar);
            context.res.status(201).json(newCar);
        } catch (error) {
            context.res.status(500).json({ error: 'Internal Server Error' });
        }
    } 
    else if (req.method === 'DELETE') {
        try {
            const urlParts = req.url.split('?');
            const carId = urlParts[0].split('/').pop();
            const queryParams = urlParts[1] ? new URLSearchParams(urlParts[1]) : null;
            const index = queryParams ? queryParams.get('index') : null;
            console.log("Index:", index);
    
            if (index !== null) {
                const carIndex = parseInt(index, 10);
                if (carIndex >= 0 && carIndex < cars.length) {
                    cars.splice(carIndex, 1);
                    context.res.status(200).json({ message: `Car at index ${carIndex} deleted` });
                    return; 
                }
            }
            //This shouldn't happen but let's see
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
