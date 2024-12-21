'use strict';
let skills = {
    data : [
        {skill:'html', level:60, iconName:'Icon1HTML.svg'},
        {skill:'css', level:55, iconName:'Icon2CSS.svg'},
        {skill:'python', level:30, iconName:'Icon3Py.svg'},
        {skill:'c++', level:40, iconName:'Icon4CPP.svg'},
        {skill:'english', level:44, iconName:'Icon5English.svg'},
    ],
    isSorted: false,
    generateList(parentElement){
        parentElement.innerHTML = '';
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
    },
    sortList: function(sortingType) {
        if (skills.isSorted !== sortingType){
            switch (sortingType){
                case 'name':
                    this.data.sort((a,b) => a.skill.localeCompare(b.skill));
                    console.log(`Отсортировали данные по ${sortingType}`);
                    break;
                    
                case 'level':
                    this.data.sort((a,b) => b.level - a.level); 
                    console.log(`Отсортировали данные по ${sortingType}`);
                    break;
                default:
                    return;
            }
            this.isSorted = sortingType;
        } else {
            this.data.reverse();
            console.log(`Инвертировали порядок сортировки`);
        }
        this.generateList(document.querySelector("dl.skill-list"));
    }
}

skills.generateList(document.querySelector('dl.skill-list'));

const sortBtnBlock = document.querySelector("div.skills-sort");
sortBtnBlock.addEventListener('click', (e) => {
    let target = e.target;
    if (target.nodeName === "BUTTON")
    {
        skills.sortList(target.dataset.type);
    } 
});

const nav = document.querySelector('.main-nav');
const btn = document.querySelector('.button-nav');

const menu = {
    open: function() {
        nav.classList.remove('main-nav_closed');
        btn.classList.add('button-nav_close');
        btn.classList.remove('button-nav_open');
        btn.innerHTML = '<span class="visually-hidden">Закрыть меню</span>';
    },
    close: function() {
        nav.classList.add('main-nav_closed');
        btn.classList.remove('button-nav_close');
        btn.classList.add('button-nav_open');
        btn.innerHTML = '<span class="visually-hidden">Открыть меню</span>';
    },
};

btn.addEventListener('click', (e) => {
    e.target.classList.contains('button-nav_open') ? menu.open() : menu.close();
});
menu.close();

const changeTheme = (theme) => {
    if (theme) {
        document.body.classList.remove('dark-theme');
    } else {
        document.body.classList.add('dark-theme');
    }
    localStorage.setItem('dark-theme-flag', theme);
}

const checkbox = document.querySelector(".switch-checkbox");

checkbox.addEventListener("change", () => {
    changeTheme(checkbox.checked);
});

const darkThemeLoaded = localStorage.getItem('dark-theme-flag');
if (darkThemeLoaded === null || darkThemeLoaded === "false") {
    changeTheme(false);
    checkbox.checked = false;
} else {
    changeTheme(true);
    checkbox.checked = true;
}