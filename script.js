
document.querySelector('.busca').addEventListener('submit', async (event) => {

    //impede a ação padrão do formulário que será recarregar a página
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;


    if (input !== '') {
        clearInfo()
        showWarning('Buscando...')

        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&lang=pt_br&appid=d22dabf56398896c1d8c8f5ffecdc502`);

        let json = await results.json();
        
        if (json.cod === 200) {
            showInfo ({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo()
            showWarning('Cidade não encontrada')
        }

        //console.log(json)
    }else {
        clearInfo();
    }
})

function showInfo(json) {
    //Retirando a mensagem da tela antes de exibir os resultados
    showWarning('');
    
    //alterando o display do elemento .aviso para que ele seja exibido na tela
    
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC<sup>`
    
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`
    
    document.querySelector('.temp img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}.png`)
    
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`
    
    document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg) {
    //quando usamos o "innerHTML", é para escrevermos algo diretamente no HTML
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}