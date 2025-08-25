import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { LlmsController } from './llms.controller';
import { LlmsService } from './llms.service';

describe('LlmsController', () => {
  let controller: LlmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LlmsController],
      providers: [LlmsService],
    }).compile();

    controller = module.get<LlmsController>(LlmsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all LLMs', () => {
      const result = controller.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('modelName');
      expect(result[0]).toHaveProperty('developer');
    });
  });

  describe('findOne', () => {
    it('should return a single LLM by ID', () => {
      const result = controller.findOne(1);
      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('modelName');
      expect(result).toHaveProperty('developer');
    });

    it('should return undefined for non-existent ID', () => {
      const result = controller.findOne(9999);
      expect(result).toBeUndefined();
    });

    it('should return undefined for ID 0', () => {
      const result = controller.findOne(0);
      expect(result).toBeUndefined();
    });
  });

  describe('findByDeveloper', () => {
    it('should return LLMs by developer', () => {
      const result = controller.findByDeveloper('OpenAI');
      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0].developer).toContain('OpenAI');
      }
    });

    it('should throw BadRequestException for empty developer name', () => {
      expect(() => controller.findByDeveloper('')).toThrow(BadRequestException);
    });

    it('should throw BadRequestException for whitespace-only developer name', () => {
      expect(() => controller.findByDeveloper('   ')).toThrow(BadRequestException);
    });
  });

  describe('findByOpenSource', () => {
    it('should return open source LLMs', () => {
      const result = controller.findByOpenSource('true');
      expect(Array.isArray(result)).toBe(true);
      result.forEach(llm => {
        expect(llm.openSource).toBe(true);
      });
    });

    it('should return closed source LLMs', () => {
      const result = controller.findByOpenSource('false');
      expect(Array.isArray(result)).toBe(true);
      result.forEach(llm => {
        expect(llm.openSource).toBe(false);
      });
    });

    it('should throw BadRequestException for invalid value', () => {
      expect(() => controller.findByOpenSource('maybe')).toThrow(BadRequestException);
    });

    it('should throw BadRequestException for empty value', () => {
      expect(() => controller.findByOpenSource('')).toThrow(BadRequestException);
    });
  });

  describe('findByCapability', () => {
    it('should return LLMs by capability', () => {
      const result = controller.findByCapability('reasoning');
      expect(Array.isArray(result)).toBe(true);
      result.forEach(llm => {
        expect(llm.capabilities.some(cap => 
          cap.toLowerCase().includes('reasoning')
        )).toBe(true);
      });
    });

    it('should throw BadRequestException for empty capability name', () => {
      expect(() => controller.findByCapability('')).toThrow(BadRequestException);
    });

    it('should throw BadRequestException for whitespace-only capability name', () => {
      expect(() => controller.findByCapability('   ')).toThrow(BadRequestException);
    });
  });

  describe('findByReleaseYear', () => {
    it('should return LLMs by release year', () => {
      const result = controller.findByReleaseYear('2024');
      expect(Array.isArray(result)).toBe(true);
      result.forEach(llm => {
        expect(llm.releaseDate).toContain('2024');
      });
    });

    it('should return empty array for year with no matches', () => {
      const result = controller.findByReleaseYear('1999');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should return results for valid year', () => {
      const result = controller.findByReleaseYear('2018');
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
