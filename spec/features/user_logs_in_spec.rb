require 'rails_helper'

RSpec.describe "Log In and Log Out" do
  it "allows a registered user to Log In to Site" do
    visit '/'
    click_on "Login"
    expect(current_path).to eq(login_path)

    fill_in "user_email", with: "email@email.com"
    fill_in "user_password", with: "password"

    click_on "Login to My Account"

    expect(current_path).to eq('/')
    expect(page).to have_content("Logout")
  end

  it "allows a registered user to Log Out of the Site" do
    visit '/'
    click_on "Login"
    expect(current_path).to eq(login_path)

    fill_in "user_email", with: "email@email.com"
    fill_in "user_password", with: "password"

    click_on "Login to My Account"

    expect(current_path).to eq('/')
    expect(page).to have_content("Logout")

    click_on "Logout"
    expect(page).to have_content("Login")
    expect(page).to have_content("Create Account")
  end


end
