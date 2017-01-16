/* global $ , Stripe*/    

// Doc Ready Fucntion
    // Set STRIPE Public Key
    // When users clicks form submit btn
        // Prevent default behavior
        
        //Collect the CC fields
        // Send CC info to STRIPE
        // Stripe will return card token
        // inject that token into form
    // Submit Form to rails app


$(document).on('turbolinks:load', function(){
    var theForm = $('#pro-form');
    var submitBtn = $('#form-submit-btn');

    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
    
    
    // When the submit button is clicked.... 
    submitBtn.click(function(event){
        
       // Prevent Form Submission    
       event.preventDefault();
       
       // Assign Form Values to Variables
       var ccNum = $('#card_number').val();
       var cvcNum =  $('#card_code').val();
       var exMo =  $('#card_month').val();
       var exYr =  $('#card_year').val();
            
        
    });
    
    // Send to Stripe
    Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: exMo,
        exp_year: exYr
    }, stripeResponseHandler){

    });
});