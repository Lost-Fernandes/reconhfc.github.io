Webcam.set({
    width: 400,
    height: 300,
    image_format: 'jpeg',
    jpeg_quality: 90
});
Webcam.attach('#webcam');

function captureImage() {
    Webcam.snap(function(data_uri) {
        document.getElementById('captured-image').innerHTML = 
            '<img src="' + data_uri + '"/>';
    });
}

// Verificar a versão do ml5.js
console.log('ml5 version:', ml5.version);

// Carregar o modelo do Teachable Machine
const classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iWbs2Ljus/model.json', modelLoaded);

function modelLoaded() {
    console.log('Modelo carregado!');
}

function check() {
    const image = document.querySelector('#captured-image img');
    if (image) {
        console.log('Imagem capturada:', image.src); // Log da imagem capturada
        classifier.classify(image, gotResult);
    } else {
        alert('Por favor, capture uma imagem primeiro.');
    }
}

function gotResult(err, results) {
    if (err) {
        console.error(err);
    } else {
        console.log('Resultados:', results); // Log dos resultados
        const memberName = results[0].label;
        const accuracy = (results[0].confidence * 100).toFixed(2);
        document.getElementById('member-name').innerText = 'Membro: ' + memberName;
        document.getElementById('accuracy').innerText = 'Precisão: ' + accuracy + '%';
    }
}
