window.onload = function () {
    // Variables

    // Añadir las tres imágenes del directorio "img" al array IMAGENES.
    const IMAGENES = ["img/img1.jpg", "img/img2.jpg", "img/img3.jpg"];

    const TIEMPO_INTERVALO_MILESIMAS_SEG = 1000;

    // posición actual guarda el indice de la imágen que se está mostrando (del array IMAGENES)
    let posicionActual = 0;

    // variables con los elementos del DOM HTML, aplicar el selector necesario.
    let $botonRetroceder = document.getElementById("retroceder");
    let $botonAvanzar = document.getElementById("avanzar");
    let $imagen = document.getElementById("imagen");
    let $botonPlay = document.getElementById("play");
    let $botonStop = document.getElementById("stop");
    let $imgName = document.getElementById("name");

    // Identificador del proceso que se ejecuta con setInterval().
    let intervalo;

    let playrunning = false;

    // Funciones

    /**
     * Funcion que cambia la foto en la siguiente posicion
     */
    function pasarFoto() {
        // se incrementa el indice (posicionActual)
        posicionActual++;
        if (posicionActual >= IMAGENES.length) {
            posicionActual = 0;
        }
        // ...y se muestra la imagen que toca.
        renderizarImagen();
    }

    /**
     * Funcion que cambia la foto en la anterior posicion
     */
    function retrocederFoto() {
        // se incrementa el indice (posicionActual)
        posicionActual--;
        if (posicionActual < 0) {
            posicionActual = IMAGENES.length - 1;
        }
        // ...y se muestra la imagen que toca.
        renderizarImagen();
    }

    /**
     * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
     */
    function renderizarImagen() {
        $imagen.style.backgroundImage = `url(${IMAGENES[posicionActual]})`;
    }

    /**
     * Activa el autoplay de la imagen
     */
    function playIntervalo() {
        // Documentación de la función setInterval: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
        // Mediante la función setInterval() se ejecuta la función pasarFoto cada TIEMPO_INTERVALO_MILESIMAS_SEG.
        intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG)
        // Desactivamos los botones de control necesarios. Utilizando setAttribute y removeAttribute.
        $botonPlay.setAttribute("disabled", "")
        $botonRetroceder.setAttribute("disabled", "")
        $botonAvanzar.setAttribute("disabled", "")
        $botonStop.removeAttribute("disabled", "");
        playrunning = true;
    }

    /**
     * Para el autoplay de la imagen
     */
    function stopIntervalo() {
        // Desactivar la ejecución de intervalo.
        clearInterval(intervalo);
        intervalo = null;
        // Activamos los botones de control. Utilizando setAttribute y removeAttribute.
        $botonStop.setAttribute("disabled", "")
        $botonAvanzar.removeAttribute("disabled", "")
        $botonRetroceder.removeAttribute("disabled", "")
        $botonPlay.removeAttribute("disabled", "")
        playrunning = false;
    }

    // Eventos
    // Añadimos los evenntos necesarios para cada boton. Mediante addEventListener.

    $botonRetroceder.addEventListener('click', function () {
        retrocederFoto()
    });
    $botonAvanzar.addEventListener('click', function () {
        pasarFoto()
    });
    $botonPlay.addEventListener('click', function () {
        playIntervalo()
    });
    $botonStop.addEventListener('click', function () {
        stopIntervalo()
    });

    //Detecció de tecles
    function checkKey(e) {
        e = e || window.event;

        if (e.keyCode == '37') {
            retrocederFoto()
        } else if (e.keyCode == '39') {
            pasarFoto();
        } else if (e.keyCode == '32') {
            if (playrunning) {
                stopIntervalo();
                playrunning = false;
            } else {
                playIntervalo()
                playrunning = true;
            }
        }
    }

    //Div segueix el ratolí
    let circle = document.getElementById('circle');
    const onMouseMove = (e) => {
        circle.style.left = e.pageX + 'px';
        circle.style.top = e.pageY + 'px';
    }
    document.addEventListener('mousemove', onMouseMove);

    // Iniciar
    renderizarImagen();
    document.onkeydown = checkKey;


}
