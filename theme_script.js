console.log("Hello potential coworker!");

let savedStyle = localStorage.getItem('savedStyle');

if(savedStyle == null){
    setThemeStyle('default');
}else{
    setThemeStyle(savedStyle);
}

let themeButtons = document.getElementsByClassName('theme-button');

for(var i=0; i < themeButtons.length; i++){

    themeButtons[i].addEventListener('click', function(){
        let style = this.dataset.style;
        console.log('Theme ' + style + ' button clicked!');

        setThemeStyle(style);
    })
}

function setThemeStyle(style){

    document.getElementById('theme-setting').href = style + ".css";
    localStorage.setItem('savedStyle', style);
}

//Contact Form
const form = document.querySelector("form");
form.addEventListener("submit'", (event) => {
    //prevent the form from refreshing the page
    event.preventDefault();

    const { name, subject, email, message } = event.target;
    
    //API Gateway API endpoint URL
    const endpoint = "<https://atvc1mufqj.execute-api.us-east-2.amazonaws.com/default/sendContactEmail>";

    const body = JSON.stringify({
        senderName: name.value,
        senderSubject: subject.value,
        senderEmail: email.value,
        message: message.value
    });
    const requestOptions = {
        method: "POST",
        body
    };

    fetch(endpoint, requestOptions)
        .then((response) => {
            if (!response.ok) throw new Error("Error in fetch");
            return response.json();
        })
        .then((response) => {
            document.getElementById("result-text").innerText = "Email sent successfully!";
        })
        .catch((error) => {
            document.getElementById("result-text").innerText = "An unknown error occurred.";
        });

});

