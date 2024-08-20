document.getElementById("passwordForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const input1 = document.getElementById("passwordfield1");
    const input2 = document.getElementById("passwordfield2");

    if (input1.value !== input2.value){
        alert("As senhas não coincidem.");
        input1.value = "";
        input2.value = "";
    }
    else {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        const button = document.getElementById('submitButton');
        button.disabled = true;
        button.innerText = 'CARREGANDO...';

        fetch(`http://${process.env.APP_URL}/password/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                password: input1.value,
            })
        }).then(() => {
            alert("Senha registrada com sucesso vá para o aplicativo de entrega e faça o seu login.");
            input1.value = "";
            input2.value = "";
            button.disabled = false;
            button.innerText = 'ENVIAR'; 
        }).catch(() => {
            alert("Erro ao registrar senha.");
            input1.value = "";
            input2.value = "";
            button.disabled = false;
            button.innerText = 'ENVIAR';
        });
    }
});