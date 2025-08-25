import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParsePositiveIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const numericValue = parseInt(value, 10);
    
    if (isNaN(numericValue)) {
      throw new BadRequestException('ID must be a number');
    }
    
    if (numericValue <= 0) {
      throw new BadRequestException('ID must be a positive number');
    }
    
    return numericValue;
  }
}