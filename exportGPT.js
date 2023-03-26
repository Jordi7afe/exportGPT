// ==UserScript==
// @name         GPT Export Button
// @namespace    https://github.com/Jordi7afe
// @version      1.1
// @description  Export your GPT Chats
// @author       Jordi Montorio Rocafull
// @match        https://chat.openai.com/chat/*
// @icon         https://chat.openai.com/favicon-32x32.png
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function exportGPT() {
        // Obtenemos el elemento <main>
        const mainElement = document.querySelector('main');

        // Obtenemos el contenido del elemento <main> como una cadena de texto
        const contenidoMain = mainElement.innerHTML;

        // Creamos un nuevo documento para imprimir
        const documentoImprimir = window.open('', 'Impresión');

        // Escribimos el contenido del elemento <main>, los estilos necesarios y eliminamos los elementos <form> en el nuevo documento
        documentoImprimir.document.write(`
      <html>
        <head>
          <title>Impresión</title>
          <link rel="stylesheet" href="/_next/static/css/b10376b05fef8d58.css" data-n-g="">
          <style>
            form {
              display: none;
            }
            .overflow-hidden {
              overflow: visible !important;
            }
          </style>
        </head>
        <body>
          ${contenidoMain}
          <script>
          const forms = document.getElementsByTagName('form');
          for (let i = forms.length - 1; i >= 0; i--) {
            forms[i].parentNode.removeChild(forms[i]);
          }
          </script>
        </body>
      </html>
    `);

    }

    function addExportButton() {
        const btnOriginal = document.querySelector('.btn-neutral');

        if (!btnOriginal){ return }

        const idNuevoBoton = "export-btn"
        const nuevoBotonExistente = document.getElementById(idNuevoBoton);

        if (!nuevoBotonExistente) {

            // Creamos un nuevobotón
            const nuevoBoton = document.createElement('button');
            let icon = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M15.608,6.262h-2.338v0.935h2.338c0.516,0,0.934,0.418,0.934,0.935v8.879c0,0.517-0.418,0.935-0.934,0.935H4.392c-0.516,0-0.935-0.418-0.935-0.935V8.131c0-0.516,0.419-0.935,0.935-0.935h2.336V6.262H4.392c-1.032,0-1.869,0.837-1.869,1.869v8.879c0,1.031,0.837,1.869,1.869,1.869h11.216c1.031,0,1.869-0.838,1.869-1.869V8.131C17.478,7.099,16.64,6.262,15.608,6.262z M9.513,11.973c0.017,0.082,0.047,0.162,0.109,0.226c0.104,0.106,0.243,0.143,0.378,0.126c0.135,0.017,0.274-0.02,0.377-0.126c0.064-0.065,0.097-0.147,0.115-0.231l1.708-1.751c0.178-0.183,0.178-0.479,0-0.662c-0.178-0.182-0.467-0.182-0.645,0l-1.101,1.129V1.588c0-0.258-0.204-0.467-0.456-0.467c-0.252,0-0.456,0.209-0.456,0.467v9.094L8.443,9.553c-0.178-0.182-0.467-0.182-0.645,0c-0.178,0.184-0.178,0.479,0,0.662L9.513,11.973z"></path></svg>'
            nuevoBoton.innerHTML = '<div class="flex w-full items-center justify-center gap-2">' + icon + 'Guardar</div>';
            nuevoBoton.id = idNuevoBoton;

            // Copiamos todas las clases del botón original
            for (let i = 0; i < btnOriginal.classList.length; i++) {
                nuevoBoton.classList.add(btnOriginal.classList[i]);
            }

            // Agregamos un eventListener al nuevo botón
            nuevoBoton.addEventListener('click', function () {
                exportGPT();
            });

            // Insertamos el nuevo botón después del botón original
            btnOriginal.parentNode.insertBefore(nuevoBoton, btnOriginal.nextSibling);
        }

    }

    setInterval(addExportButton, 1000)


})();