class PagesController < ApplicationController
    # GET Request for '/' aka Homepage
    def home
        @basic_plan = Plan.find(1)
        @pro_plan = Plan.find(2)
    end
    
    def about
    end
    
end