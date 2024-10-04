class User < ApplicationRecord
	include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
	has_many :posts

	settings do
    mappings dynamic: false do
      indexes :name, type: 'string'
      indexes :email, type: 'keyword'
    end
  end
end