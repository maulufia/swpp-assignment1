class User < ActiveRecord::Base
	validates :username, :presence => true,
						 :length => { :minimum => 5, :maximum => 20 }
	validates :password, :presence => true,
						 :length => { :minimum => 8, :maximum => 20 }
end
