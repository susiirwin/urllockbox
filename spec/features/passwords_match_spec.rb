require 'rails_helper'

RSpec.describe "Password matching" do
  it "allows signup with matching password" do
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
  end

  it "prohibits signup without matching password" do
    visit '/'
    click_on "Create Account"
    expect(current_path).to eq(signup_path)

    fill_in "user_name", with: "Susi"
    fill_in "user_email", with: "email@email.com"
    fill_in "user_password", with: "password"
    fill_in "user_password_confirmation", with: "password1"

    click_on "Create My Account"

    expect(current_path).to eq('/signup')
    expect(page).to have_content("Passwords Must Match.")
    expect(page).to_not have_content("Logout")
  end
end
