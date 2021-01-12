/*----------------------------ЛАМПОЧКА И ОСВЕЩЕНИЕ ТЕКСТА----------------------------*/
//Параметры курсора
var cursorLamp = {
    xPosition: 0,           //Запоминаем позицию курсора
    isJammed: false         //Зажата ли клавиша? 
};

//То, что имеет отношение к контейнеру с лампой 
var lampMechanism = {
    isFlashes: false,                                           //Должна ли лампа мигать?
    lampRestrictionMovement: 2.5,                               //Граница движения лампы
    lampCollider: document.querySelector('.lampCollider_Js'),   //Коллайдер лампы, активная область
    lampContainer: document.querySelector('.lampContainer_Js'), //Контейнер с лампой, свечением и коллайдером
    lampImage: document.querySelector('.lamp'),                 //Изображение лампы
    lampLightingImage: document.querySelector('.lamp-light'),   //Контейнер со свечением от лампы
    lampSpeedFlashes: 0.8,                                      //Скорость мерцания лампы
    lampPowerLighting: 2                                        //Сила воздействия света на текст
};

//То, что имеет отношение к котейнеру с текстом
var underLampText = {
    sloganContainer: document.querySelector('.slogan'),         //Контейнер со всем текстом
    sloganLetters: document.querySelectorAll('.slogan span'),   //Массив символов
    hue: 39,                                                    //Hue (Hsl)
    saturate: 30.8,                                             //Satuarate(hSl)
    loverBoundSaturate: 6.1,                                    //Минимальное значение Saturate
    lightness: 55.1,                                            //Lighting(hsL)
    loverBoundLightness: 25.9,                                  //Минимальное значение Lighting
    isTextFlshes: false                                         //Должна ли подсвечиваемая область мигать?
};

//Объекты Window 
//ONLOAD, ONRESIZE - эти объекты расположены в windowObject.js

