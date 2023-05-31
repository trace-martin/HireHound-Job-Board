const loginForm = $('#login-form');
const signUp = $('#signup-form');
const loginContainer = $('login-container');
const signUpContainer = $('signup-container');
const toggleSignUp = $('toggle-signup');
const toggleLogin = $('toggle-login');



$(document).ready(function() {
    $('#toggle-login').click(function(e) {
        e.preventDefault();
        $('#login-container').toggleClass('visually-hidden');
        $('#signup-container').toggleClass('visually-hidden');
    });
    
    $('#toggle-signup').click(function(e) {
        e.preventDefault();
        $('#signup-container').removeClass('visually-hidden');
        $('#login-container').addClass('visually-hidden');
    });

    $('#login-form').submit( async (e) => { 
        e.preventDefault();

        const username = $('#login-email').val().trim();
        const password = $('#login-password').val().trim();

        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
             'Content-Type': 'application/json'       
            },
            body: JSON.stringify({
                email: username,
                password
            })
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            const errData = await response.json();
            console.error('Login failed:', errData.message);
            alert('Login failed')
        }
    }) 
    $('#signup-form').submit( async (e) => { 
           e.preventDefault();
    
           const name = $('#signup-name').val().trim();
           const email = $('#signup-email').val().trim();
           const password = $('#signup-password').val().trim();
    
           const response = await fetch('/api/users', {
               method: 'POST',
               headers: {
                'Content-Type': 'application/json'       
               },
               body: JSON.stringify({
                    name,
                   email,
                   password,
               })
           });
    
           if (response.ok) {
               document.location.replace('/');
           } else {
               const errData = await response.json();
               console.error('Signup failed:', errData.message);
               alert('Signup failed')
           }
       })
});
