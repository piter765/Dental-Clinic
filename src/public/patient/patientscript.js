let visits = []
document.querySelector("#show-appointment").addEventListener("click", function () {
    document.querySelector(".popup").classList.add("active");
});
document.querySelector(".popup .close-btn").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
});

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

class Visit {
    constructor(patient, service, start, end, id, visit_id, date) {
        this.patient = patient
        this.service = service
        this.date = date
        this.start = start
        this.end = end
        this.cancelStatus = false
        this.id = id
        this.visit_id = visit_id
    }
    getPatient() {
        return this.patient
    }
    getVisidId() {
        return this.visit_id
    }
    show(id) {
        let div = document.getElementById(id)
        var dateParts = this.date.split("-");
        let text = `  
                <td>${this.patient}</td>
                <td>${this.service}</td>
                <td>
                  <span class="status purple"></span>
                  ${toHoursAndMinutes(this.start)} - ${toHoursAndMinutes(this.end)}
                  <br>
                  <span class="status orange"></span>
                  ${Number(dateParts[2].substring(0,2))+1}-${dateParts[1]}-${dateParts[0]}
                  
                </td>
                <td>
                  <button onclick=cancelApoointment(${this.id})>Cancel<span class="las la-arrow-right"> </span></button>
                </td>
              `
        let elem = document.createElement('tr')
        elem.innerHTML = text
        div.appendChild(elem)

    }
}

function cancelApoointment(id) {
    let visitid = visits[id].getVisidId()
    let patientname = localStorage.getItem('login')
    postData('post', '/patient/cancelappo', {
        id: visitid,
        login: patientname,
    })
        .then(data => {
            if (data.message == 'canceled') {
                Swal.fire({
                    title: 'Visit canceled succesful!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(function () {
                    window.location.reload()
                });

            }
        })
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('domloaded')
    document.getElementById('setnick').innerHTML = localStorage.login

    console.log(localStorage.getItem('patientid'))
    postData('POST', '/patient/loadashboard', {
        id: localStorage.getItem('patientid')
    }).then(data => {

        if (data.message == 'any') {
            let text = `  <tr>
                <td colspan="4" >You have no appointments</td>
              </tr>`
            document.getElementById('my_visits').innerHTML = text

        } else {
            console.log(data.result)

            for (let i = 0; i < data.result.length; i++) {
                let obj = data.result[i]
                let visit = new Visit(obj.name + ' ' + obj.surname, obj.fullnick, obj.starttime, obj.endtime, i, obj.id, obj.date)
                visits.push(visit)
                visit.show('my_visits')
            }
        }

    })



}, false);



//do zrobienia walidacja
function validDoctorTime() {

}

function submitAppointment() {
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let date = document.getElementById('date').value
    let doctor = document.getElementById('doctor').value
    let time = document.getElementById('time').value
    let phone = document.getElementById('phone').value
    let service = document.getElementById('service').value
    console.log(name, email, date, doctor, time, phone, service)
    postData('post','/patient/makeappo', {
      name:name,
      email:email,
      patientid:localStorage.getItem('patientid'),
      login:localStorage.getItem('login'),
      doctorid:doctor,
      starttime:time,
      phone:phone,
      date:date,
      service:service
    })
        .then(data => {
            if (data.message == 'ok') {
                Swal.fire({
                    title: 'You have reserved appointment!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(function () {
                    window.location.reload()
                });
            }
        })
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