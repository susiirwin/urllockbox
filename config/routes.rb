Rails.application.routes.draw do
  root to: "links#index"

  resources :links, only: [:index]

  get '/signup' => 'users#new'
  post '/users' => 'users#create'
  get 'login' => 'sessions#new'
  get '/logout'  => 'sessions#destroy'

  namespace :api do
    namespace :v1 do
      resources :links, only: [:create]
    end
  end
end
