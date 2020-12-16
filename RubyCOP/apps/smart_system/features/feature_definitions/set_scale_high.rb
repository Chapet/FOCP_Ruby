module ScaleHigh

  user_interface_adaptation()

  module ScaleHighView

    adapts_class :KeysView

    set_prologue :resize_buttons

    def initialize(keys_model)
    end

    def resize_buttons(pixels=200)
      proceed(pixels)
      #KeysView.button_7.resize(300,300) 
    end

    def update(frame)
      proceed(frame)
    end

  end
end