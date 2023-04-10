var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

function changetoregister() {
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
}
function changetologin() {
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0";
}
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

function register() {
    let name = document.getElementById('imie').value
    let surname = document.getElementById('nazwisko').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let login = document.getElementById('loginval').value
    postData('/patient/createuser', {
        "login": login,
        "name": name,
        "surname": surname,
        "email": email,
        "password": password
    })
        .then(data => {
            console.log(data)
            if (data.message == 'ok') {
                Swal.fire({
                    title: 'Konto załozone!',
                    html:
                        'Mozesz <a href="localhost:3000/LoginRegisterForm/patientlogin.html">zalogowac</a> sie do serwisu!',
                    text: 'Mozesz zalogowac sie do serwisu!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })

            } else if (data.message == 'notok') {
                Swal.fire({
                    title: 'Konto na te dane juz istnieje',
                    text: 'Zresetuj haslo!',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })//https://sweetalert2.github.io/#examples
            }

        });
}
function login() {
    let login = document.getElementById('logintoservice').value
    let password = document.getElementById('passwordtoservice').value
    postData('/patient/login', {
        "login": login,
        "password": password
    })
        .then(data => {
            console.log(data)
            if (data.message == 'ok') {
                Swal.fire({
                    title: 'Zalogowano!',
                    icon: 'success',
                    confirmButtonText: 'Ok, przejdz do portalu'
                }).then(function() {
                    localStorage.setItem('accessToken', data.accessToken);
                    localStorage.setItem('refreshToken', data.refreshToken);
                    localStorage.setItem('login',data.login)
                    localStorage.setItem('email',data.email)
                    localStorage.setItem('name',data.name)
                    localStorage.setItem('surname',data.surname)
                    localStorage.setItem('patientid',data.id)
                    window.location.pathname='/patient/panel'
                });
            } else if (data.message == 'passwordincorrect') {
                Swal.fire({
                    title: 'Bledne haslo',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })//https://sweetalert2.github.io/#examples
            } else if (data.message == 'notexist') {
                Swal.fire({
                    title: 'Konto nie istnieje',
                    text: 'Zarejestruj sie!',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }

        });
}

