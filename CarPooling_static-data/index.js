// const routes = {
//     'A': { 'B': 5, 'C': 10 },
//     'B': { 'A': 5, 'C': 3, 'D': 12 + 3 }, // + means adding traffic B to D
//     'C': { 'A': 10, 'B': 3, 'D': 7 },
//     'D': { 'B': 12 + 3, 'C': 7, 'E': 8 }, // do same with D to B 
//     'E': { 'D': 8, 'F': 10, 'G': 15 },//     because of same path
//     'F': { 'E': 10, 'G': 5 },
//     'G': { 'E': 15, 'F': 5 }
// };
// /**
// now find shortest path
// * TODO 1.  BFS  but cannot add traffic so use dijkastra algo
// * * 2. match the user and driver
// * * 
// * ! test it
//  */


// function dijkstra(graph, startNode, targetNode) {
//     let distances = {};
//     let previousNodes = {}; // storing all things in empty
//     let visited = new Set();
//     let priorityQueue = [];

//     // Initialize distances to Infinity and previous nodes to null
//     for (let node in graph) { // loop on graph
//         distances[node] = Infinity; // all nodes becomes infinity
//         previousNodes[node] = null;
//     }
//     distances[startNode] = 0;

//     priorityQueue.push([startNode, 0]);

//     while (priorityQueue.length > 0) {
//         // Sort priority queue by distance
//         priorityQueue.sort((a, b) => a[1] - b[1]);
//         let [currentNode, currentDistance] = priorityQueue.shift();

//         if (visited.has(currentNode)) continue;
//         visited.add(currentNode);

//         // Return path if target node is reached
//         if (currentNode === targetNode) {
//             let path = [];
//             let current = targetNode;
//             while (current) {
//                 path.unshift(current);
//                 current = previousNodes[current];
//             }
//             return { path, distance: currentDistance };
//         }

//         // Process neighbors of current node
//         for (let neighbor in graph[currentNode]) {
//             let roadTime = graph[currentNode][neighbor];
//             let newDistance = currentDistance + roadTime;

//             if (newDistance < distances[neighbor]) {
//                 distances[neighbor] = newDistance;
//                 previousNodes[neighbor] = currentNode;
//                 priorityQueue.push([neighbor, newDistance]);
//             }
//         }
//     }
//     return null;
// }




// function calculateDistance(location1, location2) {
//     const dx = location1.latitude - location2.latitude;  // i am using Euclidean formula
//     const dy = location1.longitude - location2.longitude;
//     return Math.sqrt(dx * dx + dy * dy);
// }

// // 4. Example driver and rider data
// const rider = {
//     pickup_location: { latitude: 37.7749, longitude: -122.4194 },
//     radius: 5
// };

// const driver = {
//     location: { latitude: 39.7849, longitude: -122.4194 }
// };

// // Check if driver is within the rider's radius
// const distanceToDriver = calculateDistance(rider.pickup_location, driver.location);
// if (distanceToDriver <= rider.radius) {
//     console.log('Driver is within the radius');
// } else {
//     console.log('Driver is outside the radius');
// }

// // 5. Matching percentage calculation based on proximity and ETA
// function calculateMatchingPercentage(distance, eta, radius) {
//     let proximityFactor = (radius - distance) / radius; // Closer drivers get a higher percentage
//     let etaFactor = (eta <= 10) ? 1 : (10 / eta); // ETA within 10 minutes gets full score

//     return Math.round((proximityFactor * 0.6 + etaFactor * 0.4) * 100); // Weighting proximity 60%, ETA 40%
// }

// // 6. Example usage of Dijkstra’s algorithm to calculate ETA
// const result = dijkstra(routes, 'B', 'G');
// console.log(`Shortest path: ${result.path}, ETA: ${result.distance} minutes`);

// // 7. Calculate matching percentage
// const matchingPercentage = calculateMatchingPercentage(distanceToDriver, result.distance, rider.radius);
// console.log(`Matching percentage: ${matchingPercentage}%`);







        //  above created by chatgpt
////////////////////////////////////////////////////////////////////////////////////////////////////////////



const routes = {
    'A': { 'B': 5, 'C': 10 },
    'B': { 'A': 5, 'C': 3, 'D': 15 },
    'C': { 'A': 10, 'B': 3, 'D': 7 },
    'D': { 'B': 15, 'C': 7, 'E': 8 },
    'E': { 'D': 8, 'F': 10, 'G': 15 },
    'F': { 'E': 10, 'G': 5 },
    'G': { 'E': 15, 'F': 5 }
};

function findSimplePath(graph, startNode, targetNode) {
    let visited = new Set();
    let stack = [[startNode, 0, [startNode]]];

    while (stack.length > 0) {
        let [currentNode, currentDistance, path] = stack.pop();

        if (visited.has(currentNode)) continue;
        visited.add(currentNode);

        if (currentNode === targetNode) {
            return { path, distance: currentDistance };
        }

        for (let neighbor in graph[currentNode]) {
            let roadTime = graph[currentNode][neighbor];
            stack.push([neighbor, currentDistance + roadTime, [...path, neighbor]]);
        }
    }
    return null;
}

function simpleDistanceCheck(location1, location2) {
    const latitudeDifference = Math.abs(location1.latitude - location2.latitude);
    const longitudeDifference = Math.abs(location1.longitude - location2.longitude);
    return latitudeDifference + longitudeDifference; 
}

const rider = {
    pickup_location: { latitude: 37.7749, longitude: -122.4194 },
    radius: 5
};

const driver = {
    location: { latitude: 39.7849, longitude: -122.4194 }
};




const simpleDistance = simpleDistanceCheck(rider.pickup_location, driver.location);
if (simpleDistance <= rider.radius) {
    console.log('Driver is within the radius');
} else {
    console.log('Driver is outside the radius');
}

function simpleMatchingScore(distance, maxDistance) {
    if (distance > maxDistance) return 0;
    return Math.round((1 - (distance / maxDistance)) * 100); 
}

const pathResult = findSimplePath(routes, 'B', 'G');
console.log(`Path found: ${pathResult.path}, Total distance: ${pathResult.distance} minutes`);

const matchingScore = simpleMatchingScore(simpleDistance, rider.radius);
console.log(`Matching score: ${matchingScore}%`);
