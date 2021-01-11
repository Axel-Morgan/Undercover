/*-------------------------------------ПРИ ПЕРВОМ СТАРТЕ ПРОГРАММЫ-------------------------------------*/
window.onload = function(){
    //Скрипты, необходимые для файла letterLlighting 
    changeColorLetters(0);   //В самом начале выстанавливаем лампу и свечение текста в стартовое положение

    //Скрипты, необходимые для файла showServicesArticle
    InitializingNavServices()    
}

/*-------------------------------------ПРИ ИЗМЕНЕНИИ ОКНА БРАУЗЕРА-------------------------------------*/
window.onresize= function(){
    //Скрипты, необходимые для файла letterLlighting 
    setTimeout(changeColorLetters, 300, 0); //При изменение разрешения экрана, функции необходимо время, чтобы понять истинное значение ширины экрана

    //Скрипты, необходимые для файла showServicesArticle
    InitializingNavServices();
}
/*----------------------------НАВИГАЦИОННЫЙ БЛОК РАЗДЕЛА SERVICES----------------------------*/
var windowService = {
    isBlockServices: true
}

//Все, что относится к навигационному блоку
var navigationServices = {
    links: document.querySelectorAll('.nav_services_item > p'),
    linksStartHeight: 492,
    linkContainerHeight: document.querySelector('.navigation_services_container').offsetHeight,
    linkContainerWidth: document.querySelector('.navigation_services').offsetWidth,
    linksFontSize: parseInt(getComputedStyle(document.querySelector('.nav_services_item > p')).fontSize), 
    linksSelectHSL: 'hsl(39,30.8%,55.1%)',
    linksFontSizeZoom: 1.2,
    firstLink: 0,
    lastLink: 0,
    isPush: false,
    lines: document.querySelectorAll('.nav_services_item > hr') 
};

//Все, что относится к статьям 
var ariclesServices = {
    articlesContainer: document.querySelectorAll('.articles_services__item'),
    articlesTextContainer: document.querySelectorAll('.articles_services__item > p'),
    articlesImages: document.querySelectorAll('.background_aricles_services')
};

//Объекты Window 
//ONLOAD, ONRESIZE - эти объекты расположены в windowObject.js

//ИНИЦИАЛИЗАЦИЯ 
function InitializingNavServices(){
    let links = navigationServices.links,
        lastLink = navigationServices.lastLink,
        hr = navigationServices.lines;
        index = 0;
    
    navigationServices.isPush = false;
    navigationServices.linkContainerHeight = document.querySelector('.navigation_services_container').offsetHeight;
    navigationServices.linkContainerWidth = document.querySelector('.navigation_services').offsetWidth;

    for (let i = 0; i < links.length; i++){
        links[i].style.color = '';                  
        links[i].style.borderColor = '';      
        links[i].style.fontSize = '';
        hr[i].style.width = '';
    }

    if (lastLink == links.length - 1) index = lastLink - 1;
    else index = lastLink + 1;

    navigationServices.linksFontSize = parseInt(getComputedStyle(links[index]).fontSize);

    links[lastLink].style.color = navigationServices.linksSelectHSL;                  
    links[lastLink].style.borderColor = navigationServices.linksSelectHSL; 

    if (window.innerWidth > 500) links[lastLink].style.fontSize = navigationServices.linksFontSize * navigationServices.linksFontSizeZoom + 'px'; 
    else links[lastLink].style.fontSize = navigationServices.linksFontSize + 'px';  
 
    hr[lastLink].style.width =  (navigationServices.linkContainerWidth - 10) + 'px';

    setTimeout(toShowArticleServices, 300, lastLink, lastLink);
}

//НАЖИМАЕМ ПО ССЫЛКЕ ИЗ РАЗДЕЛА SERVICES
function toPushNavLink(val){
    let lastLink = navigationServices.lastLink;
        
    navigationServices.isPush = true;

    if (val != lastLink){
        toSelectNavLink(val);
        toShowArticleServices(val, lastLink);
        toShowServicesHr(val, lastLink);
        toDeleteSeclecting(lastLink);
    } 

    navigationServices.isPush = false;
}

//ВЫДЕЛЯЮ ВЫБРАННУЮ ССЫЛКУ (ТЕКСТ И ВВЕРХНЮЮ ГРАНИЦУ)
function toSelectNavLink(val){
    let links = navigationServices.links,
        hsl = navigationServices.linksSelectHSL,
        fSize = navigationServices.linksFontSize;
        zoom = navigationServices.linksFontSizeZoom;

    //Выделяем ссылку
    links[val].style.color = hsl;                  //Меняем цвет
    links[val].style.borderColor = hsl;            //Меняем цвет границы 

    if (navigationServices.isPush == true && window.innerWidth > 500) links[val].style.fontSize = fSize * zoom + 'px';     
    else links[val].style.fontSize = fSize + 'px';     

    navigationServices.lastLink = val;             //Теперь этот элемент записан в предыдущую выбранную ссылку
    navigationServices.linksFontSize = fSize;
}

