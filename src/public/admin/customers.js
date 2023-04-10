async function postData(met = '', url = '', data = {}) {
    const response = await fetch(url, {
        method: met,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

function toHoursAndMinutes(totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
function logout() {
    postData('delete', '/patient/logout', {
        token: localStorage.getItem('accessToken')
    })
        .then(data => {
            console.log(data)
            if (data.message == 'ok') {
                localStorage.clear()
                Swal.fire({
                    title: 'You have been logouted!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(function () {
                    window.location.pathname = '/'
                });
            }
        })
}
class Customer {
    constructor(name, surname, email, phone, id) {
        this.name = name
        this.surname = surname 
        this.email = email
        this.phone = phone
        this.id = id
       
    }
    show(id) {
        let div = document.getElementById(id)
        let text = `  
        <td>${this.name} ${this.surname}</td>
        <td>${this.email}</td>
        <td>
          <span class="status purple"></span>
          ${this.phone}
        </td>
        <td> 
          <button type="button" onclick="deleteuser(${this.id})">Delete<span> </span></button>
        </td>
              `
        let elem = document.createElement('tr')
        elem.innerHTML = text
        div.appendChild(elem)

    }
}
function deleteuser(id){
    postData('POST', '/admin/deleteuser', {
        id: id
    }).then(data => {
        console.log(data)
        if(data.message == 'ok'){
            Swal.fire({
                title: 'User deleted',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(function () {
                window.location.pathname = '/admin/customers'
            });
        }
    })
}
let visits = []
document.addEventListener('DOMContentLoaded', function () {
    console.log('domloaded')
    document.getElementById('setnick').innerHTML = localStorage.login

    postData('POST', '/admin/getcustomers', {
        login: localStorage.getItem('login')
    }).then(data => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            console.log(i)
            let visit = new Customer(data[i].name, data[i].surname, data[i].email, data[i].login, data[i].id)
            visits.push(visit)
            visit.show('visits')
        }
    })



}, false);