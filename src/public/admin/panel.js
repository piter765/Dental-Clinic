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
class Visit {
    constructor(name, surname, fullnick, start, dn, ds) {
        this.name = name
        this.surname = surname 
        this.fullnick = fullnick
        this.start = start
        this.dn = dn,
        this.ds = ds
       
    }
    show(id) {
        let div = document.getElementById(id)
        let text = `  
        <td>${this.name} ${this.surname}</td>
        <td>${this.fullnick}</td>
        <td>
          <span class="status pink"></span>
          ${toHoursAndMinutes(this.start)}
        </td>
        <td>${this.dn} ${this.ds}</td>
              `
        let elem = document.createElement('tr')
        elem.innerHTML = text
        div.appendChild(elem)

    }
}
let visits = []
document.addEventListener('DOMContentLoaded', function () {
    console.log('domloaded')
    document.getElementById('setnick').innerHTML = localStorage.login

    postData('POST', '/admin/getpanel', {
        login: localStorage.getItem('admin')
    }).then(data => {
        console.log(data)
        document.getElementById('customers').innerHTML = data.customers
        document.getElementById('tot').innerHTML = data.totalvisits
        document.getElementById('tod').innerHTML = data.todayvisits
        document.getElementById('income').innerHTML = '---'
        console.log(data.visits)
        for (let i = 0; i < data.visits.length; i++) {
            console.log(i)
            let visit = new Visit(data.visits[i].name, data.visits[i].surname, data.visits[i].fullnick, data.visits[i].starttime,data.visits[i].doctorname, data.visits[i].doctorsur)
            visits.push(visit)
            visit.show('upcomingappo')
        }
    })



}, false);