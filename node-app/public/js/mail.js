const mailSender = (name, email, message) =>{

    const templateParams = {
        name: name,
        email: email,
        message: message,
    };

    emailjs.send('service_f88mcdk', 'template_i7njmdt', templateParams).then(
        (response) => {
            alert("Спасибо! Ваша заявка принята в работу.")
            window.location.href = "conact_to_me.html";
        },
        (error) => {
            alert("Ошибка отправки попробуйте еще")
        },
    );

}
