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
		
		_define_user_context()
		_define_usage_context()
		_define_mode_context()

		@root_context.add_relation(:Mandatory, [@mode_context, @user_context,@usage_context])
		#@root_context.add_relation(:Optional, [@exam_usage_context])
	end

	private

	def _define_mode_context()
		@mode_context = AbstractContext.new('Mode')
		@normal_mode_context = Context.new('NormalMode')
		@scientific_mode_context = Context.new('ScientificMode')
		@mode_context.strategy_ico_mandatory_parent = DefaultEntityStrategyInCaseOfMandatoryParent.new(@normal_mode_context)
		@mode_context.add_relation(:Alternative, [@normal_mode_context, @scientific_mode_context])
	end

	def _define_user_context()
		@user_context = AbstractContext.new('User')
		@normal_user_context = Context.new('NormalUser')
		@old_user_context = Context.new('OldUser')
		@user_context.strategy_ico_mandatory_parent = DefaultEntityStrategyInCaseOfMandatoryParent.new(@normal_user_context)
		@user_context.add_relation(:Alternative, [@normal_user_context, @old_user_context])
	end

	def _define_usage_context()
		@usage_context = AbstractContext.new('Usage')
		@normal_usage_context = Context.new('NormalUsage')
		@exam_usage_context = Context.new('ExamUsage')
		@usage_context.strategy_ico_mandatory_parent = DefaultEntityStrategyInCaseOfMandatoryParent.new(@normal_usage_context)
		@usage_context.add_relation(:Alternative, [@normal_usage_context, @exam_usage_context])
	end

end