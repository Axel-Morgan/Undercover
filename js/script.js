/*----------------------------ЛАМПОЧКА И ОСВЕЩЕНИЕ ТЕКСТА----------------------------*/
//Параметры курсора
var cursorLamp = {
    xPosition: 0,
    isJammed: false
};

//То, что имеет отношение к контейнеру с лампой 
var lampMechanism = {
    isFlashes: false,
    lampRestrictionMovement: 2.5,
    lampCollider: document.querySelector('.lampCollider_Js'),
    lampContainer: document.querySelector('.lampContainer_Js'),
    lampImage: document.querySelector('.lamp')
};

//То, что имеет отношение к котейнеру с текстом
var underLampText = {
    sloganContainer: document.querySelector('.slogan'),
    sloganLetters: document.querySelectorAll('.slogan span'),
    hue: 39,
    saturate: 30.8,
    loverBoundSaturate: 6.1,
    lightness: 55.1,
    loverBoundLightness: 25.9
};

//Объекты Window 
window.onload = function(){
    changeColorLetters(0);
}

window.onresize= function(){
    setTimeout(changeColorLetters, 300, 0);
}

//-----------------------Двигатель лампы 
function moveLampContainer(x, wSC){
    let lRM = lampMechanism.lampRestrictionMovement,
        lCont = lampMechanism.lampContainer,
        xStart = cursorLamp.xPosition;
    
    let shift = xStart - x;

    //Проверяем, достигла ли лампочка границ области
    if ((shift > -wSC/lRM) && (shift < wSC/lRM)){
        lCont.style.right = shift + 'px';

        if ((shift < -wSC/lRM * 0.8) || (shift > wSC/lRM * 0.8)){
            lampFlashes(true); //Лампа мигает 
        }
        else{ 
            lampFlashes(false); // Лампа не мигает
        }
    }
    else{
        lampFlashes(false); // Лампа не мигает
        returnLampOnStart(lCont); //Возвращаем на место лампу
    }

    //Вызываем функцию изменения цвета букв
    changeColorLetters(shift);
}

//-----------------------Заставляем лампу мигать при приближении к границе
function lampFlashes(boolFlashes, speedAnimation = 0.7){
    let lImg = lampMechanism.lampImage;

    if (boolFlashes == false){
        speedAnimation = 0;
    }

    lImg.style.animation = 'lamp-flashes ' + speedAnimation +'s infinite ease-in-out';
} 

//-----------------------Возвращаем лампу на место 
function returnLampOnStart(obj){
    obj.style.right = 0 + 'px';
    changeColorLetters(0);
}

//-----------------------Подсвечиваем текст в зависимости от положения текста
function changeColorLetters(shift, hue = underLampText.hue, saturate = underLampText.saturate, lightness = underLampText.lightness){
    let nLet = underLampText.sloganLetters,
        widthContainerLetters = underLampText.sloganContainer.offsetWidth,
        fontSize = parseInt(window.getComputedStyle(underLampText.sloganLetters[0], null).getPropertyValue('font-size'), 10),
        h = hue, s = saturate, l = lightness,
        borderS = underLampText.loverBoundSaturate, borderL = underLampText.loverBoundLightness,
        coefficient = 0,
        startPoint = 0;
    
    coefficient = 100/fontSize * 0.8;
    startPoint = ((widthContainerLetters/nLet.length) * (nLet.length/2)) - shift;
    startPoint = parseInt(startPoint/nLet.length * coefficient);    

    for (let i = startPoint; i >= 0; i--){
        s = s - (startPoint - i);
        if (s < borderS) s = borderS;
        l = l - (startPoint - i);
        if (l < borderL) l = borderL;
        nLet[i].style.color = 'hsl(' + h + ', ' + s + '%, '+ l +'%)';
    }

   h = hue; s = saturate; l = lightness;

    for (let i = startPoint; i < nLet.length; i++){
        s = s + (startPoint - i);
        if (s < borderS) s = borderS;
        l = l + (startPoint - i);
        if (l < borderL) l = borderL;
        nLet[i].style.color = 'hsl(' + h + ', ' + s + '%, '+ l +'%)';
    }
}

//-----------------------EVENT LISTENER-----------------------
//-----------------------Зажата ЛКМ на коллайдере лампы
function forLampMouseDown(){
    event.preventDefault();
    cursorLamp.xPosition = event.clientX; 
    cursorLamp.isJammed = true;
}

lampMechanism.lampCollider.addEventListener("mousedown touchstart", function(){ 
    forLampMouseDown(); //Мышка
});

//-----------------------ЛКМ отжата 
function forLampMouseUp(){
    event.preventDefault();
    cursorLamp.isJammed = false;
    lampFlashes(false);
    changeColorLetters(0);
    returnLampOnStart(lampMechanism.lampContainer);
}

document.addEventListener("mouseup touchend", function(){ 
    forLampMouseUp(); //Мышка
});

//-----------------------Курсор двигается с зажатой ЛКМ
function forLampMouseMove(){
    if (cursorLamp.isJammed == true){ 
        moveLampContainer(event.clientX, underLampText.sloganContainer.offsetWidth);
    }
}

lampMechanism.lampCollider.addEventListener("mousemove touchmove", function(){ 
    forLampMouseMove(); //Мышка
});

