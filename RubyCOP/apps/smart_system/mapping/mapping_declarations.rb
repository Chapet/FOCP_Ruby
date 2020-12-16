require 'singleton'
 
require_relative '../../../src/application_domain/mapping_declaration'
 
#
# Class declaring the mapping of the app
#
#
class AppMappingDeclaration < MappingDeclaration
 
    include Singleton
 
    def initialize()
        @mapping = {
            [
                AppContextDeclaration.instance.normal_mode_context()
            ] =>
            [
                AppFeatureDeclaration.instance.display_calculator_feature()
                #AppFeatureDeclaration.instance.set_scale_low_feature()
            ],
 
            [
                AppContextDeclaration.instance.scientific_mode_context()
            ] =>
            [
                AppFeatureDeclaration.instance.display_calculator_feature(),
				AppFeatureDeclaration.instance.display_additional_keys_feature()
			],
 
            ##############################################################################################
            
			[
                AppContextDeclaration.instance.normal_user_context()
            ] =>
            [
                AppFeatureDeclaration.instance.set_scale_low_feature()
            ],
 
            [
                AppContextDeclaration.instance.old_user_context()
            ] =>
            [
				AppFeatureDeclaration.instance.set_scale_high_feature()
			],
 
            #############################################################################################
                
            [
                 AppContextDeclaration.instance.normal_usage_context()
            ] =>
            [
                AppFeatureDeclaration.instance.display_arrows_feature()
            ]
            [
                 AppContextDeclaration.instance.exam_usage_context()
            ] =>
            [
                AppFeatureDeclaration.instance.undisplay_arrows_feature()
            ]
        }
    end
 
end