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
        puts("hey")
        SmartSystem.new(app) # TODO use the correct classname
        puts("yo")
      end
      smart_system.run()
    end

  end

  attr_reader :main_window

  def initialize(app)
    @main_window = FXUI::Factory.create_main_window(app, "Smart System", app_width(), app_height()) # TODO give another title of your system
    @keys_model = KeysModel.new()
    puts("coucou")
    @keys_view = KeysView.new(@keys_model)
    @keys_view.main_window = @main_window
    @keys_view.create_keys_layout(100)
    @main_window.show(PLACEMENT_SCREEN)
  end

  def app_width() # Has to leave to features
    return 600
  end

  def app_height() # Idem
    return 800
  end

  def resize_app_layout(app_width, app_height)
    @main_window.ui_object.resize(app_width, app_height)
  end

end