//-----------------------Двигатель лампы 
function moveLampContainer(x, wSC){         //Получает текущую координату курсора и текущую ширину контейнера со слоганом
    let borderPoint = wSC/lampMechanism.lampRestrictionMovement,
        lCont = lampMechanism.lampContainer,
        xStart = cursorLamp.xPosition;
    
    let shift = xStart - x,    //Вычисляем изменение курсора(зафиксированная позиция курсора - текущая позиция курсора)
        borderPointFlshes = borderPoint * 0.8;

    //Проверяем, достигла ли лампочка границ области
    if ((shift > -borderPoint) && (shift < borderPoint)){    //Лампа вычисляетя ширина слогана/на коэффициент граиницы движения лампы
        lCont.style.right = shift + 'px';

        if ((shift < -borderPointFlshes) || (shift > borderPointFlshes)){  //Область мигания лампы
            lampFlashes(true, lampMechanism.lampSpeedFlashes); //Лампа мигает 
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

//-----------------------Заставляем лампу и свечение мигать при приближении к границе
function lampFlashes(boolFlashes, speedAnimation){
    let lImg = lampMechanism.lampImage,
        lLightImg = lampMechanism.lampLightingImage;

    if (!boolFlashes){                  //Выключаем анимацию мерцания
        speedAnimation = 0;                    
        underLampText.isTextFlshes = false;    //Текст не мигает
    }
    else{                                      //Включаем анимацию мигания 
        underLampText.isTextFlshes = true;    //Текст мигает
    }

    lImg.style.animation = 'flashes ' + speedAnimation +'s infinite ease-in-out';
    lLightImg.style.animation = 'flashes ' + speedAnimation +'s infinite ease-in-out';
} 

//-----------------------Возвращаем контейнер с лампой, коллайдером и светом на место 
function returnLampOnStart(obj){
    obj.style.right = 0 + 'px';
}

//-----------------------Подсвечиваем текст в зависимости от положения текста
function changeColorLetters(shift){
    let nLet = underLampText.sloganLetters,
        hue = underLampText.hue, saturate = underLampText.saturate, lightness = underLampText.lightness
        widthContainerLetters = underLampText.sloganContainer.offsetWidth,
        fontSize = parseInt(getComputedStyle(underLampText.sloganLetters[0]).fontSize),
        h = hue, s = saturate, l = lightness,
        borderS = underLampText.loverBoundSaturate, borderL = underLampText.loverBoundLightness,
        pL = lampMechanism.lampPowerLighting, coefficient = 0,
        startPoint = 0, isLampTextFlashes = true, speedTextAnim = lampMechanism.lampSpeedFlashes;
    
    coefficient = 100/fontSize * 0.8;
    startPoint = ((widthContainerLetters/nLet.length) * (nLet.length/2)) - shift;
    startPoint = parseInt(startPoint/nLet.length * coefficient);    

    for (let i = startPoint; i >= 0; i--){    
        s = pL + s - (startPoint - i);
        if (s < borderS){
            s = borderS;                    //Проверяем, достигло ли значение Saturate предельного значения
            isLampTextFlashes = false;     
        }
        l = pL + l - (startPoint - i);
        if (l < borderL){ 
            l = borderL;                    //Проверяем, достигло ли значение Ligtness предельного значения
            isLampTextFlashes = false;
        }
        if (isLampTextFlashes == false || underLampText.isTextFlshes == false){
            speedTextAnim = 0;              //Выключим анимаию при условиях достижения одого из параметров границы или если лампа не достигла области мигания
        }

        nLet[i].style.color = 'hsl(' + h + ', ' + s + '%, '+ l +'%)';
        nLet[i].style.animation = 'flashesForLampText ' + speedTextAnim +'s infinite ease-in-out';
    }

   h = hue; s = saturate; l = lightness;

    for (let i = startPoint; i < nLet.length; i++){
        isLampTextFlashes = true; speedTextAnim = lampMechanism.lampSpeedFlashes;

        s = pL + s + (startPoint - i);
        if (s < borderS){ 
            s = borderS;
            isLampTextFlashes = false;
        }
        l = pL + l + (startPoint - i);
        if (l < borderL){ 
            l = borderL;
            isLampTextFlashes = false;
        }
        if (!isLampTextFlashes || !underLampText.isTextFlshes){
            speedTextAnim = 0;
        }
        nLet[i].style.color = 'hsl(' + h + ', ' + s + '%, '+ l +'%)';
        nLet[i].style.animation = 'flashesForLampText ' + speedTextAnim +'s infinite ease-in-out';
    }
}

//-----------------------EVENT LISTENER-----------------------
//-----------------------Зажата ЛКМ на коллайдере лампы
function forLampMouseDown(device){
    if (device) cursorLamp.xPosition = event.clientX; 
    else cursorLamp.xPosition = event.changedTouches[0].clientX;
    cursorLamp.isJammed = true;
}

lampMechanism.lampCollider.addEventListener("mousedown", function(){ 
    event.preventDefault();
    forLampMouseDown(true); //Мышка
});

lampMechanism.lampCollider.addEventListener("touchstart", function(){
    forLampMouseDown(false); //Тачскрин
});

//-----------------------ЛКМ отжата 
function forLampMouseUp(){
    cursorLamp.isJammed = false;
    underLampText.isTextFlshes = false;
    lampFlashes(false);
    changeColorLetters(0);
    returnLampOnStart(lampMechanism.lampContainer);
}

document.addEventListener("mouseup", function(){ 
    event.preventDefault();
    forLampMouseUp(); //Мышка
});

document.addEventListener("touchend", function(){
    forLampMouseUp(); //Тачскрин
});

lampMechanism.lampCollider.addEventListener("touchcancel", function(){ 
    forLampMouseUp(); //Тачскрин
});

//-----------------------Курсор двигается с зажатой ЛКМ
lampMechanism.lampCollider.addEventListener("mousemove", function(){ 
    if (cursorLamp.isJammed){
        moveLampContainer(event.clientX, underLampText.sloganContainer.offsetWidth);
    }
});

lampMechanism.lampCollider.addEventListener("touchmove", function(){ 
    if (cursorLamp.isJammed){ 
        moveLampContainer(event.changedTouches[0].clientX, underLampText.sloganContainer.offsetWidth);
    }
});

