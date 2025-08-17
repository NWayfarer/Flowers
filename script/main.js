//Кастомный селект
function CustomSelect(options) {
    var elem = options.elem;
  
    elem.onclick = function(event) {
        if (event.target.className == 'title') {
            toggle();
        } else if (event.target.tagName == 'LI') {
            setValue(event.target.innerHTML, event.target.dataset.value);
            event.target.classList.add('active');
            close();
        }
    }
  
    var isOpen = false;
  
    // ------ обработчики ------
  
    // закрыть селект, если клик вне его
    function onDocumentClick(event) {
        if (!elem.contains(event.target)) close();
    }
  
    // ------------------------
  
    function setValue(title, value) {
        let selectItem = elem.querySelectorAll('li.active');

        for(let i = 0; i < selectItem.length; i++) {
            // Убираем у других
            selectItem[i].classList.remove('active');
        }
        
        elem.querySelector('.title').innerHTML = title;
        
        var widgetEvent = new CustomEvent('select', {
            bubbles: true,
            detail: {
                title: title,
                value: value
            }
        });

        elem.dispatchEvent(widgetEvent);
    }
  
    function toggle() {
        if (isOpen) close()
        else open();
    }
  
    function open() {
        elem.classList.add('open');
        document.addEventListener('click', onDocumentClick);
        isOpen = true;
    }
  
    function close() {
        elem.classList.remove('open');
        document.removeEventListener('click', onDocumentClick);
        isOpen = false;
    }
}

$('document').ready(function() {
    let customSelects = $('*[data-customselect]');

    customSelects.each(function(i) {
        new CustomSelect({
            elem: document.getElementById($(this).attr('id'))
        });
    });



    //Инициализация скролла
    new ScrollBooster({
        viewport: document.querySelector('.tabs-viewport'),
        content: document.querySelector('.tabs-control'),
        scrollMode: 'transform',
        direction: 'horizontal',
        emulateScroll: true,
    });
});

//Кастомная кнопка добавления файла
if(document.querySelector('.file-up')) {
    document.querySelector('.file-up').onclick = function () {
        document.getElementById(this.dataset.fUp).click();
    };
}