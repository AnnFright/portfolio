'use strict';
let skills = {
    data : [
        {skill:'html', level:60, iconName:'Icon1HTML.svg'},
        {skill:'css', level:55, iconName:'Icon2CSS.svg'},
        {skill:'python', level:30, iconName:'Icon3Py.svg'},
        {skill:'c++', level:40, iconName:'Icon4CPP.svg'},
        {skill:'english', level:44, iconName:'Icon5English.svg'},
    ],
    sortByNameAsc: false,
    sortByLevelAsc: false,
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
        if (this.sortMode === null || this.sortMode !== type) {
          console.log(`Отсортировали данные по ${type}`);
        } else {
          console.log('Инвертировали порядок сортировки');
        }
        if (type === 'name') {
          this.data.sort(this.compareByName);
          this.sortByNameAsc = !this.sortByNameAsc;
          if (!this.sortByNameAsc) {
            this.data.reverse();
          }
        } else if (type === 'level') {
          this.data.sort(this.compareByLevel);
          this.sortByLevelAsc = !this.sortByLevelAsc;
          if (!this.sortByLevelAsc) {
            this.data.reverse();
          }
        }
        this.sortMode = type;
        skillList.innerHTML = '';
        this.generateList(skillList);
      },
      compareByName(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      },
      compareByLevel(a, b) {
        if (a.level < b.level) return 1;
        if (a.level > b.level) return -1;
        return 0;
          }
    };

    const skillList = document.querySelector('dl.skill-list');
    const sortBtnsBlock = document.querySelector('.skills-sort');
    sortBtnsBlock.addEventListener('click', handleButtonClick);
    function handleButtonClick(event) {
    if (event.target.nodeName === 'BUTTON') {
        switch (event.target.dataset.type) {
        case 'name':
            skills.sortList('name');
            break;
        case 'level':
            skills.sortList('level');
            break;
        default:
            console.log('Неизвестная ошибка');
            }
        }
    }

    skills.generateList(skillList);

    const buttonCloseNav = document.querySelector('.button-nav.button-nav_close');
    const mainNav = document.querySelector('.main-nav');
    mainNav.classList.add('main-nav_closed');
    const menu = {
        mainNav: document.querySelector('.main-nav'),
        buttonCloseNav: document.querySelector('.button-nav.button-nav_close'),
        open() {
            menu.mainNav.classList.remove('main-nav_closed');
            menu.buttonCloseNav.classList.remove('button-nav_open');
            menu.buttonCloseNav.classList.add('button-nav_close');
            menu.buttonCloseNav.innerHTML = '<span class="visually-hidden"> Закрыть меню</span>';
        },
        close() {
            menu.mainNav.classList.add('main-nav_closed');
            menu.buttonCloseNav.classList.remove('button-nav_close');
            menu.buttonCloseNav.classList.add('button-nav_open');
            menu.buttonCloseNav.innerHTML = '<span class="visually-hidden"> Открыть меню</span>';
        },
        toggle() {
            if (menu.mainNav.classList.contains('main-nav_closed')) {
            menu.open();
            } else {
            menu.close();
            }
        }
    };
    menu.close();
    menu.buttonCloseNav.addEventListener('click', () => {
    menu.toggle();
    });