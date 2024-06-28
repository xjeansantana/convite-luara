// Função para definir um cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Função para obter o valor de um cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim(); // Adicionando trim para remover espaços em branco
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Função para atualizar o link do WhatsApp com o nome do convidado
function atualizarLinkWhatsapp() {
    var nome = getCookie("nomeFornecido");
    if (nome) {
        var whatsappMsg = `Olá, Monalisa. ${nome} está confirmando a presença.`;
        var whatsappUrl = `https://api.whatsapp.com/send?phone=5575991601163&text=${encodeURIComponent(whatsappMsg)}`;
        var link = document.getElementById('confirmar-presenca');
        link.href = whatsappUrl;
    }
}

// Verifica se o cookie de nome já foi definido e se estamos na página index.html
var isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
var nomeFornecido = getCookie("nomeFornecido");

if (isIndexPage && !nomeFornecido) {
    const convidado = prompt('Olá...Digite seu nome: ');
    if (convidado) {
        document.getElementById('convidado').innerHTML = convidado;
        setCookie("nomeFornecido", convidado, 365); // Define o cookie com o nome fornecido por 365 dias
        atualizarLinkWhatsapp();
    }
} else if (nomeFornecido) {
    // Se o cookie estiver definido, exibe o nome do convidado salvo no cookie
    document.getElementById('convidado').innerHTML = nomeFornecido;
    atualizarLinkWhatsapp();
}

// Adiciona o evento de clique ao botão de confirmação de presença
document.getElementById('confirmar-presenca').addEventListener('click', function(event) {
    atualizarLinkWhatsapp();
});
