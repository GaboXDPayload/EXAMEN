var url = window.location.href;
var swLocation = '/EXAMEN/sw.js';


if (navigator.serviceWorker) {
    
        

    navigator.serviceWorker.register(swLocation);
}
