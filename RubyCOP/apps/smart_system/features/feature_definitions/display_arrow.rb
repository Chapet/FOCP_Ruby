module DisplayArrows

    behaviour_adaptation()
  
    module Behaviour
      adapts_class :KeysModel

      def initialize()
        proceed()  
      end
    end
end