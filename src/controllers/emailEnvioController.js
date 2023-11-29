const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS
    }
});
const URL = 'http://localhost:3000/enter/'

const sendMagicLink = async(email, link, method) => {
    var asunto;
    var body;
    console.log("email: " + email + " link: " + link + " method: " + method);

    if(method == 'signup'){
        asunto = "Tu link de registro";
        body='<p>Para registrarte en nuestra página, haz click en el siguiente enlace: ' + (URL + email+'/'+link)+ '</p><p>Si no te has registrado, ignora este mensaje.</p>';
    } else {
        asunto = "Tu link de acceso";
        body='<h1>Bienvenido de vuelta</h1><p>Para acceder a nuestra página, haz click en el siguiente enlace: ' + (URL + email+'/'+link)+ '</p><p>Si no has solicitado el acceso, ignora este mensaje.</p>';
    }

    const mailHead = {
        to: email,
        from: process.env.NODEMAILER_EMAIL,
        subject: asunto,
        html: body
    }
    try{
        const response = await transport.sendMail(mailHead);
        console.log('Link enviado');
        return({ok: true, message: 'Link enviado'});
    }
    catch(err){
        console.log('Fallo al enviar el link');
        console.log(err)
        return({ok: false, message: err});
    }
}

module.exports = { sendMagicLink };