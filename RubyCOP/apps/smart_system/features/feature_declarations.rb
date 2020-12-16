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

		@root_feature.add_relation(:Optional, [@display_keys_feature,@display_size_feature, @display_arrows_feature]) # mandatory et remove arrows
		#@root_feature.add_relation(:Optional, [@display_arrows_feature])
	end

	private 

	def _define_features_about_keys()
		@display_keys_feature = AbstractFeature.new('DisplayKeys')


		@display_calculator_feature = Feature.new('DisplayCalculator', ['KeysModel', 'KeysView'])
		@display_additional_keys_feature = Feature.new('DisplayAddKeys', ['KeysModel', 'KeysView']) # Classes dans le skeleton 

		
		@display_keys_feature.add_relation(:Alternative, [@display_calculator_feature,@display_additional_keys_feature])
	end

	def _define_features_about_memory()
		@display_arrows_feature = Feature.new('DisplayArrows', ['KeysModel', 'KeysView'])
	end

	def _define_features_about_size()
		@display_size_feature = AbstractFeature.new('DisplaySize')


		@set_scale_high_feature = Feature.new('ScaleHigh', ['KeysModel', 'KeysView'])
		@set_scale_low_feature = Feature.new('ScaleLow', ['KeysModel', 'KeysView']) # Classes dans le skeleton 

		
		@display_size_feature.add_relation(:Alternative, [@set_scale_high_feature, @set_scale_low_feature])
	end
end