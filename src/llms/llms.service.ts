// src/llms/llms.service.ts
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface LLMRecord {
  id: number;
  modelName: string;
  developer: string;
  releaseDate: string | null;
  parameterSize: number | null;
  openSource: boolean;
  capabilities: string[];
}

@Injectable()
export class LlmsService {
  private llms: LLMRecord[] = [];

  constructor() {
    this.loadLLMData();
  }

  private loadLLMData() {
    try {
      const csvPath = join(process.cwd(), 'data', 'llm-dataset.csv');
      const csvContent = readFileSync(csvPath, 'utf-8');
      const lines = csvContent.split('\n');
      const headers = lines[0].split(',');
      
      this.llms = lines.slice(1)
        .filter(line => line.trim())
        .map((line, index) => {
          const values = this.parseCSVLine(line);
          return {
            id: index + 1,
            modelName: values[0] || '',
            developer: values[1] || '',
            releaseDate: values[2] === 'N/A' ? null : values[2],
            parameterSize: values[3] === '0' || values[3] === 'N/A' ? null : Number(values[3]),
            openSource: values[4] === 'True',
            capabilities: values.slice(5).filter(cap => cap.trim())
          };
        });
    } catch (error) {
      console.error('Error loading LLM data:', error);
      this.llms = [];
    }
  }

  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  }

  findAll() {
    return this.llms;
  }

  findOne(id: number) {
    return this.llms.find(llm => llm.id === id);
  }

  findByDeveloper(developer: string) {
    return this.llms.filter(llm => 
      llm.developer.toLowerCase().includes(developer.toLowerCase())
    );
  }

  findByOpenSource(openSource: boolean) {
    return this.llms.filter(llm => llm.openSource === openSource);
  }

  findByCapability(capability: string) {
    const searchWords = capability.toLowerCase().split(' ').filter(word => word.trim());
    
    return this.llms.filter(llm => 
      llm.capabilities.some(cap => 
        searchWords.every(word => 
          cap.toLowerCase().includes(word)
        )
      )
    );
  }

  findByReleaseYear(year: string) {
    return this.llms.filter(llm => 
      llm.releaseDate?.includes(year)
    );
  }
}