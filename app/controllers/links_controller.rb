class LinksController < ApplicationController

  def index
    if current_user
      @links = current_user.links
    else
      redirect_to signup_path
    end
  end

  def create
    @link = Link.create(link_params)
    if @link.persisted?
      current_user.links << @link
      redirect_to root_path
    else
      flash[:notice] = "Your Link is Invalid"
      redirect_to root_path
    end
  end

  private
  def link_params
    params.require(:link).permit(:title, :url)
  end

end
