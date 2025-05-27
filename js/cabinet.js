(function () {
    const cabinetLeftMenu = document.querySelector('.cabinet-page__left-menu');
    const cabinetRightMenu = document.querySelector('.cabinet-page__right-menu');

    const cabinetLeftMenuToggle = document.querySelectorAll('.cabinet-menu__left-toggle');
    const cabinetRightMenuToggle = document.querySelectorAll('.cabinet-menu__right-toggle');

    cabinetLeftMenuToggle.forEach((element) => {
        element.addEventListener('click', (e) => {
            cabinetLeftMenu.classList.toggle('isVisible');
            cabinetRightMenu.classList.remove('isVisible');
        });
    });

    cabinetRightMenuToggle.forEach((element) => {
        element.addEventListener('click', (e) => {
            cabinetRightMenu.classList.toggle('isVisible');
            cabinetLeftMenu.classList.remove('isVisible');
        });
    });

    const balanceUpdateButtons = document.querySelectorAll('.js-balance-update');

    if (balanceUpdateButtons.length > 0) {
        const balanceUpdateFields = document.querySelectorAll('.js-balance-update-field');

        if (balanceUpdateFields.length > 0) {

            console.log({balanceUpdateFields});

            balanceUpdateButtons.forEach((element) => {
                element.addEventListener('click', (e) => {
                    e.preventDefault();

                    const value = element.dataset.value || 0;

                    balanceUpdateFields.forEach((input) => {
                        input.value = value;
                    });
                })
            });
        }
    }

    const changePasswordFormShowButton = document.getElementById('js-change-password-show-button');
    const changePasswordFormHideButton = document.getElementById('js-change-password-hide-button');

    function setChangePasswordFormVisibility(status) {
        const changePasswordForm = document.getElementById('js-change-password-form');

        changePasswordForm.hidden = !status;
        changePasswordFormShowButton.style.display = status ? 'none' : 'inline-flex';
    }

    changePasswordFormShowButton.addEventListener('click', function (e) {
        setChangePasswordFormVisibility(true);
    });

    changePasswordFormHideButton.addEventListener('click', function (e) {
        setChangePasswordFormVisibility(false);
    });
}());