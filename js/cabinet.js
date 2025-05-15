(function () {
    const cabinetLeftMenu = document.querySelector('.cabinet-page__left-menu');
    const cabinetRightMenu = document.querySelector('.cabinet-page__right-menu');

    const cabinetLeftMenuToggle = document.querySelectorAll('.cabinet-menu__left-toggle');
    const cabinetRightMenuToggle = document.querySelectorAll('.cabinet-menu__right-toggle');

    cabinetLeftMenuToggle.forEach((element) => {
        element.addEventListener('click', (e) => {
            cabinetLeftMenu.classList.toggle('isVisible');
        });
    });

    cabinetRightMenuToggle.forEach((element) => {
        element.addEventListener('click', (e) => {
            cabinetRightMenu.classList.toggle('isVisible');
        });
    });
}());