/*-------------------------------------ПРИ ПЕРВОМ СТАРТЕ ПРОГРАММЫ-------------------------------------*/
window.onload = function(){
    //Инициализируем механизм освещения в Header
    changeColorLetters(0);   //В самом начале выстанавливаем лампу и свечение текста в стартовое положение

    //Инициализируем Services
    InitializingNavServices(); 

    //Инициализируем портфолио
    toInitializePortfolio();

    //Подсвечиваем footer
    lightingSloganFooter();
}

/*-------------------------------------ПРИ ИЗМЕНЕНИИ ОКНА БРАУЗЕРА-------------------------------------*/
window.onresize= function(){
    //Скрипты, необходимые для файла letterLlighting 
    setTimeout(changeColorLetters, 300, 0); //При изменение разрешения экрана, функции необходимо время, чтобы понять истинное значение ширины экрана

    //Скрипты, необходимые для файла showServicesArticle
    setTimeout(InitializingNavServices, 200);
}
/*-------------------------------------УПРАВЛЕНИЕ МЕНЮ-------------------------------------*/
//Кнопки показа
const menuButtons = {
    mainButton: document.querySelector('.menu__button-open'),
    signButtonClose: document.querySelector('.sign__container > .button-close__container'),
};

//Все, что имеет отношение к ведущему меню
const mainMenu = {
    body: document.querySelector('body'),
    header: document.querySelector('header'),
    footer: document.querySelector('footer'),
    sections: document.querySelectorAll('section'),
    menuContainer: document.querySelector('.main-menu__container'),
    links: document.querySelector('.main-menu__links-container'),
    isShow: false
};

//Все, что имеет отношение к окну входа
const signIn = {
    signInContainer: document.querySelector('.sign-in')
};

//Все, что имеет отношение к окну регистрации
const signUp = {
    signUpContainer: document.querySelector('.sign-up'),
};

//ПЕРЕХОД ПО ССЫЛКАМ
function controlUnitMenu(val){
    let link = val.innerHTML;

    switch (link){
        case 'sign in': toOpenSign(0); break;
        case 'sign up': toOpenSign(1); break;
        case 'main': toMoveToThereFromMain(0); break;
        case 'services': toMoveToThereFromMain(1); break;
        case 'portfolio': toMoveToThereFromMain(2); break;
        case 'feedbacks': toMoveToThereFromMain(3); break;
        case 'contact us': toMoveToThereFromMain(4); break;
        case 'footer': toMoveToThereFromMain(5); break;
    }
}

//Показ главного меню
function toShowMenu(isShow){
    let menu = mainMenu.menuContainer;

    if (!isShow){
        menu.style.display = "flex";
        menu.style.overflowY = "auto";
        mainMenu.isShow = true;
        menuButtons.mainButton.classList.add('itIsPush');
        mainMenu.body.style.overflow = 'hidden';
    }

    else{
        menu.style.display = "";
        menu.style.overflowY = "";
        mainMenu.isShow = false;
        toCloseSign();
        menuButtons.mainButton.classList.remove('itIsPush');
        mainMenu.body.style.overflow = '';
    }
}

//Показ Sign котнейнера 
function toOpenSign(val){
   let sign = (val == 0) ? signIn.signInContainer : signUp.signUpContainer;

   sign.style.display = "flex";
   sign.style.overflowY = "auto";
   mainMenu.menuContainer.style.overflowY = "";
}

//Закрытие Sign окон
function toCloseSign(){
    signIn.signInContainer.style.display = "";
    signIn.signInContainer.style.overflowY = "";
    signUp.signUpContainer.style.display = "";
    signUp.signUpContainer.style.overflowY = "";
    mainMenu.menuContainer.style.overflowY = "auto";
}

//Перемещаем скрол на необходимую секцию после выбора соответствующей ссылки
function toMoveToThereFromMain(val){
    if (val != 0 && val != 5){
        let section = mainMenu.sections[val - 1];

        section.scrollIntoView(true);
        toShowMenu(true);
        toCloseSign()
    }

    else if (val == 0){
        mainMenu.header.scrollIntoView(true);
        toShowMenu(true);
        toCloseSign()
    }

    else if (val == 5){
        mainMenu.footer.scrollIntoView(true);
        toShowMenu(true);
        toCloseSign()
    }
}

menuButtons.mainButton.addEventListener("click", function(){
    toShowMenu(mainMenu.isShow);
});

