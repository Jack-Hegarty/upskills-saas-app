class ContactsController < ApplicationController
  
  # GET request to /contact-us
  # Shows view and established fresh Contact object
  def new
    @contact = Contact.new
  end
  
  # POST request to /contacts - Rails 'resources' routing
  def create
    #Mass assign form fields into Contact object
    @contact = Contact.new(contact_params)
    #Save contact object to database
    if @contact.save
      # variables for form fields via params (local)
      name = params[:contact][:name]
      email = params[:contact][:email]
      body = params[:contact][:comments]
      
      #Plug variables into Contact Mailer method and deliver email.
      ContactMailer.contact_email(name, email, body).deliver
      
      #Display Success Message in flash hash
      flash[:success] = 'Message Sent!'
      
      #redirect to 'New' Action
      redirect_to new_contact_path
    else
      
      #store the error message in flash hase and redirect to new action
      flash[:danger] = @contact.errors.full_messages.join(', ') 
      redirect_to new_contact_path
    end
  end
  
  private
    #To Collect data from form we need to use 'Strong Paramaters' best practices
    # whitelisting form fields
    def contact_params
      params.require(:contact).permit(:name, :email, :comments)
    end
    
end