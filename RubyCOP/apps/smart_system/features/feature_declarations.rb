require 'singleton'

require_relative '../../../src/module'
require_relative '../../../src/object'
require_relative '../../../src/application_domain/abstract_feature'
require_relative '../../../src/application_domain/feature'
require_relative '../../../src/application_domain/feature_declaration'
Dir[File.dirname(__FILE__) + "/feature_definitions/*.rb"].each { |file| require file }

#
# Class declaring the features of the app
#
class AppFeatureDeclaration < FeatureDeclaration

	include Singleton

	def initialize()
		super()
		
		_define_features_about_keys()
		_define_features_about_memory()
		_define_features_about_size()

		@root_feature.add_relation(:Mandatory,
															 [@display_catalogue_feature, @display_product_information_feature])
		@root_feature.add_relation(:Optional, [@filter_products_feature])
	end

end