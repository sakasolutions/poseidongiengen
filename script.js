// Wartet, bis das gesamte HTML-Dokument geladen ist
document.addEventListener('DOMContentLoaded', function() {

    // ===================================================================
    // FUNKTION: ÄNDERT DEN HEADER-HINTERGRUND BEIM SCROLLEN
    // ===================================================================
    // Dies macht die Navigation besser lesbar, wenn sie nicht mehr
    // über dem dunklen Hero-Bild liegt.

    const header = document.getElementById('header');

    // Event-Listener, der auf das Scrollen der Seite reagiert
    window.addEventListener('scroll', function() {
        // Wenn der Benutzer mehr als 50 Pixel nach unten gescrollt hat...
        if (window.scrollY > 50) {
            // ...füge die Klasse 'scrolled' zum Header hinzu.
            header.classList.add('scrolled');
        } else {
            // ...sonst entferne die Klasse wieder.
            header.classList.remove('scrolled');
        }
    });

});

document.addEventListener('DOMContentLoaded', function() {

    // ===================================================================
    // FUNKTION: ANIMATIONEN BEIM SCROLLEN AUSLÖSEN (Intersection Observer)
    // ===================================================================
    // Diese Funktion fügt die Klasse 'is-visible' zu Elementen hinzu,
    // wenn sie in den sichtbaren Bereich des Bildschirms scrollen.

    // 1. Alle Elemente auswählen, die animiert werden sollen
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // 2. Observer-Optionen definieren
    const observerOptions = {
        root: null, // Beobachtet den Viewport
        rootMargin: '0px',
        threshold: 0.1 // Löst aus, wenn 10% des Elements sichtbar sind
    };

    // 3. Den Observer erstellen
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Wenn das Element sichtbar wird...
            if (entry.isIntersecting) {
                // ...füge die Klasse hinzu, um die Animation zu starten
                entry.target.classList.add('is-visible');
                // ...und höre auf, dieses Element zu beobachten, damit die Animation nur einmal läuft
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 4. Jedes zu animierende Element dem Observer übergeben
    animatedElements.forEach(el => {
        observer.observe(el);
    });

});


// ===================================================================
    // FUNKTION: LIGHTBOX FÜR DIE SPEISEKARTE
    // ===================================================================

    // 1. Alle benötigten Elemente aus dem DOM holen
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeButton = document.querySelector('.lightbox-close');
    const menuImages = document.querySelectorAll('.menu-image');

    // 2. Event-Listener für jedes Menü-Bild hinzufügen
    menuImages.forEach(image => {
        image.addEventListener('click', () => {
            // Das geklickte Bild in der Lightbox anzeigen
            lightboxImage.src = image.src;
            lightboxModal.classList.add('is-active');
        });
    });

    // 3. Funktion zum Schließen der Lightbox
    function closeLightbox() {
        lightboxModal.classList.remove('is-active');
    }

    // 4. Event-Listener zum Schließen hinzufügen (Klick auf X oder daneben)
    closeButton.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (event) => {
        // Schließt nur, wenn auf den dunklen Hintergrund geklickt wird, nicht auf das Bild selbst
        if (event.target === lightboxModal) {
            closeLightbox();
        }
    });


    // ===================================================================
// FUNKTION: COOKIE CONSENT BANNER
// ===================================================================
window.addEventListener("load", function(){
    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#2c3e50", // Dunkler Hintergrund, passend zum Footer
                "text": "#ffffff"      // Heller Text
            },
            "button": {
                "background": "#0D5EAF", // Dein Griechenlandblau
                "text": "#ffffff"
            }
        },
        "theme": "classic", // Stil des Banners
        "position": "bottom-right", // Position auf dem Bildschirm
        "type": "opt-in",   // Wichtig: Der Nutzer muss aktiv zustimmen (DSGVO-konform)
        "content": {
            "message": "Diese Webseite verwendet Cookies, um die Nutzererfahrung zu verbessern und externe Dienste wie Google Maps anzuzeigen.",
            "dismiss": "Nur Notwendige",
            "allow": "Alle akzeptieren",
            "link": "Mehr erfahren",
            "href": "datenschutz.html" // Korrekter Link zu deiner Datenschutzseite
        },
        
        // Diese Funktion wird aufgerufen, wenn der Nutzer eine Auswahl trifft
        onStatusChange: function(status) {
            var didConsent = this.hasConsented();
            if (didConsent) {
                // Wenn zugestimmt wurde, lade Google Maps
                loadGoogleMapsAfterConsent();
            }
        },
        
        // Diese Funktion wird beim Laden der Seite aufgerufen
        onInitialise: function(status) {
            var didConsent = this.hasConsented();
            if (didConsent) {
                // Wenn bereits bei einem früheren Besuch zugestimmt wurde, lade Google Maps
                loadGoogleMapsAfterConsent();
            }
        }
    })
});

// Funktion, die Google Maps nach der Zustimmung lädt
function loadGoogleMapsAfterConsent() {
    const mapFrame = document.querySelector('.contact-map iframe');
    
    // Prüfen, ob das Element existiert und noch keine 'src' hat
    if (mapFrame && mapFrame.dataset.src && !mapFrame.src) {
        mapFrame.src = mapFrame.dataset.src;
    }
}