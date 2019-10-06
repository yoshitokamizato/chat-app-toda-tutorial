class AddUserIdToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :user_id, :integer, default: 1
  end
end
