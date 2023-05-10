const username = document.querySelector('#username');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const formBox = document.querySelectorAll('.form-box')
const clearBtn = document.querySelector('.clear-btn')
const sendBtn = document.querySelector('.send-btn')
const closeBtn = document.querySelector('.close')
const popup = document.querySelector('.popup')

const formBoxArray = [username, password, password2, email];


const clearFormBox= (e) => {
    e.preventDefault()
    formBoxArray.forEach(element => {
        element.value = ''
        clearError(element);
    })
    popup.style.top = "-300px"
}
const showError = (input, msg) => {
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-text');

    formBox.classList.add('error');
    errorMsg.textContent = msg;
}

const clearError = input => {
    const formBox = input.parentElement;
    formBox.classList.remove('error');
}

const checkLength = (input, min) =>{

        if(input.value.length < min && input.value.length !== 0 ){
            showError(input, `${input.previousElementSibling.innerText.slice(0,-1)} składa się z min. ${min} znaków.`)
        }
}

const checkPassword = () =>{
    if(password2.value !== password.value){
        showError(password2,'Hasła do siebie nie pasują.')
    }
}

const checkMail = email =>{

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if(re.test(email.value)){
        clearError(email)
    }else {
        showError(email, 'Niepoprawny adres e-mail.')
    }

}

const checkEmptyFormBox = () =>{
    formBoxArray.forEach(element =>{
        if(element.value === '' ){
            showError(element, element.placeholder)
        }else{
            clearError(element);
        }
    })
}

const  checkErrors = () =>{
    let errorCount = 0;
    for(const element of formBox){
        if(element.classList.contains('error')){
           errorCount ++;
        }
    }
    if (!errorCount){
        popup.style.top = "150px";
    }
}



const checkFormBox = input => {
    input.preventDefault()

    checkEmptyFormBox()
    checkPassword();
    checkMail(email);

    checkLength(username, 3);
    checkLength(password, 8);

    checkErrors();



}

clearBtn.addEventListener('click', clearFormBox)
sendBtn.addEventListener('click', checkFormBox)
closeBtn.addEventListener('click', clearFormBox)