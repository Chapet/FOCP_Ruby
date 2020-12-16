#
# Feature to display the keys calculator
#

module DisplayCalculator

  behaviour_adaptation()

  module Behaviour

    adapts_class :KeysView

    attr_accessor :array_calcu
    attr_accessor :operateurs

    def initialize(keys_model) #remove le proceed
      @array_calcu = []
      @operateurs = ['+','-','*','/']
    end

    def append(n)
      if operateurs.include?(array_calcu.last) && operateurs.include?(n)  
        puts("error append in display_calculator")
      else 
        @array_calcu.push(n)
      end
    end
    
    def preResult(stringInput)
      i = 0
      until i == stringInput.size
        append(stringInput[i])
        i = i+1
      end
      return resultArray().to_s
    end

    def resultArray() # preResult qui va append tout au array_calcu puis l'envoyer au result
      puts(@array_calcu.first)

      result = 0
      while !@array_calcu.empty?
        number1 = ""
        number2 = ""
        while !operateurs.include?(@array_calcu.first)
          number1 = number1 + @array_calcu.shift
        end
        puts(@array_calcu.first)
        op = @array_calcu.shift

        while !operateurs.include?(@array_calcu.first) && !@array_calcu.empty?
          puts(@array_calcu.first)
          number2 = number2 + @array_calcu.shift
          puts(@array_calcu.first)
        end

        if op == '+'
          result = result + (number1.to_i + number2.to_i)
        elsif op == '-' 
          result = result + (number1.to_i - number2.to_i)
        elsif op == '*'
          result = result + (number1.to_i * number2.to_i)
        else
          result = result + (number1.to_i / number2.to_i)
        end

      end
      return result 
    end
  end
        
end