mainMenu.links.addEventListener("click", function (e) {
    controlUnitMenu(e.target);
});
/*-------------------------------------БЛОК УПРАВЛЕНИЯ СЕКЦИЕЙ PORTFOLIO-------------------------------------*/
//Все, что имеет отношение к списку категорий 
const portfolioSelecting = {
    selectingContainer: document.querySelector('.selecting_category__container'),
    currentSelection: document.querySelector('.selecting_category__window > .text > p'),
    selectingWindow: document.querySelector('.selecting_category__window'),
    categories: document.querySelectorAll('.selecting_category__overflow > ul > li'),
    isSelect: false
};

//Все что имеет отношение к статьям
const portfolioArticles = {
    maxShowArticles: 4,
    collection: [],
    articles: document.querySelectorAll('.articles_portfolio__item'),
    tags: document.querySelectorAll('.articles_portfolio__item > .articles_portfolio__info > span')
};

//Все что относится к блоку управления статьями PREV и NEXT
const portfolioControl = {
    pageNumber: 1,
    last: 1,
    currently: portfolioArticles.maxShowArticles,
    control: document.querySelectorAll('.control_portfolio > span')
}

//ИНИЦИАЛИЗАИЯ МОДУЛЕЙ PORTFOLIO
function toInitializePortfolio(){
    toUpdateControlPortfolio(portfolioControl.last, portfolioControl.currently);
}

//ОТКРЫВАЮ СПИСОК КАТЕГОРИЙ 
function toOpenSelecting(isSelect){
    let selCont = portfolioSelecting.selectingContainer;

    selCont.style.height = (isSelect) ? '' : 'auto';
    swithOpposite(isSelect);

    function swithOpposite(isSelect){
        portfolioSelecting.isSelect = (isSelect) ? false : true;
    }
}

//ВЫДЕЛЯЮ СПИСОК КАТЕГОРИЙ ЗОЛОТИСТЫМ ЦВЕТОМ ПРИ НАВЕДЕНИИ 
function toHoverSelecting(isSelect){
    let color = 'hsl(39,30.8%,55.1%)',
        selCont = portfolioSelecting.selectingContainer,
        arrow = selCont.querySelector('.arrow_container > .arrow');
    
    if (!isSelect){
        selCont.style.borderColor = color;
        selCont.style.color = color;
        arrow.style.borderColor = color;
    }
}

//УБИРАЮ ВЫДЕЛЕНИЕ ПРИ НАВЕДЕНИИ
function toDeleteHoverSelecting(){
    let selCont = portfolioSelecting.selectingContainer,
        arrow = selCont.querySelector('.arrow_container > .arrow');

    selCont.style.borderColor = '';
    selCont.style.color = '';
    arrow.style.borderColor = '';
}

//ВЫБИРАЮ ССЫЛКУ  
function toChooseCategory(val){
   let  categories = portfolioSelecting.categories,
        selectingName = portfolioSelecting.currentSelection,
        nameCategory =  categories[val].innerHTML.toLowerCase();

   selectingName.innerHTML = (val == categories.length - 1) ? 'All Categories' : nameCategory;

   portfolioControl.pageNumber = 1;
   portfolioControl.last = 1;
   portfolioControl.currently = portfolioArticles.maxShowArticles;

   toOpenSelecting(portfolioSelecting.isSelect); 
   toAddCollectionPortfolio(nameCategory);
}

//СОЗДАЕМ КОЛЛЕКЦИЮ СТАТЕЙ, КОТОРЫЕ НЕОБХОДИМО ПОКАЗАТЬ 
function toAddCollectionPortfolio(name){
    let tags = portfolioArticles.tags,
        maxShow = portfolioArticles.maxShowArticles, maxArticles = 0;

    portfolioArticles.collection = [];

    if (name != 'delete filter'){
        for (let i = 0; i < tags.length; i++)
            if (tags[i].innerHTML == name) portfolioArticles.collection.push(i);

        maxArticles = portfolioArticles.collection.length;
        maxShow = (maxArticles > maxShow) ? maxShow : maxArticles;
    }   

    else {
        for (let i = 0; i < tags.length; i++) portfolioArticles.collection = [];
        maxArticles = tags.length;
    }

    toUpdateControlPortfolio(1, maxShow);
}

//ОБНОВЛЕНИЕ НОМЕРОВ ТЕКУЩИХ СТАТЕЙ
function toUpdateControlPortfolio(last, currently){
    let control = portfolioControl.control;

    control[0].innerHTML = last;
    control[2].innerHTML = currently;
    control[4].innerHTML = (portfolioArticles.collection.length != 0) ? portfolioArticles.collection.length : portfolioArticles.tags.length;

    toShowCollectionPortfolio(portfolioArticles.collection, last, currently);
}

