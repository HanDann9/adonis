import { validator, ParsedTypedSchema } from '@ioc:Adonis/Core/Validator'

export default abstract class Validator {
  protected abstract schemas(type: string): ParsedTypedSchema<any>
  protected errorMessages = {
    required: '{{ field }} is required',
    unique: '{{ field }} already exists',
  }

  public async validate(data: { [key: string]: any }, type: string): Promise<any> {
    return validator.validate({
      schema: this.schemas(type),
      data,
      messages: this.errorMessages,
    })
  }
}
