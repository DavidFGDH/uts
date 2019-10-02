$(function () {

    $('.accesibilidad').on("click", function () {
        mostrarAccesible();
    });




});

function ejecutaVoz() {
    $("a,label,h1,h2,h3,p,span,table,tbody,tr,th,form").mouseenter(function () {
        var text = $(this).text();
        responsiveVoice.speak(text, "Spanish Latin American Female"); //Spanish Latin American Female
    });
}

function ejecutaComandos() {
    var altodoc = $(document).height();
    var bajar = 0;
    if (annyang) {
        // Let's define our first command. First the text we expect, and then the function it should call
        var commands = {
            'inicio': function () {
                //window.location.href="index.php";

                window.location.href = "index.php"
            },
            'conocenos': function () {
                //window.location.href="index.php";

                window.location.href = "conocenos.php"
            },
            'inicio de pagina': function () {
                //window.scrollTo(0, 0);
                $("html, body").animate({
                    scrollTop: 0
                }, 100);
            },
            'fin de pagina': function () {
                //j(document).animate({ scrollTop: j(document).height()}, 1000);
                $("html, body").animate({
                    scrollTop: $(document).height()
                }, 100);
            },
            'baja': function () {
                //j(document).animate({ scrollTop: j(document).height()}, 1000);
                if (altodoc > bajar) {
                    bajar = $(window).scrollTop();
                    bajar = bajar + 300;
                }
                $("html, body").animate({
                    scrollTop: bajar
                }, 100);
            },
            'sube': function () {
                //j(document).animate({ scrollTop: j(document).height()}, 1000);
                if (0 < bajar) {
                    bajar = $(window).scrollTop();
                    bajar = bajar - 300;
                }
                $("html, body").animate({
                    scrollTop: bajar
                }, 100);
            }

        };

        // Add our commands to annyang
        annyang.setLanguage("en-US"); // es-MX
        annyang.addCommands(commands);

        // Start listening. You can call this here, or attach this call to an event, button, etc.
        annyang.start();

    }
}

function detenerComandos() {
    if (annyang) {
        annyang.abort();
    }
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function mostrarAccesible() {

    $('#moduloAccesibilidad').html('<div  id="cerrarAccesible" ><img title="Cerrar Botones" class="accesible1" src="http://www.utsalamanca.edu.mx/assets/img/accesibilidad/close_accesibilidad.png"></div>' +
        '<div  id="lecturaSeleccion" ><img title="Activar Lectura" class="accesible1" src="http://www.utsalamanca.edu.mx/assets/img/accesibilidad/sound_off.png"></div>' +
        '<div  id="reconocimientoVoz" style="margin-left: 6px;" class="activoAccesibilidad"><img title="Activar Microfono" class="accesible1" src="http://www.utsalamanca.edu.mx/assets/img/accesibilidad/mic_off.png"></div>' +
        '<div  id="zoomin" style="margin-left: 5px;" ><img title="Aumentar tamaño de contenido" class="accesible1" src="http://www.utsalamanca.edu.mx/assets/img/accesibilidad/zoom-in.png"></div>' +
        '<div  id="zoomout" style="margin-left: 5px;" ><img title="Restablecer tamaño" class="accesible1" src="http://www.utsalamanca.edu.mx/assets/img/accesibilidad/zoom-out.png"></div>');
    $("#reconocimientoVoz").css("margin-left", "0px");
    $('#moduloAccesibilidad').fadeTo(500, 1);

    $('#cerrarAccesible').on("click", function () {
        $('#moduloAccesibilidad').fadeTo(500, 0);

    });


    $('#reconocimientoVoz').click(function () {
        if (readCookie('reconocimiento') === null) {
            ejecutaComandos();
            createCookie('reconocimiento', '1', 1);
            $("#reconocimientoVoz").html("<img class='accesible1' style='margin-left:6px;' title='Desactivar Microfono' src='http://www.utsalamanca.edu.mx/assets/img/accesibilidad/mic_on.png'>");
        } else {
            detenerComandos();
            eraseCookie('reconocimiento');
            $("#reconocimientoVoz").html("<img class='accesible1' title='Activar Microfono' src='http://www.utsalamanca.edu.mx/assets/img/accesibilidad/mic_off.png'>");

        }
    });
    $('#zoomin').on("click", function () {
        $("body").addClass("aumentado");

    });
    $('#zoomout').on("click", function () {
        $("body").removeClass("aumentado");

    });

    $('#lecturaSeleccion').click(function () {

        if (readCookie('voz') === null) {
            ejecutaVoz();
            createCookie('voz', '1', 1);
            $("#lecturaSeleccion").html("<img class='accesible1' title='Desactivar Lectura' src='http://www.utsalamanca.edu.mx/assets/img/accesibilidad/sound_on.png'>");
        } else {

            eraseCookie('voz');
            $("#lecturaSeleccion").html("<img class='accesible1' title='Activar Lectura' src='http://www.utsalamanca.edu.mx/assets/img/accesibilidad/sound_off.png'>");

        }
    });


}