//КЛИКАЕМ ПО PREV
function toClickPrevPortfolio(){
    let numberFullPages = toCountPagesPortfolio(true),
        remainds = toCountPagesPortfolio(false);
        maxShow = portfolioArticles.maxShowArticles;

    if (portfolioControl.pageNumber > 1) {

        if (portfolioControl.pageNumber != numberFullPages + 1){
            portfolioControl.last -= maxShow;
            portfolioControl.currently -= maxShow;
        }
        else if (remainds != 0){
            portfolioControl.last -= maxShow;
            portfolioControl.currently -= remainds;
        }

        portfolioControl.pageNumber--;
        toUpdateControlPortfolio(portfolioControl.last, portfolioControl.currently);
    }
}

//КЛИКАЕМ ПО NEXT
function toClickNextPortfolio(){
    let numberFullPages = toCountPagesPortfolio(true),
        remainds = toCountPagesPortfolio(false),
        maxShow = portfolioArticles.maxShowArticles;

    if (portfolioControl.pageNumber <= numberFullPages) {
        portfolioControl.pageNumber++;
        
        if (portfolioControl.pageNumber != numberFullPages + 1){
            portfolioControl.last += maxShow;
            portfolioControl.currently += maxShow;
        }
        else if (remainds != 0){
            portfolioControl.last += maxShow;
            portfolioControl.currently += remainds;
        }

        toUpdateControlPortfolio(portfolioControl.last, portfolioControl.currently);
    }
}

//ПОЛУЧАЕМ КОЛ-ВО ПОЛНЫХ СТРАНИЦ ИЛИ КОЛ-ВО СТРАНИЦ В ОСТАТКЕ 
function toCountPagesPortfolio(isFullPages){
    let numberArticles = (portfolioArticles.collection.length != 0) ? portfolioArticles.collection.length : portfolioArticles.tags.length;
    
    if (isFullPages) return Math.floor(numberArticles/portfolioArticles.maxShowArticles);
    else return numberArticles % portfolioArticles.maxShowArticles;
}

//ПОКАЗЫВАЕМ СТАТЬИ PORTFOLIO 
function toShowCollectionPortfolio(collection, last, currently){
    let articles = portfolioArticles.articles;

    for (let i = 0; i < articles.length; i++) 
        articles[i].style.display = 'none';
    
    if (collection != 0)
        for (let i = last; i <= currently; i++){
            articles[collection[i - 1]].style.display = 'flex';
            articles[collection[i - 1]].style.backgroundImage = `url(images/portfolio/portfolio_${collection[i - 1] + 1}.jpg)`;
        }
    
    else
        for (let i = last; i <= currently; i++){
            articles[i - 1].style.display = 'flex';
            articles[i - 1].style.backgroundImage = `url(images/portfolio/portfolio_${i}.jpg)`;
        }
}

//Event Listener 
portfolioControl.control[1].addEventListener("click", function(){
    toClickPrevPortfolio(-1);
});

portfolioControl.control[3]. addEventListener("click", function(){
    toClickNextPortfolio(1);
});

portfolioSelecting.selectingWindow.addEventListener("click", function(){ 
    toDeleteHoverSelecting();
    toOpenSelecting(portfolioSelecting.isSelect);
});

portfolioSelecting.selectingWindow.addEventListener("mouseover", function(){ 
    toHoverSelecting(portfolioSelecting.isSelect);
});

portfolioSelecting.selectingWindow.addEventListener("mouseout", function(){ 
    toDeleteHoverSelecting();
});
/*----------------------------НАВИГАЦИОННЫЙ БЛОК РАЗДЕЛА SERVICES----------------------------*/
//Экран 
const yourWindow = {
    width: window.outerWidth,
    firstInit: true
}

//Все, что относится к навигационному блоку
const navigationServices = {
    links: document.querySelectorAll('.nav_services_item > p'),
    linksStartHeight: 492,
    linkContainerHeight: document.querySelector('.navigation_services_container').offsetHeight,
    linkContainerWidth: document.querySelector('.navigation_services').offsetWidth,
    linksFontSize: parseInt(getComputedStyle(document.querySelector('.nav_services_item > p')).fontSize), 
    linksSelectHSL: 'hsl(39,30.8%,55.1%)',
    linksFontSizeZoom: 1.2,
    lastLink: 0,
    isPush: false,
    lines: document.querySelectorAll('.nav_services_item > hr') 
};

