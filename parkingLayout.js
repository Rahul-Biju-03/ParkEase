const db = firebase.firestore();
const parkingLayoutElement = document.getElementById('parkingLayout');

db.collection('parkingSpots').onSnapshot(snapshot => {
    parkingLayoutElement.innerHTML = ''; // Clear previous slots
    snapshot.forEach(doc => {
        const spot = doc.data();
        const spotElement = document.createElement('div');
        spotElement.textContent = `Spot ${doc.id}: ${spot.isAvailable ? 'Available' : 'Occupied'}`;
        spotElement.className = spot.isAvailable ? 'available' : 'occupied';
        parkingLayoutElement.appendChild(spotElement);
        spotElement.onclick = () => selectSpot(doc.id, spot.isAvailable);
    });
});

function selectSpot(spotId, isAvailable) {
    if (isAvailable) {
        sessionStorage.setItem('selectedSpotId', spotId); // Store selected spot ID
        document.getElementById('proceedBtn').style.display = 'block';
    } else {
        alert('This spot is currently occupied. Please select another spot.');
    }
}

document.getElementById('proceedBtn').addEventListener('click', function() {
    window.location.href = 'ar-navigation.html'; // Redirect to AR navigation
});
