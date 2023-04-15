(() => {
    const initialApp = {

        startVideo: (player, canvas, attentionElement , facesElement, active_facesElement) => {
            setTimeout(() => {
                function onIndex(index) {
                    if(attentionElement){
                        attentionElement.innerHTML = Number(index.attention)*100;
                    }
                    if(facesElement){
                        facesElement.innerHTML = index.faces
                    }
                    if(active_facesElement){
                        active_facesElement.innerHTML = index.activeFaces
                    }
                }
                function onSecondIndex(index) {
                }
                window.createFaceDetector(player, { onIndex: onIndex, onSecondIndex: onSecondIndex }, canvas)
            }, 500)
        },

        streamFromWebcam: () => {
            const video = document.getElementById('webcam');
            const player = document.getElementById('test_player2')
            const startStopButton = document.getElementById('play__stop__button');
           
            const attentionElement = document.getElementById('attentionIndex')
            const faces = document.getElementById('faces')
            const active_faces = document.getElementById('activeFaces')

            let mediaStream;

            if (navigator.mediaDevices.getUserMedia) {
                startStopButton.addEventListener('click', function () {
                    if (startStopButton.getAttribute('data-play') == "false") {
                        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
//                             player.play()
                            video.srcObject = stream;
                            mediaStream = stream;

                            video.play();

                            startStopButton.setAttribute('data-play', true);
                            initialApp.startVideo(document.getElementById('webcam'), document.getElementById('abc2'), attentionElement, faces, active_faces)
                            
                            startStopButton.style.display = "none";
                        }).catch(function (error) {
                            console.error('Error accessing the webcam:', error);
                        });
                    } else {
//                         video.pause();

                        video.srcObject = null;

                        mediaStream.getTracks().forEach(function (track) {
                            track.stop();
                        });

                        startStopButton.setAttribute('data-play', false);
                        startStopButton.style.display = "block";
                    }
                });
            } else {
                console.error('getUserMedia is not supported by this browser.');
            }
        }
    }
    if(document.getElementById('test_player2')){
    initialApp.streamFromWebcam()
        const player = document.getElementById('test_player2')
        const startStopButton = document.getElementById('play__stop__button');
        player.addEventListener("pause", (event) => {
            startStopButton.style.display = "block";
        });
    }

    // if(document.getElementById('test_player22')){
    //     const canvas = document.getElementById('abc22')
    //     const attentionElement = document.getElementById('attentionIndex__preview')
    //     const facesElement = document.getElementById('faces__preview')
    //     const active_facesElement = document.getElementById('activeFaces__preview')
    //     const player = document.getElementById('test_player22');
    //     initialApp.startVideo(player, canvas)
    // }

    // var intersectionObserver = new IntersectionObserver(function(entries) {
    //     // Если intersectionRatio равен 0, цель вне зоны видимости
    //     // и нам не нужно ничего делать
    //     if (entries[0].intersectionRatio <= 0){
    //         player.pause()
    //         return;
    //     }
    //     else{
    //         initialApp.startVideo(player, document.getElementById('abc'),attentionElement, faces, active_faces)
    //         player.play()
    //     }
    //   });
    //   // начать наблюдение
    //   intersectionObserver.observe(document.getElementById('test_player'));

})()
