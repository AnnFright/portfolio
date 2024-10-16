'use strict';
let skills = {
    data : [
        {skill:'html',level:60,class:'skill-item_html',iconName:'Icon1HTML.svg'},
        {skill:'css',level:55,class:'skill-item_css',iconName:'Icon2CSS.svg'},
        {skill:'python',level:30,class:'skill-item_python',iconName:'Icon3Py.svg'},
        {skill:'cpp',level:40,class:'skill-item_cpp',iconName:'Icon4CPP.svg'},
        {skill:'english',level:44,class:'skill-item_english',iconName:'Icon5English.svg'},
    ],
    generateList(parentElement){
        this.data.forEach(element => {
            let dt = document.createElement('dt')
            dt.classList.add(element.class, 'skill-item')
            dt.textContent=element.skill
            dt.style.backgroundImage=`url('./img/${element.iconName}')`

            let dd = document.createElement('dd')
            dd.classList.add('skill-level')

            let div = document.createElement('div')
            div.textContent=`${element.level}%`
            div.style.width=div.textContent

            dd.appendChild(div)
            parentElement.appendChild(dt)
            parentElement.appendChild(dd)
        });
        return parentElement
    }
}

skills.generateList(document.querySelector('dl.skill-list'))