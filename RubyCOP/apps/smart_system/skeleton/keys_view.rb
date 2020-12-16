class KeysView < FBCOObject

    attr_accessor :main_window
  
    def initialize(keys_model)
      @keys_model = keys_model
      @keys_model.add_observer(self)
      @has_title = false
    end

    def update(frame) # à mettre dans les features
    end

    def resize_buttons(pixels)
      @button_7.resize(pixels,pixels)
      @button_8.resize(pixels,pixels)
      @button_9.resize(pixels,pixels)
      @button_plus.resize(pixels,pixels)
      @button_4.resize(pixels,pixels)
      @button_5.resize(pixels,pixels)
      @button_6.resize(pixels,pixels)
      @button_minus.resize(pixels,pixels)
      @button_1.resize(pixels,pixels)
      @button_2.resize(pixels,pixels)
      @button_3.resize(pixels,pixels)
      @button_div.resize(pixels,pixels)
      @button_eff.resize(pixels,pixels)
      @button_0.resize(pixels,pixels)
      @button_equal.resize(pixels,pixels)
      @button_mult.resize(pixels,pixels) 
    end
  
    def create_keys_layout(pixels)
      unless @has_title

        h_frame_1 = FXUI::Factory.create_ui_object(:HorizontalFrame, @main_window, :opts => LAYOUT_FILL_X)
        @calculator_screen = FXUI::Factory.create_widget(:Label,h_frame_1,"computation will render here",:opts => LAYOUT_FILL_X|JUSTIFY_CENTER_X)
      ###
        h_frame_2 = FXUI::Factory.create_ui_object(:HorizontalFrame, @main_window, :opts => LAYOUT_FILL_X)
        @button_7 = FXUI::Factory.create_widget(:Button,h_frame_2,"7",:opts=>LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)
        @button_8 = FXUI::Factory.create_widget(:Button,h_frame_2,"8",:opts => LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)
        @button_9 = FXUI::Factory.create_widget(:Button,h_frame_2,"9",:opts => LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)
        @button_plus = FXUI::Factory.create_widget(:Button,h_frame_2,"+",:opts => LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)

        @button_7.resize(pixels,pixels)
        @button_8.resize(pixels,pixels)
        @button_9.resize(pixels,pixels)
        @button_plus.resize(pixels,pixels)

        """puts(button_7.baseColor)
        button_7.baseColor=Fox.FXRGB(0,0,0)
        button_7.borderColor=Fox.FXRGB(250,250,250)
        h_frame_2.borderWidth=5
        puts(button_7.baseColor)
        @main_window.repaint()"""

        @button_7.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("7")
          end
        }
        @button_8.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("8")
          end
        }
        @button_9.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("9")
          end
        }
        @button_plus.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("+")
          end
        }
        ###
        h_frame_3 = FXUI::Factory.create_ui_object(:HorizontalFrame, @main_window, :opts => LAYOUT_FILL_X)
        @button_4 = FXUI::Factory.create_widget(:Button,h_frame_3,"4",:opts => LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)
        @button_5 = FXUI::Factory.create_widget(:Button,h_frame_3,"5",:opts => LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)
        @button_6 = FXUI::Factory.create_widget(:Button,h_frame_3,"6",:opts => LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)
        @button_minus = FXUI::Factory.create_widget(:Button,h_frame_3,"-",:opts => LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)

        @button_4.resize(pixels,pixels)
        @button_5.resize(pixels,pixels)
        @button_6.resize(pixels,pixels)
        @button_minus.resize(pixels,pixels)

        @button_4.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("4")
          end
        }
        @button_5.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("5")
          end
        }
        @button_6.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("6")
          end
        }
        @button_minus.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("-")
          end
        }
        ###
        h_frame_4 = FXUI::Factory.create_ui_object(:HorizontalFrame, @main_window, :opts => LAYOUT_FILL_X)
        @button_1 = FXUI::Factory.create_widget(:Button,h_frame_4,"1",:opts => LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)
        @button_2 = FXUI::Factory.create_widget(:Button,h_frame_4,"2",:opts => LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)
        @button_3 = FXUI::Factory.create_widget(:Button,h_frame_4,"3",:opts => LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)
        @button_div = FXUI::Factory.create_widget(:Button,h_frame_4,"/",:opts => LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)

        @button_1.resize(pixels,pixels)
        @button_2.resize(pixels,pixels)
        @button_3.resize(pixels,pixels)
        @button_div.resize(pixels,pixels)

        @button_1.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("1")
          end
        }
        @button_2.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("2")
          end
        }
        @button_3.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("3")
          end
        }
          @button_div.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("/")
          end
        }
        ###
        h_frame_5 = FXUI::Factory.create_ui_object(:HorizontalFrame, @main_window, :opts => LAYOUT_FILL_X)
        @button_eff = FXUI::Factory.create_widget(:Button,h_frame_5,"eff",:opts => LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)
        @button_0 = FXUI::Factory.create_widget(:Button,h_frame_5,"0",:opts => LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)
        @button_equal = FXUI::Factory.create_widget(:Button,h_frame_5,"=",:opts => LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)
        @button_mult = FXUI::Factory.create_widget(:Button,h_frame_5,"*",:opts => LAYOUT_FIX_WIDTH|LAYOUT_FIX_HEIGHT|JUSTIFY_CENTER_X|LAYOUT_CENTER_X)

        @button_eff.resize(pixels,pixels)
        @button_0.resize(pixels,pixels)
        @button_equal.resize(pixels,pixels)
        @button_mult.resize(pixels,pixels)

        @button_eff.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("eff")
          end
        }
        @button_0.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("0")
          end
        }
        @button_equal.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("=")
          end
        }
        @button_mult.connect(SEL_COMMAND){
          |sender, sel, checked|
          if checked 
            do_on_click("*")
          end
        }
        ###
        @has_title = true
      end
    end

    def do_on_click(symbol)
      puts(symbol)
    end
  
  end