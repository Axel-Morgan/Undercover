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