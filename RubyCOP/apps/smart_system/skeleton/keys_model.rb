require "observer"

#
# Class to define a keys model
#
#
class KeysModel

  class << self

    def new()
      instance = super()
      _feed_keys(instance)
      return instance
    end

    def _feed_keys(keys_model)
      keys_model.add_product(KeyModel.new(name: 'Nintendo Switch',
                                                   price: 299.99,
                                                   description: "This is a Nintendo video game console"))
      keys_model.add_product(ProductModel.new(name: 'PS5',
                                                   price: 499.99,
                                                   description: "This is a Sony video game console"))
      keys_model.add_product(ProductModel.new(name: 'GeForce RTX3080',
                                                   price: 1099,
                                                   description: "This is a graphic card"))
      keys_model.add_product(ProductModel.new(name: 'T-Shirt Mario',
                                                   price: 49,
                                                   description: "This is a T-shirt with Mario on it"))
    end

  end

  include Observable

  def initialize()
  end

end