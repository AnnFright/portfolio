'use strict';
const skills = {
    data : [],
    isSorted: false,
    generateList(parentElement){
        parentElement.innerHTML = '';
        this.data.forEach(element => {
            const dt = document.createElement('dt');
            dt.classList.add('skill-item');
            dt.textContent = element.skill;
            dt.style.backgroundImage = `url('./img/${element.iconName}')`;

            const dd = document.createElement('dd');
            dd.classList.add('skill-level');

            const div = document.createElement('div');
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
                    break;
                    
                case 'level':
                    this.data.sort((a,b) => b.level - a.level); 
                    break;
                default:
                    return;
            }
            this.isSorted = sortingType;
        } else {
            this.data.reverse();
        }
        this.generateList(document.querySelector("dl.skill-list"));
    },
    getData: function(url,parentElement,skillSection){
        fetch(url)
        .then(data => data.json())
        .then(object =>{
            this.data = object;
            this.generateList(parentElement);
        })
        .catch(()=>{
            console.error('что-то пошло не так');
            skillSection.remove(); 
        })
    }
}

const skillList = document.querySelector("dl.skill-list");
const skillsSection = document.querySelector('section.skills');

skills.getData('db/skills.json', skillList, skillsSection);

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