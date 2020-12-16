module DisplayArrows

  user_interface_adaptation()

  module DisplayArrowsView

    adapts_class :KeysView

    set_prologue :resize_arrows

    def initialize(keys_model)
    end

    def resize_arrows(pixels=50)
      proceed(pixels)
    end

    def update(frame)
      proceed(frame)
    end

  end
end