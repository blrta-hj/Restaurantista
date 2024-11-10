function openModal(){
    document.getElementById("myModal").style.display="block";
}

function closeModal(){
    document.getElementById("myModal").style.display="none";
}

$(document).ready(function(){
    $('#newsletter-form').submit(function(event){
        event.preventDefault();

        let email = $('#email').val().trim();
        var newsletter = $('#checkbox').is(':checked');
        
        if(!isValidEmail(email)){
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        $.ajax({
            url: '/submit-form.js',
            type: 'POST',
            data: {
                email: email,
                newsletter: newsletter
            },

            success: function(response){
                showMessage("Thank you for subscribing!", 'success');
                $('#newsletter-form')[0].reset();
            },

            error: function(xhr, status, error){
                showMessage("An error occurred. Please try again later.", "error");
                console.log(xhr.responseText);
            
            }
        })
   
   
    })



});


function showMessage(message, type){
    let messageContainer = $('#message-container');
    messageContainer.text(message);

    messageContainer.removeClass().addClass(type);

    let countdown = 10;
    let countdownInterval = setInterval(function(){
        messageContainer.html(`Page will reload in ${countdown} second${countdown !==1 ? "s" : ""}`

        );
        countdown--;

        if(countdown < 0){
            clearInterval(countdownInterval);
            window.location.reload();
        }
    
    }, 1000);
}