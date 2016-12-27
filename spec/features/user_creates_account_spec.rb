require 'rails_helper'

RSpec.describe "Account Creation" do
  it "allows a visitor to create an acount and log in" do
    visit '/'
    click_on "Create Account"
    expect(current_path).to eq(signup_path)

    fill_in "user_name", with: "Susi"
    fill_in "user_email", with: "email@email.com"
    fill_in "user_password", with: "password"
    fill_in "user_password_confirmation", with: "password"

    click_on "Create My Account"

    expect(current_path).to eq('/')
    expect(page).to have_content("Logout")
    expect(page).to_not have_content("Create Account")
  end
end
