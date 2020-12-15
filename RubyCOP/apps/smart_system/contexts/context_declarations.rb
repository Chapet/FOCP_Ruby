require 'singleton'

require_relative '../../../src/application_domain/abstract_context'
require_relative '../../../src/application_domain/context'
require_relative '../../../src/application_domain/context_declaration'

#
# Class declaring the contexts of the app
#
class AppContextDeclaration < ContextDeclaration

	include Singleton

	def initialize()
		super()
		
		_define_mode_context()
		_define_user_context()
		_define_usage_context()

		@root_context.add_relation(:Mandatory, [@mode_context])
		@root_context.add_relation(:Mandatory, [@user_context])
		@root_context.add_relation(:Optional, [@exam_context])
	end

	private

	def _define_mode_context()
		@mode_context = AbstractContext.new('Mode')
		@normal_mode_context = Context.new('Normal_Mode')
		@scientific_context = Context.new('Scientific')
		#@mode_context.strategy_ico_mandatory_parent = DefaultEntityStrategyInCaseOfMandatoryParent.new(@normal_mode_context) # ICI LE CONTEXT 
		@mode_context.add_relation(:Alternative, [@normal_mode_context, @scientific_context])
	end

	def _define_user_context()
		@user_context = AbstractContext.new('User')
		@normal_user_context = Context.new('Normal_User')
		@old_context = Context.new('Old')
		#@user_context.strategy_ico_mandatory_parent = DefaultEntityStrategyInCaseOfMandatoryParent.new(@normal_user_context) # ICI LE CONTEXT 
		@user_context.add_relation(:Alternative, [@normal_user_context, @old_context])
	end

	def _define_usage_context()
		@exam_context = Context.new('Exam')
	end

end