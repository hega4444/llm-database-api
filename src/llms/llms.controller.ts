import { Controller, Get, Param, Query, BadRequestException } from '@nestjs/common';
import { LlmsService, LLMRecord } from './llms.service';
import { ParsePositiveIntPipe } from '../common/pipes/parse-positive-int.pipe';
import { ParseYearPipe } from '../common/pipes/parse-year.pipe';

@Controller('llms')
export class LlmsController {
  constructor(private readonly llmsService: LlmsService) {}

  @Get()
  findAll(): LLMRecord[] {
    return this.llmsService.findAll();
  }

  @Get('search/developer')
  findByDeveloper(@Query('name') name: string): LLMRecord[] {
    if (!name || name.trim() === '') {
      throw new BadRequestException('Developer name parameter is required');
    }
    return this.llmsService.findByDeveloper(name);
  }

  @Get('search/open-source')
  findByOpenSource(@Query('value') value: string): LLMRecord[] {
    if (!value || (value !== 'true' && value !== 'false')) {
      throw new BadRequestException('Value parameter is required and must be "true" or "false"');
    }
    const isOpenSource = value === 'true';
    return this.llmsService.findByOpenSource(isOpenSource);
  }

  @Get('search/capability')
  findByCapability(@Query('name') name: string): LLMRecord[] {
    if (!name || name.trim() === '') {
      throw new BadRequestException('Capability name parameter is required');
    }
    return this.llmsService.findByCapability(name);
  }

  @Get('search/year')
  findByReleaseYear(@Query('year', ParseYearPipe) year: string): LLMRecord[] {
    return this.llmsService.findByReleaseYear(year);
  }

  @Get(':id')
  findOne(@Param('id', ParsePositiveIntPipe) id: number): LLMRecord | undefined {
    return this.llmsService.findOne(id);
  }
}
