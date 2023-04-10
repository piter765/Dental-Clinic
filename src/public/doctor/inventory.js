let visits = []

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
function change(id){
    let st = String(id)+'val'
    let newquant =  document.getElementById(st).value
    postData('POST', '/admin/changeinventory', {
        id:id,
        quantity:newquant
    }).then(data => {
        console.log(data.message)
        if (data.message == 'err') {
            Swal.fire({
                title: 'Someting gone wrong!',
                icon: 'error',
                confirmButtonText: 'Ok'
            }).then(function () {
                window.location.reload()
            });

        } else {
            Swal.fire({
                title: 'Success',
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(function () {
                window.location.reload()
            });
        }

    })

}
class Inventory {
    constructor(name, cost, quantity, id) {
        this.name = name
        this.cost = cost
        this.quantity = quantity
        this.id = id
    }
    show(id) {
        let div = document.getElementById(id)
        let text = `  
        <tr>
        <td>${this.name}</td>
        <td>${this.quantity}</td>
        <td>
          <span class="status purple"></span>
          ${this.cost}$
        </td>
        <td> 
          <button type="button" onclick="change(${this.id})">Change<span class="las la-arrow-right"> </span></button>
          <input type="number" id="${this.id}val" min="0" max="100">
        </td>
      </tr>
              `
        let elem = document.createElement('tr')
        elem.innerHTML = text
        div.appendChild(elem)

    }
}


document.addEventListener('DOMContentLoaded', function () {
    console.log('domloaded')
    document.getElementById('setnick').innerHTML = localStorage.login
    postData('POST', '/doctor/loadinventory', {
        login: localStorage.getItem('login')
    }).then(data => {

        if (data.message == 'err') {
            let text = `  <tr>
                <td colspan="4" >Something gone wrong</td>
              </tr>`
            document.getElementById('my_visits').innerHTML = text

        } else {
            console.log(data.result)

            for (let i = 0; i < data.result.length; i++) {
                let obj = data.result[i]
                let visit = new Inventory(obj.name, obj.cost, obj.quantity, obj.id)
                visits.push(visit)
                visit.show('inv')
            }
        }

    })



}, false);






function logout() {
    postData('delete', '/doctor/logout', {
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