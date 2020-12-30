/*------------------ЛАМПОЧКА И ОСВЕЩЕНИЕ ТЕКСТА------------------*/
var objectLamp = {
    сursorPosition: 0,
    correction: 1.8,
    //Свойства лампы
    lamp: document.querySelector('.lamp_Js'),
    lampJob: false,
    lampContainer: document.querySelector('.lampContainer_Js'),
    //Свойства строки со слоганом
    sloganWidth: document.querySelector('.slogan').offsetWidth,
    arrayWordSlogan: document.querySelectorAll('.header__lamp-mechanism span'),
    //Цветовые свойства
    borderSaturate: 6.1,
    borderLightness: 25.9
};

//КОРРЕКТИРОВКА
window.onload = function(){
    changeLetters(0);
}

window.onresize= function(){
    objectLamp.sloganWidth = document.querySelector('.slogan').offsetWidth;
}

//ФУНКЦИЯ ДВИЖЕНИЯ ЛАМПОЧКИ 
function moveLamp(job, x){
    let сursorPosition = objectLamp.сursorPosition,
        lampContainer = objectLamp.lampContainer,
        shift = 0;

    if (job == true){
        shift = сursorPosition - x;
        if ((shift > -objectLamp.sloganWidth/2.5) && (shift < objectLamp.sloganWidth/2.5)){
            lampContainer.style.right = сursorPosition - x + 'px';
        }

        else{
            lampContainer.style.right = 0 + 'px';
        }
    }
    else{
        lampContainer.style.right = 0 + 'px';
    }
    changeLetters(shift);
}

//МЕНЯЕМ ЦВЕТ БУКВ
function changeLetters(shift){
    let letters = objectLamp.arrayWordSlogan,
        hue = 39, 
        saturate = 30.8, 
        lightness = 55.1,
        startPoint = 0;
    
    console.log(letters.length)
    startPoint = ((objectLamp.sloganWidth/letters.length) * (letters.length/2)) - shift;
    
    startPoint = parseInt((startPoint/letters.length) * objectLamp.correction);

    let h = hue, s = saturate, l = lightness;

    for (let i = startPoint; i >= 0; i--){
        s = s - (startPoint - i - 0.4);
        if (s < objectLamp.borderSaturate) s = objectLamp.borderSaturate;
        l = l - (startPoint - i);
        if (l < objectLamp.borderLightness) l = objectLamp.borderLightness;
        letters[i].style.color = 'hsl(' + h + ', ' + s + '%, '+ l +'%)';
    }

   h = hue; s = saturate; l = lightness;

    for (let i = startPoint; i < letters.length; i++){
        s = s + (startPoint - i);
        if (s < objectLamp.borderSaturate) s = objectLamp.borderSaturate;
        l = l + (startPoint - i);
        if (l < objectLamp.borderLightness) l = objectLamp.borderLightness;
        letters[i].style.color = 'hsl(' + h + ', ' + s + '%, '+ l +'%)';
    }
}

//При зажатии ПКМ на лампочке 
objectLamp.lamp.addEventListener("mousedown", function(){
    objectLamp.lampJob = true;
    objectLamp.сursorPosition = event.clientX;
});

//При отпускании ПКМ на лампочке 
document.addEventListener("mouseup", function(){
    objectLamp.lampJob = false;
});

//Выход курсора за область видимости 
objectLamp.lamp.addEventListener("mouseleave", function(){
    objectLamp.lampContainer.style.right = 0 + 'px';
    changeLetters(0);
});

//Мыша двигается
objectLamp.lamp.addEventListener("mousemove", function(){
    moveLamp(objectLamp.lampJob, event.clientX);
});
