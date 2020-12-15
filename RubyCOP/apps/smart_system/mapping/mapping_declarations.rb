require 'singleton'
 
require_relative '../../../src/application_domain/mapping_declaration'
 
#
# Class declaring the mapping of the app
#
# Est-ce Contexte en parallèle ou on doit relancer chaque feature pour chaque contexte ? 
#
class AppMappingDeclaration < MappingDeclaration
 
    include Singleton
 
    def initialize()
        @mapping = {
            [
                AppContextDeclaration.instance.normal_mode_context()
            ] =>
            [
				AppFeatureDeclaration.instance.display_calculator_feature(),
            ],
 
            [
                AppContextDeclaration.instance.scientific_context()
            ] =>
            [
				AppFeatureDeclaration.instance.display_calculator_feature(),
				AppFeatureDeclaration.instance.display_additional_keys_feature(),
			],
 
            ##############################################################################################
            
			[
                AppContextDeclaration.instance.normal_user_context()
            ] =>
            [
                AppFeatureDeclaration.instance.set_scale_low_feature(),
            ],
 
            [
                AppContextDeclaration.instance.old_context()
            ] =>
            [
				AppFeatureDeclaration.instance.set_scale_high_feature(),
			],
 
            #############################################################################################
                
            [
                 AppContextDeclaration.instance.exam_context()
            ] =>
            [
                AppFeatureDeclaration.instance.display_arrows_feature(),
            ]
        }
    end
 
end