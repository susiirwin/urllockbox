require 'rails_helper'

RSpec.describe "Submit Links" do
  it "allows a user to create a new link" do
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

    expect(current_path).to eq(root_path)

    fill_in "link_title", with: "Title"
    fill_in "link_url", with: "http://www.google.com"

    click_on "Submit Link"
    expect(page).to have_content("Link Title: Title")
    expect(page).to have_content("Link URL: http://www.google.com")
  end
end
