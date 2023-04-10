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
function show(id, name, surname, date, description,usedinventory,fullnick) {
    let div = document.getElementById(id)
    var dateParts = date.split("-");
    let text = `  
    <td>${name} ${surname}</td>
    <td>${Number(dateParts[2].substring(0,2))+1}-${dateParts[1]}-${dateParts[0]}</td>
    <td>
      <span class="status purple"></span>
      ${fullnick}
    </td>
    <td> 
     ${description}
    </td>
    <td>${usedinventory}</td>
          `
    let elem = document.createElement('tr')
    elem.innerHTML = text
    div.appendChild(elem)

}

document.addEventListener('DOMContentLoaded', function () {
    console.log('domloaded')
    document.getElementById('setnick').innerHTML = localStorage.login
    postData('POST', '/doctor/reports', {
        login: localStorage.getItem('login')
    }).then(data => {

        if (data.message == 'err') {
            let text = `  <tr>
                <td colspan="4" >Something gone wrong</td>
              </tr>`
            document.getElementById('inv').innerHTML = text

        } else {
            console.log(data.result)

            for (let i = 0; i < data.result.length; i++) {
                let obj = data.result[i]
                show('inv',obj.name, obj.surname,obj.date,obj.description,obj.usedinventory,obj.fullnick)
                
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