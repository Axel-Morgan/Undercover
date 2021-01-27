/*-------------------------------------УПРАВЛЕНИЕ МЕНЮ-------------------------------------*/
//Кнопки показа
const menuButtons = {
    mainButton: document.querySelector('.menu__button-open'),
    signButtonClose: document.querySelector('.sign__container > .button-close__container'),
};

//Все, что имеет отношение к ведущему меню
const mainMenu = {
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
        mainMenu.isShow = true;
        menuButtons.mainButton.classList.add('itIsPush');
    }
    else{
        menu.style.display = "";
        mainMenu.isShow = false;
        toCloseSign();
        menuButtons.mainButton.classList.remove('itIsPush');
    }
}

//Показ Sign котнейнера 
function toOpenSign(val){
   let sign = (val == 0) ? signIn.signInContainer : signUp.signUpContainer;

   sign.style.display = "flex";
}

//Закрытие Sign окон
function toCloseSign(){
    signIn.signInContainer.style.display = "";
    signUp.signUpContainer.style.display = "";
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