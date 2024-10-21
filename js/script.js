'use strict';
let skills = {
    data : [
        {skill:'html', level:60, iconName:'Icon1HTML.svg'},
        {skill:'css', level:55, iconName:'Icon2CSS.svg'},
        {skill:'python', level:30, iconName:'Icon3Py.svg'},
        {skill:'c++', level:40, iconName:'Icon4CPP.svg'},
        {skill:'english', level:44, iconName:'Icon5English.svg'},
    ],
    generateList(parentElement){
        this.data.forEach(element => {
            let dt = document.createElement('dt');
            dt.classList.add('skill-item');
            dt.textContent = element.skill;
            dt.style.backgroundImage = `url('./img/${element.iconName}')`;

            let dd = document.createElement('dd');
            dd.classList.add('skill-level');

            let div = document.createElement('div');
            div.textContent = `${element.level}%`;
            div.style.width = div.textContent;

            dd.append(div);
            parentElement.append(dt,dd);
        });
        return parentElement;
    }
}

skills.generateList(document.querySelector('dl.skill-list'));