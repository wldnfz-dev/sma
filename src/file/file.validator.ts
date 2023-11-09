import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import * as mimeTypes from 'mime-types';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsPdfFileConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    if (!value) return false;

    const mimeType = mimeTypes.lookup(value.originalname);

    console.log('Detected MIME Type:', mimeType);
    return mimeType === 'application/pdf';
  }

  defaultMessage(args: ValidationArguments) {
    return 'file must be a PDF';
  }
}

export function IsPdfFile(validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPdfFileConstraint,
    });
  };
}
