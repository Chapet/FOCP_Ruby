module ScaleHigh

  user_interface_adaptation()

  module ScaleHighView

    adapts_class :KeysView

    set_prologue :resize_buttons

    def initialize(keys_model)
    end

    def resize_buttons(pixels=200, size_font="400")
      proceed(pixels,size_font)
    end

    def update(frame)
      proceed(frame)
    end

  end
end