import { CustomMessages, schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import businessConfig from 'Config/businessConfig'

export default class AuthenticateUserWithSingleUseCodeRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string([
      rules.trim(),
      rules.escape(),
      rules.email(),
      rules.exists({
        table: 'users',
        column: 'email',
      }),
    ]),

    otpToken: schema.string([
      rules.minLength(businessConfig.otpToken.tokenLength),
      rules.maxLength(businessConfig.otpToken.tokenLength),
      rules.trim(),
      rules.escape(),
      rules.exists({
        table: 'otp_tokens',
        column: 'token',
      }),
    ]),
  })

  public messages: CustomMessages = {
    'email.required': 'Email is required',
    'email.string': 'Email must be a string',
    'email.email': 'Email must be a valid email',
    'email.exists': 'No account associated with this email',
    'otpToken.required': 'OTP Token is compulsory',
    'otpToken.string': 'OTP Token provided must be a string',
    'otpToken.minLength': `OTP Token provided must be ${businessConfig.otpToken.tokenLength} characters long`,
    'otpToken.maxLength': `OTP Token provided must be ${businessConfig.otpToken.tokenLength} characters long`,
    'otpToken.exists': 'OTP Token must be valid',
  }
}
