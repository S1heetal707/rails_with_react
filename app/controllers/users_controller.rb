class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    users = User.all
    render json: users
  end

   def create
    user = User.create(user_params)
    render json: user
  end

  def destroy
    User.destroy(params[:id])
  end

  def update
    user = User.find_by(id: params[:id])
    user.update!(user_params)
    render json: user
  end

def search
  search_field = params[:search].present? ? params[:search] : '*'
  users = if search_field.present?
             User.search(search_field)
           else
             User.all
           end
  render json: users
end


  private

  def user_params
    params.permit(:id, :name, :email)
  end
end
