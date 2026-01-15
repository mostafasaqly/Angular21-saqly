import { MathService } from './math.service';

describe('MathService (Vitest) - Simple', () => {
  let service: MathService;

  beforeEach(() => {
    service = new MathService();
  });

  it('1) should be created', () => {
    expect(service).toBeTruthy();
  });

  it('2) should sum two positive numbers', () => {
    expect(service.sum(2, 3)).toBe(5);
    expect(service.sum(10, 20)).toBe(30);
  });

  it('3) should sum two negative numbers', () => {
    expect(service.sum(-2, -3)).toBe(-5);
    expect(service.sum(-10, -20)).toBe(-30);
  });

  it('4) should sum positive and negative numbers', () => {
    expect(service.sum(5, -3)).toBe(2);
    expect(service.sum(-5, 3)).toBe(-2);
    expect(service.sum(10, -10)).toBe(0);
  });

  it('5) should sum with zero', () => {
    expect(service.sum(5, 0)).toBe(5);
    expect(service.sum(0, 5)).toBe(5);
    expect(service.sum(0, 0)).toBe(0);
  });

  it('6) should sum decimal numbers', () => {
    expect(service.sum(1.5, 2.5)).toBe(4);
    expect(service.sum(0.1, 0.2)).toBeCloseTo(0.3);
  });

  it('7) should sum large numbers', () => {
    expect(service.sum(1000000, 2000000)).toBe(3000000);
    expect(service.sum(999999999, 1)).toBe(1000000000);
  });

  it('8) should handle edge cases', () => {
    expect(service.sum(Number.MAX_SAFE_INTEGER, 0)).toBe(Number.MAX_SAFE_INTEGER);
    expect(service.sum(Number.MIN_SAFE_INTEGER, 0)).toBe(Number.MIN_SAFE_INTEGER);
  });
});
