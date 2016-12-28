require 'rails_helper'

RSpec.describe "Submit Links" do
  it "allows a user to create a new link" do
    login_user

    expect(current_path).to eq(root_path)

    fill_in "link_title", with: "Title"
    fill_in "link_url", with: "www.google.com"

    click_on "Submit Link"
    expect(page).to have_content("Link Title: Title")
    expect(page).to have_content("Link URL: www.google.com")
  end
end