//УБИРАЮ ВЫДЕЛЕНИЕ С ПРЕДЫДЩУЩЕЙ ВЫБРАННОЙ ССЫЛКИ 
function toDeleteSeclecting(lL){
    let links = navigationServices.links;

    links[lL].style.color = '';                  //Возвращаем дефолтный цвет
    links[lL].style.borderColor = '';      //Возвращаем дефолтный цвет границы 
    links[lL].style.fontSize = '';       //Возвращаем дефолтный шрифт текста 
}

//ОТОБРАЖАЮ HR ЛИНИЮ ПОД ВЫДЕЛЕННОЙ ССЫЛКОЙ 
function toShowServicesHr(val, lL){
    let hr = navigationServices.lines,
        width = navigationServices.linkContainerWidth;

    hr[val].style.width = (width - 10) + 'px';
    hr[lL].style.width = 0 + '%';
}

//ПОКАЗЫВАЮ НЕОБХОДИМУЮ СТАТЬЮ ИЗ РАЗДЕЛА SERVICES 
function toShowArticleServices(val, lL){
    let articles = ariclesServices.articlesContainer,
        bImage = ariclesServices.articlesImages,
        sSize = navigationServices.linksStartHeight,
        ariclesText = ariclesServices.articlesTextContainer,
        linksHeigh = navigationServices.linkContainerHeight,
        textTopShift = 0, coefficient = 2.5, startHeightText = 31;

    coefficient = coefficient * (linksHeigh/sSize);
    textTopShift = val * startHeightText * coefficient;

    console.log(linksHeigh + '----' + textTopShift + '-----' + coefficient);
    ariclesText[val].style.top = textTopShift + 'px';
    
    articles[lL].style.display = 'none';
    articles[val].style.display = 'flex';
}

//-----------------------EVENT LISTENER-----------------------
window.addEventListener("orientationchange", function() {
    InitializingNavServices();
}, false);
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
    let lRM = lampMechanism.lampRestrictionMovement,
        lCont = lampMechanism.lampContainer,
        xStart = cursorLamp.xPosition;
    
    let shift = xStart - x;    //Вычисляем изменение курсора(зафиксированная позиция курсора - текущая позиция курсора)

    //Проверяем, достигла ли лампочка границ области
    if ((shift > -wSC/lRM) && (shift < wSC/lRM)){    //Лампа вычисляетя ширина слогана/на коэффициент граиницы движения лампы
        lCont.style.right = shift + 'px';

        if ((shift < -wSC/lRM * 0.8) || (shift > wSC/lRM * 0.8)){  //Область мигания лампы
            lampFlashes(true, lampMechanism.lampSpeedFlashes); //Лампа мигает 
        }
        else{ 
            lampFlashes(false); // Лампа не мигает
        }
    }
    else{
        lampFlashes(false, ); // Лампа не мигает
        returnLampOnStart(lCont); //Возвращаем на место лампу
    }

    //Вызываем функцию изменения цвета букв
    changeColorLetters(shift);
}

//-----------------------Заставляем лампу и свечение мигать при приближении к границе
function lampFlashes(boolFlashes, speedAnimation){
    let lImg = lampMechanism.lampImage,
        lLightImg = lampMechanism.lampLightingImage;

    if (boolFlashes == false){                  //Выключаем анимацию мерцания
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
        if (isLampTextFlashes == false || underLampText.isTextFlshes == false){
            speedTextAnim = 0;
        }
        nLet[i].style.color = 'hsl(' + h + ', ' + s + '%, '+ l +'%)';
        nLet[i].style.animation = 'flashesForLampText ' + speedTextAnim +'s infinite ease-in-out';
    }
}

//-----------------------EVENT LISTENER-----------------------
//-----------------------Зажата ЛКМ на коллайдере лампы
function forLampMouseDown(device){
    if(device == true)  cursorLamp.xPosition = event.clientX; 
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

document.addEventListener("touchcancel", function(){ 
    forLampMouseUp(); //Тачскрин
});

//-----------------------Курсор двигается с зажатой ЛКМ
lampMechanism.lampCollider.addEventListener("mousemove", function(){ 
    if (cursorLamp.isJammed == true){
        moveLampContainer(event.clientX, underLampText.sloganContainer.offsetWidth);
    }
});

lampMechanism.lampCollider.addEventListener("touchmove", function(){ 
    if (cursorLamp.isJammed == true){ 
        moveLampContainer(event.changedTouches[0].clientX, underLampText.sloganContainer.offsetWidth);
    }
});

