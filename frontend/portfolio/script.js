import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';



const name = document.getElementById("name");
const msg = document.getElementById("message");
const email = document.getElementById("email");
const subject = document.getElementById("subject");

document.getElementById("send-message").onsubmit = async () => {
    await axios.post('https://formsubmit.co/ajax/saifchan122@gmail.com', {
    
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: msg.value,
        
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
} 