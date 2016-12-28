class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find_by(params[:email])
    if user && user.authenticate(params[:password])
      session[:current_user_id] = user.id
      redirect_to root_path
    else
      flash[:notice] = "something went wrong"
      redirect_to login_path
    end
  end

  def destroy
    reset_session
    flash[:notice] = "You have successfully logged out."
    redirect_to root_url
  end

end
