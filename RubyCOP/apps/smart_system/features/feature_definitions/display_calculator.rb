#
# Feature to display the keys calculator
#

module DisplayCalculator

    behaviour_adaptation()
  
    module Behaviour
  
      adapts_class :KeysModel
  
      attr_accessor :array_calcu
      attr_accessor :operateurs
  
      def initialize()
        proceed()
        @array_calcu = []
        @operateurs = ['+','-','*','/']
      end
  
      def append(n)
        if operateurs.includes?(array_calcu.last) && operateurs.includes?(n)  
          # Display un truc
        else 
          @array_calcu.push(n)
        end
      end

      def resultArray()
        result = 0
        while !@array_calcu.empty?
          number1 = ""
          number2 = ""
          while !operateurs.include?(@array_calcu.first)
            number1 = number1 + @array_calcu.shift
          end

          op = @array_calcu.shift

          while !operateurs.include?(@array_calcu.first)
            number2 = number2 + @array_calcu.shift
          end

          if op == '+'
            result = result + (number1.to_i + number2.to_i)
          elsif op == '-' 
            result = result + (number1.to_i + number2.to_i)
          elsif op == '*'
            result = result + (number1.to_i + number2.to_i)
          else
            result = result + (number1.to_i + number2.to_i)
          end

        end
        return result 
      end
            

  
    user_interface_adaptation()
  
    module ViewKeys
  
      adapts_class :KeysView
  
      def initialize(keys_model)
        proceed(keys_model)
      end
  
      def create_keys_layout(frame)
        h_frame = proceed(frame)
        @label_calculator = FXUI::Factory.create_widget(:Label,
                                                   h_frame,
                                                   @product_model.price.to_s(),
                                                   :opts => LAYOUT_FILL|JUSTIFY_RIGHT)
        return h_frame
      end
  
      def update(frame)
        proceed(frame)
        @label_price.text = @product_model.price.to_s()
      end
  
    end
  
  end