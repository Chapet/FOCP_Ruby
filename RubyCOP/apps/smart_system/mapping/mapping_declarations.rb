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
				AppFeatureDeclaration.instance.display_scientific_keys_feature(),
			],
 
			##############################################################################################
			[
                AppContextDeclaration.instance.normal_user_context()
            ] =>
            [
                #AppFeatureDeclaration.instance.display_calculator_feature(),
            ],
 
            [
                AppContextDeclaration.instance.old_context()
            ] =>
            [
				AppFeatureDeclaration.instance.display_big_calculator_feature(),
			],
 
            ##############################################################################################
 
            [
                AppContextDeclaration.instance.normal_usage_context()
            ] =>
            [
                AppFeatureDeclaration.instance.memory_feature(),
            ],
  
            [
                 AppContextDeclaration.instance.exam_context()
            ] =>
            [
                #AppFeatureDeclaration.instance.memory_feature(),
            ]
        }
    end
 
end