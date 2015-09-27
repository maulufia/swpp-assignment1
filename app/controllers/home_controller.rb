class HomeController < ApplicationController

  def index
  	if session[:logged_in] == true
  		@user = User.find_by(username: session[:username].downcase)
  	end

  	respond_to do |format|
	    format.html # new.html.erb
	end
  end

  def login
  	@user = User.find_by(username: params[:username].downcase)
  	if @user && @user.password == params[:password]
		# count++
		@user.count += 1
		@user.save

		# set sessions
		session[:username] = @user.username
		session[:logged_in] = true
    else
    	render :json => {"error_code" => -4}
      	return
    end

    respond_to do |format|
	    format.html { render :json => {"user_name" => @user.username, "login_count" => @user.count} }
	    format.json  { render :json => {"user_name" => @user.username, "login_count" => @user.count} }
	end
  end

  def logout
  	session[:logged_in] = false
  	session[:username] = ''

  	render :nothing => true
  end

  def signup
  	@user = User.new
  	@user.username = params[:username] ? params[:username] : ''
  	@user.password = params[:password] ? params[:password] : ''

  	valid = false # validation variable

  	# validating length of inputs
  	if @user.username.length < 5 || @user.username.length > 20
  		render :json => {"error_code" => -1}
  		return
	elsif @user.password.length < 8 || @user.password.length > 20
		render :json => {"error_code" => -2}
		return
	end

	# validating user existence
  	user = User.find_by(username: params[:username].downcase)
  	if user
  		render :json => {"error_code" => -3}
  		return
	end

    user_saved = @user.save
    if !user_saved
    	return
    end

    respond_to do |format|
	    format.html { render :json => {"user_name" => @user.username, "login_count" => @user.count} }
	    format.json  { render :json => {"user_name" => @user.username, "login_count" => @user.count} }
	end
  end

  def clearData
  	User.delete_all

  	respond_to do |format|
	    format.html { render :nothing => true }
	    format.json  { render :nothing => true }
	end
  end
end
