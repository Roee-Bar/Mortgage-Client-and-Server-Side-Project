var nodemailer = require('nodemailer');

function restorePassword(email, password) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mashcantarestore@gmail.com',
            pass: 'zerd opzi lnnr cdrw'
        }
    });

    var mailOptions = {
        from: 'MashcantaRestore@gmail.com',
        to: `${email}`,
        subject: 'Restore password for Mashcanta Website',
        html: `<div dir="rtl">הסיסמה החדשה שלך לאתר היא  : <b>${password}</b><p>אתה יכול לשנות אותה אחרי התחברות בכרטיסייה שינוי סיסמה</p></div> `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


function contactForm(fname, lname, phone, email, selection, subject, callback) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mashcantarestore@gmail.com',
            pass: 'zerd opzi lnnr cdrw'
        }
    });

    var mailOptions = {
        from: 'MashcantaRestore@gmail.com',
        to: `calc.task@gmail.com`,
        subject: `${selection}`,
        html: `<div dir="rtl"><p>${fname} ${lname}</p><p> פונה אלינו בנושא: ${subject}</p> <p>כתובת מייל הלקוח: ${email}</p><p>טלפון הלקוח: ${phone}</p></div>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
            callback(error); // Pass the error to the callback
        } else {
            console.log('Email sent: ' + info.response);
            callback(null); // Pass null for error to the callback
        }
    });
}

module.exports = {
    restorePassword: restorePassword,
    contactForm: contactForm
};