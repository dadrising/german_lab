// Навигация
function navigateTo(page) {
    // Добавляем класс затухания перед переходом (если захотите добавить анимацию выхода)
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';

    setTimeout(() => {
        window.location.href = page;
    }, 300);
}

// Обработка входа через Google
function handleCredentialResponse(response) {
    const responsePayload = parseJwt(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Email: ' + responsePayload.email);

    document.getElementById('user-info').innerText = `Привет, ${responsePayload.given_name}!`;

    // Сохраняем данные в localStorage для текущей сессии
    localStorage.setItem('user', JSON.stringify(responsePayload));
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}