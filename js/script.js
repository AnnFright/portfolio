'use strict';
let skills = {
    data : [
        {skill:'html', level:60, iconName:'Icon1HTML.svg'},
        {skill:'css', level:55, iconName:'Icon2CSS.svg'},
        {skill:'python', level:30, iconName:'Icon3Py.svg'},
        {skill:'c++', level:40, iconName:'Icon4CPP.svg'},
        {skill:'english', level:44, iconName:'Icon5English.svg'},
    ],
    sortMode: null,
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

    sortList(type) {
        if(this.sortMode!=type) {
            this.data.sort(this.getComparer(type));
            console.log(`Отсортировали данные по ${type}`);
        }
        else{
            this.data.reverse();
            console.log(`Инвертировали порядок сортировки`);
        }
        this.sortMode = type;
      },

    getComparer(prop) {
        return function(a, b) {
          if (a[prop] < b[prop]) {
              return -1;
          }
          if (a[prop] > b[prop]) {
              return 1;
          }
          return 0; 
        }
    }
};

    const skillList = document.querySelector('dl.skill-list');
    const sortBtnsBlock = document.querySelector('.skills-sort');
    const menu = {
        nav: null,
        btn: null,

        init(navSelector, btnSelector) {
            this.nav = document.querySelector(navSelector);
            this.btn = document.querySelector(btnSelector);
            this.close();
            this.btn.addEventListener('click', this.toggle.bind(this));
        },

        open() {
            this.nav.classList.remove('main-nav_closed');
            this.btn.classList.remove('button-nav_open');
            this.btn.classList.add('button-nav_close');
            this.btn.innerHTML = '<span class="visually-hidden"> Закрыть меню</span>';
        },

        close() {
            this.nav.classList.add('main-nav_closed');
            this.btn.classList.remove('button-nav_close');
            this.btn.classList.add('button-nav_open');
            this.btn.innerHTML = '<span class="visually-hidden"> Открыть меню</span>';
        },

        toggle() {
            if (this.nav.classList.contains('main-nav_closed')) {
            this.open();
            } else {
            this.close();
            }
        }
};

skills.generateList(skillList);

menu.init('.main-nav', '.button-nav');
sortBtnsBlock.addEventListener('click', handleButtonClick);

function handleButtonClick(event) {
  if (event.target.nodeName === 'BUTTON') {
    switch (event.target.dataset.type) {
      case 'name':
        skills.sortList('name');
        skills.generateList(skillList);
        break;
      case 'level':
        skills.sortList('level');
        skills.generateList(skillList);
        break;
      default:
        console.log('Неизвестная ошибка');
    }
  }
}

menu.open();