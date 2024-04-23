//const convidado = document.getElementById9('convidado');

const convidado = prompt('Olá......Digite seu nome: ');
document.getElementById('convidado').innerHTML = convidado;

function confirmarPresenca() {
    window.open("https://api.whatsapp.com/send?phone=5575991601163&text=Oi,%20estou%20confirmando%20a%20minha%20presen%C3%A7a.", "_blank");
}
