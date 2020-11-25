#
# Main class of the system
#
class SmartSystem # TODO rename the class

  class << self

    include CodeExecutionAtLaunchTime

    def run()
      # TODO rename the variable "smart_system"
      smart_system = FXUI::Factory.create_app() do
        |app|
        SmartSystem.new(app) # TODO use the correct classname
      end
      smart_system.run()
    end

  end

  attr_reader :main_window

  def initialize(app)
    @main_window = FXUI::Factory.create_main_window(app, "Smart System", app_width(), app_height()) # TODO give another title of your system
    # TODO
    @main_window.show(PLACEMENT_SCREEN)
  end

  def app_width()
    return 600
  end

  def app_height()
    return 800
  end

end