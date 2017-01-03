Rails.application.routes.draw do
  root to: "links#index"

  resources :links, only: [:index, :create, :edit, :update]

  get '/signup' => 'users#new'
  post '/users' => 'users#create'

  get 'login'   => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

  namespace :api do
    namespace :v1 do
      resources :links, only: [:create]
    end
  end
end
