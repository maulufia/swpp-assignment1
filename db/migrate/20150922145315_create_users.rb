class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, :null => false, :unique => true
      t.string :password, :null => false
      t.integer :count, :default => 0

      t.timestamps null: false
    end
  end
end
