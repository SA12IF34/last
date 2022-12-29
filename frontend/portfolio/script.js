import axios from 'axios';


function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

let csrftoken = getCookie('csrftoken');

const api = axios.create({
    baseURL: "/saifapis"
})


let form = document.querySelector("#send-message");
let name = document.getElementById("name");
let email = document.getElementById("email");
let subject = document.getElementById("subject");
let msg = document.getElementById("message");

async function sendMessage() {
    const response = await api.post("/send-message/", {
        name: name.value,
        email: email.value,
        subject: subject.value,
        body: msg.value
    }, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        }
    });

    const status = await response.status;

    if (status === 200) {
        alert("good ;)");
    } 

}

form.onsubmit = (e) => {
    e.preventDefault();
    sendMessage();
}
