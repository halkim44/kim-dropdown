export default function dropdown(element, eventName) {
    let thisRef = this;
    this.value = '';
    let options = element.querySelectorAll('.option');
    const menu = element.querySelector('.menu');
    let menuComputedStyle = getComputedStyle(menu);
    let isBusy = false;
    
    function toggleMenuDisplay() {
        const icon = element.querySelector('.fa-angle-right');
        toggleStyle(menu, 'maxHeight', '0');
        if (icon) {
            //setTimeout is used so transition is properly shown
            setTimeout(() => toggleStyle(icon, 'transform', 'rotate(90deg)'), 0);
        }

    }

    function toggleStyle(element, styleName, value) {
        if (element.style[styleName].length === 0) {
            element.style[styleName] = value;
        } else {
            element.style[styleName] = '';
        }

        return element;
    }

    function handleOptionSelected(e) {
        const newValue = e.target.textContent;
        const titleElem = element.querySelector('.title');
        const icon = element.querySelector('.title .fa');

        thisRef.value = newValue;
        titleElem.textContent = newValue + ' ';
        titleElem.appendChild(icon);

        if (eventName === 'mouseover') {
            element.removeEventListener(eventName, toggleMenuDisplay);
            toggleMenuDisplay();
            element.addEventListener(eventName, toggleMenuDisplay);

        }
    }
    options.forEach(option => {
        option.addEventListener('click', function (e) {
            handleOptionSelected(e);
        });
    });

    document.addEventListener(eventName, function (e) {
        // call toggleMenuDIsplay only when mouse is clicked inside dropdown element
        if (!isBusy) {
            if (element.contains(e.target)) {
                toggleMenuDisplay();
            } else {
                closeDropdown();
            }
        }
    })

    menu.addEventListener('transitionend', () => {isBusy = false});
    function closeDropdown() {
        if (parseFloat(menuComputedStyle['maxHeight']) > 0) {
            isBusy = true;
            toggleMenuDisplay();
        }
    }

    function reset() {
        toggleStyle(menu, 'maxHeight', '0');
        toggleStyle(menu, 'display', 'none');
        setTimeout(() => toggleStyle(menu, 'display', 'none'), menuComputedStyle['transitionDuration']);
    }
    reset();

}
