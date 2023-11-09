import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationOptions } from 'class-validator';

@ValidatorConstraint({ name: 'isStrongPassword', async: false })
export class IsStrongPassword implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    // Implement your password strength validation logic here
    // You can use regular expressions or any other method you prefer
    return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password is not strong enough';
  }
}