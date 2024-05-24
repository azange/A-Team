document.addEventListener('DOMContentLoaded', function() {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const mapPicture = document.getElementById('map-picture');
    const mapLink = document.getElementById('map-link');
    
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Ändere das Bild nur, wenn die Datei existiert
            const newSrc = this.getAttribute('data-map-src');
            checkIfFileExists(newSrc)
                .then(exists => {
                    if (exists) {
                        mapPicture.src = newSrc;
                        mapLink.href = newSrc;
                        
                        // Setze alle Dropdown-Items zurück
                        dropdownItems.forEach(i => i.classList.remove('active'));
                        
                        // Setze das geklickte Item auf active
                        this.classList.add('active');
                    } else {
                        alert('Die ausgewählte Karte existiert leider nicht. Das entsprechende Kartenmaterial konnte nicht gefunden werden. Kontaktieren Sie bitte den Betreiber, diese Fehlermeldung sollte nicht angzeigt werden.');
                    }
                })
                .catch(error => {
                    console.error('Error checking file existence:', error);
                });
        });
    });

    function checkIfFileExists(url) {
        return fetch(url, { method: 'HEAD' })
            .then(response => {
                return response.ok;
            })
            .catch(error => {
                console.error('Error in fetch:', error);
                return false;
            });
    }
});

