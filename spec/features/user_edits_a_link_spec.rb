require 'rails_helper'

RSpec.describe "Edit Links" do
  it "allows a user to edit a link" do
    user = User.create(name: "User",
                    email: "email@email.com",
                    password: "password")

    link = Link.create(title: "Title",
                        url: "http://www.google.com",
                        user_id: user.id)

    visit '/'
    click_on "Login"

    fill_in "email", with: user.email
    fill_in "password", with: user.password

    click_on "Login to My Account"

    expect(current_path).to eq(root_path)

    expect(page).to have_content("Link Title: Title")
    expect(page).to have_content("Link URL: http://www.google.com")
    click_on "Edit Link"

    fill_in "link_title", with: "New Title"
    fill_in "link_url", with: "http://www.yahoo.com"
    click_on "Update Link"

    save_and_open_page
    expect(page).to have_content("Link Title: New Title")
    expect(page).to have_content("Link URL: http://www.yahoo.com")
  end
end
