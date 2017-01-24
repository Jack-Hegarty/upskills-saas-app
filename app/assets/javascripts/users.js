/* global $, Stripe */
//Document ready.
$(document).on('turbolinks:load', function(){
    
  // Variables
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  
  //Set Stripe public key.
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  //When user clicks form submit btn,
  submitBtn.click(function(event){
      
    //prevent default submission behavior.
    event.preventDefault();
    
    submitBtn.val("Processing").prop('disabled', true);
    
    //Collect the credit card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    
    // Validate fields after assignment with Stripe.JS
        var error = false;
    
        if ( !Stripe.card.validateCardNumber(ccNum) ){
            error = true;
            alert('The credit card number appears to be invalid');
        }
        
        if ( !Stripe.card.validateCVC(cvcNum) ){
            error = true;
            alert('The CVC number appears to be invalid');
        }
    
        if ( !Stripe.card.validateExpiry(expMonth, expYear) ){
            error = true;
            alert('The expiration date appears to be invalid');
        }
    
    
    
    
    if(error){
        // Give Warning
        
        
    } else{
        
        //Send the card info to Stripe.
        Stripe.createToken({
          number: ccNum,
          cvc: cvcNum,
          exp_month: expMonth,
          exp_year: expYear
        }, stripeResponseHandler);
        
        
    }
    return false;
  });
  
  
  
  
  //Stripe will return a card token.
  function stripeResponseHandler(status, response){
      
      // Get Token variable from Response
      var token = response.id;
      
      //Inject card token as hidden field into form
      theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
      
      //Submit form to our Rails app.
      theForm.get(0).submit();
  }// End stripeReponseHandler Function
  
  
  
  
  
});