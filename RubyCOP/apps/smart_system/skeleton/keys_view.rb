class KeysView < FBCOObject

    attr_accessor :main_window
  
    def initialize(keys_model)
      @keys_model = keys_model
      @keys_model.add_observer(self)
      @has_title = false
    end

    def update() # à mettre dans les features
    end
  
    def create_keys_layout()
      unless @has_title
        h_frame = FXUI::Factory.create_ui_object(:HorizontalFrame, @main_window, :opts => LAYOUT_FILL_X)
        
        button1 = FXUI::Factory.create_widget(:Button,h_frame,"Hey",:opts => LAYOUT_FILL_X|JUSTIFY_CENTER_X)

        button1.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            puts("Clicked")
          end
        }

        FXUI::Factory.create_widget(:Button,h_frame,"Yo",:opts => LAYOUT_FILL_X|JUSTIFY_CENTER_X)
        FXUI::Factory.create_widget(:Button,h_frame,"Bjour",:opts => LAYOUT_FILL_X|JUSTIFY_CENTER_X)
        @has_title = true
      end
    end

    def do_on_click()
      puts("Click")
    end
  
  end