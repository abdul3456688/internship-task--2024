// Graph representing the locations and routes
const locationGraph = {
  "A": { "B": 2, "C": 5 },   // A to B takes 2 units, A to C takes 5 units
  "B": { "A": 2, "D": 4 },
  "C": { "A": 5, "D": 6, "E": 3 },
  "D": { "B": 4, "C": 6, "F": 5 },
  "E": { "C": 3, "F": 2 },
  "F": { "D": 5, "E": 2, "G": 3 },
  "G": { "F": 3 },
};

// Passengers data
const passengers = [
  { name: "Passenger 1", location: "B", destination: "D", estimatedTime: "7pm" },
  { name: "Passenger 2", location: "C", destination: "E", estimatedTime: "7pm" },
  { name: "Passenger 3", location: "B", destination: "F", estimatedTime: "7pm" },
  { name: "Passenger 4", location: "A", destination: "G", estimatedTime: "8pm" },
];

// Driver info
const driver = {
  currentLocation: "A",
  destination: "F",
  route: ["A", "B", "C", "D", "E", "F"],
  estimatedTime: "7pm",
  passengersPicked: [],
};

// Dijkstra's algorithm for shortest path
function findShortestPath(graph, start, end) {
  let distances = {};
  let previous = {};
  let unvisited = new Set(Object.keys(graph));
  

  // Initialize distances to infinity, except for start node
  for (let node of unvisited) {
    distances[node] = Infinity;
  }
  distances[start] = 0;

  while (unvisited.size > 0) {
    // Get the node with the smallest distance
    let currentNode = Array.from(unvisited).reduce((minNode, node) => {
      return distances[node] < distances[minNode] ? node : minNode;
    });

    // If we have reached the destination node, stop
    if (currentNode === end) break;

    // Remove current node from unvisited set
    unvisited.delete(currentNode);

    // Update distances for neighboring nodes
    for (let neighbor in graph[currentNode]) {
      let newDist = distances[currentNode] + graph[currentNode][neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        previous[neighbor] = currentNode;
      }
    }
  }

  // Reconstruct the shortest path
  let path = [];
  let currentNode = end;
  while (currentNode !== undefined) {
    path.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  return { path, distance: distances[end] };
}

// Function to calculate % match of a passenger's route with the driver's route
function calculateRouteMatch(passenger, driverRoute) {
  let startIndex = driverRoute.indexOf(passenger.location);
  let endIndex = driverRoute.indexOf(passenger.destination);

  if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
    let passengerRouteLength = endIndex - startIndex;
    let driverRouteLength = driverRoute.length;
    return (passengerRouteLength / driverRouteLength) * 100; // % Match
  }

  return 0; // No match
}

// Function to find passengers based on shortest path and estimated time
function passengersPicked() {
  let preferablePassengers = [];

  passengers.forEach(passenger => {
    // Calculate the shortest path between driver’s current location and passenger's location
    let shortestPathToPassenger = findShortestPath(locationGraph, driver.currentLocation, passenger.location);
    let shortestPathToDestination = findShortestPath(locationGraph, passenger.location, passenger.destination);

    if (shortestPathToPassenger.path.length > 0 && shortestPathToDestination.path.length > 0) {
      // Check if the estimated time is close enough (allow a 1-hour flexibility)
      if (Math.abs(parseInt(driver.estimatedTime) - parseInt(passenger.estimatedTime)) <= 1) {
        // Calculate % match of the route
        let matchPercentage = calculateRouteMatch(passenger, driver.route);
        
        // Add passengers who are at least 30% on the way
        if (matchPercentage >= 30) {
          preferablePassengers.push({
            ...passenger,
            matchPercentage,
            shortestPathToPassenger: shortestPathToPassenger.path,
            shortestPathDistance: shortestPathToPassenger.distance,
          });
        }
      }
    }
  });

  // Sort passengers by match percentage and distance
  preferablePassengers.sort((a, b) => b.matchPercentage - a.matchPercentage || a.shortestPathDistance - b.shortestPathDistance);
  
  // Output preferable passengers
  console.log("Preferable Passengers: ", preferablePassengers);
}

// Run the function to find the best passengers
passengersPicked();