//Все, что относится к статьям 
const ariclesServices = {
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
        articles = ariclesServices.articlesContainer,
        hr = navigationServices.lines, hrTop = 40;

    function callFun(){
        toShowArticleServices(lastLink, lastLink);
        toMoveImageServices(lastLink);
    }

    if (Math.abs(yourWindow.width -  window.outerWidth) > 20 || yourWindow.firstInit){
        for (let i = 0; i < links.length; i++) articles[i].style.display = 'none';
        
        setTimeout(callFun, 300);
    
        yourWindow.firstInit = false;
        yourWindow.width = window.outerWidth;
    }

    navigationServices.isPush = false;
    navigationServices.linkContainerHeight = document.querySelector('.navigation_services_container').offsetHeight;
    navigationServices.linkContainerWidth = document.querySelector('.navigation_services').offsetWidth;

    hrTop *=  navigationServices.linkContainerHeight/navigationServices.linksStartHeight;

    for (let i = 0; i < links.length; i++){
        links[i].style = '';
        hr[i].style.width = '';
        hr[i].style.top = hrTop + 'px';
    }

    let index = (lastLink == links.length - 1) ? (lastLink - 1) : (lastLink + 1);

    navigationServices.linksFontSize = parseInt(getComputedStyle(links[index]).fontSize);

    links[lastLink].style.color = navigationServices.linksSelectHSL;                  
    links[lastLink].style.borderColor = navigationServices.linksSelectHSL; 

    if (window.innerWidth > 500) links[lastLink].style.fontSize = navigationServices.linksFontSize * navigationServices.linksFontSizeZoom + 'px'; 
    else links[lastLink].style.fontSize = navigationServices.linksFontSize + 'px';  

    hr[lastLink].style.width = (navigationServices.linkContainerWidth - 10) + 'px';
}

//НАЖИМАЕМ ПО ССЫЛКЕ ИЗ РАЗДЕЛА SERVICES
function toPushNavLink(val){
    let lastLink = navigationServices.lastLink;
        
    navigationServices.isPush = true;

    if (val != lastLink){
        toSelectNavLink(val);
        toShowArticleServices(val, lastLink);
        toShowServicesHr(val, lastLink);
        toMoveImageServices(val);
        toDeleteSeclecting(lastLink);
    } 

    navigationServices.isPush = false;
}

//ВЫДЕЛЯЮ ВЫБРАННУЮ ССЫЛКУ (ТЕКСТ И ВВЕРХНЮЮ ГРАНИЦУ)
function toSelectNavLink(val){
    let links = navigationServices.links,
        hsl = navigationServices.linksSelectHSL,
        fSize = navigationServices.linksFontSize,
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
        textTopShift = 0, startHeightText = 31;

    let coefficient = 2.5 * (navigationServices.linkContainerHeight/ navigationServices.linksStartHeight);

    textTopShift = val * startHeightText * coefficient;

    articles[val].style.top = textTopShift + 'px';
    
    articles[lL].style.display = 'none';
    articles[val].style.display = 'flex';
}

//ДВИГАЮ ИЗОБРАЖЕНИЕ
function toMoveImageServices(val){
    let bImg = ariclesServices.articlesImages,
        height = document.querySelectorAll('.background_aricles_services')[val].offsetHeight * 0.1;

    let verticalShift = (val < bImg.length/2) ? height : -height * 7; 
    console.log(height);
    bImg[val].style.top = verticalShift + 'px';
}

/*----------------------------ПОДСВЕТКА СЛОГАНА FOOTER----------------------------*/

//-----------------------Подсвечиваем текст в зависимости от положения текста
function lightingSloganFooter(){
    let sloganLettersLength = document.querySelectorAll('.footer-slogan__container span'),
        hue = 39, saturate = 30.8, lightness = 55.1,
        h = hue, s = saturate, l = lightness, startPoint = 0;
        borderS = 6.1, borderL = 25.9;
    
    startPoint = sloganLettersLength.length/2;

    for (let i = startPoint; i >= 0; i--){  
          
        s -= (startPoint - i) * 0.1;
        if (s < borderS) s = borderS;             
        l -= (startPoint - i) * 0.1;
        if (l < borderL) l = borderL;                  

        sloganLettersLength[i].style.color = 'hsl(' + h + ', ' + s + '%, '+ l +'%)';
    }

   h = hue; s = saturate; l = lightness;

    for (let i = startPoint; i < sloganLettersLength.length; i++){
        s += (startPoint - i) * 0.1;
        if (s < borderS) s = borderS;

        l += (startPoint - i) * 0.1;
        if (l < borderL) l = borderL;

        sloganLettersLength[i].style.color = 'hsl(' + h + ', ' + s + '%, '+ l +'%)';
    }
}
/*----------------------------ЛАМПОЧКА И ОСВЕЩЕНИЕ ТЕКСТА----------------------------*/
//Параметры курсора
const cursorLamp = {
    xPosition: 0,           //Запоминаем позицию курсора
    isJammed: false         //Зажата ли клавиша? 
};

//То, что имеет отношение к контейнеру с лампой 
const lampMechanism = {
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
const underLampText = {
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

