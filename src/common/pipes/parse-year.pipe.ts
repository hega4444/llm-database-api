import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseYearPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!value || value.trim() === '') {
      throw new BadRequestException('Year parameter is required');
    }
    
    if (!/^\d{4}$/.test(value)) {
      throw new BadRequestException('Year must be a 4-digit number');
    }
    
    const year = parseInt(value, 10);
    const currentYear = new Date().getFullYear();
    if (year < 2010 || year > currentYear) {
      throw new BadRequestException(`Year must be between 2010 and ${currentYear}`);
    }
    
    return value;
  }
}