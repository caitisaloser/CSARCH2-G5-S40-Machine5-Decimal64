import { describe, it, expect } from 'vitest';
import { simulateDivision } from '../src/arithmetic/divisionGRS.js';

describe('Decimal64 Division Module (GRS Method)', () => {

    describe('1. Normal Cases & Sign Combinations', () => {
        it('should handle exact quotients and Positive / Positive', () => {
            const result = simulateDivision('10', 'decimal', '2', 'decimal', 'nearest-even');
            expect(result.success).toBe(true);
            expect(result.isSpecial).toBe(false);
            expect(result.finalDecimal).toContain('5');
            expect(result.finalDecimal.startsWith('-')).toBe(false);
        });

        it('should handle Positive / Negative', () => {
            const result = simulateDivision('15', 'decimal', '-3', 'decimal', 'nearest-even');
            expect(result.success).toBe(true);
            expect(result.finalDecimal).toContain('-5');
        });

        it('should handle Negative / Positive', () => {
            const result = simulateDivision('-20', 'decimal', '4', 'decimal', 'nearest-even');
            expect(result.success).toBe(true);
            expect(result.finalDecimal).toContain('-5');
        });

        it('should handle Negative / Negative', () => {
            const result = simulateDivision('-30', 'decimal', '-6', 'decimal', 'nearest-even');
            expect(result.success).toBe(true);
            expect(result.finalDecimal.startsWith('-')).toBe(false);
        });

        it('should handle repeating quotients', () => {
            const result = simulateDivision('1', 'decimal', '3', 'decimal', 'nearest-even');
            expect(result.success).toBe(true);
            expect(result.finalDecimal).toContain('3333333333333333');
        });
    });

    describe('2. Input Format Mixtures', () => {
        
        it('should handle Decimal and Hexadecimal mixed input', () => {
            const result = simulateDivision('0', 'decimal', '0x31C0000000000000', 'hex', 'nearest-even');
            expect(result.success).toBe(true);
        });

        it('should handle both operands in Hexadecimal', () => {
            const result = simulateDivision('0x31C0000000000000', 'hex', '0x31C0000000000000', 'hex', 'nearest-even');
            expect(result.success).toBe(true);
        });

        it('should handle Invalid input', () => {
            const result = simulateDivision('abc', 'decimal', '123', 'decimal', 'nearest-even');
            expect(result.success).toBe(false);
            expect(result.error).toBeDefined();
        });
    });

    describe('3. GRS Rounding & Normalization', () => {
        it('should trigger quotient requiring GRS rounding', () => {
            const result = simulateDivision('2', 'decimal', '3', 'decimal', 'round-up');
            expect(result.success).toBe(true);
            expect(result.grs).toBeDefined();
            expect(result.roundingExplanation).toContain('round-up');
        });

        it('should require renormalization after rounding', () => {
            const result = simulateDivision('9.9999999999999995', 'decimal', '1', 'decimal', 'round-up');
            expect(result.success).toBe(true);
            expect(result.steps.some(step => step.toLowerCase().includes('carry'))).toBe(true);
        });
    });

    describe('4. Special Cases', () => {
        it('should handle Nonzero divided by zero', () => {
            const result = simulateDivision('5', 'decimal', '0', 'decimal', 'nearest-even');
            expect(result.isSpecial).toBe(true);
            expect(result.finalDecimal).toBe('Infinity');
        });

        it('should handle Zero divided by nonzero', () => {
            const result = simulateDivision('0', 'decimal', '5', 'decimal', 'nearest-even');
            expect(result.isSpecial).toBe(true);
            expect(result.finalDecimal).toContain('0');
        });

        it('should handle Zero divided by zero', () => {
            const result = simulateDivision('0', 'decimal', '0', 'decimal', 'nearest-even');
            expect(result.isSpecial).toBe(true);
            expect(result.finalDecimal).toBe('NaN');
        });

        it('should handle Infinity divided by finite', () => {
            const result = simulateDivision('Infinity', 'decimal', '5', 'decimal', 'nearest-even');
            expect(result.isSpecial).toBe(true);
            expect(result.finalDecimal).toBe('Infinity');
        });

        it('should handle Finite divided by infinity', () => {
            const result = simulateDivision('5', 'decimal', 'Infinity', 'decimal', 'nearest-even');
            expect(result.isSpecial).toBe(true);
            expect(result.finalDecimal).toContain('0');
        });

        it('should handle Infinity divided by infinity', () => {
            const result = simulateDivision('Infinity', 'decimal', 'Infinity', 'decimal', 'nearest-even');
            expect(result.isSpecial).toBe(true);
            expect(result.finalDecimal).toBe('NaN');
        });

        it('should handle NaN input', () => {
            const result = simulateDivision('NaN', 'decimal', '5', 'decimal', 'nearest-even');
            expect(result.isSpecial).toBe(true);
            expect(result.finalDecimal).toBe('NaN');
        });
    });

    describe('5. Extreme Limits (Overflow & Underflow)', () => {
        it('should trigger Overflow', () => {
            const result = simulateDivision('1e200', 'decimal', '1e-200', 'decimal', 'nearest-even');
            expect(result.isSpecial).toBe(true);
            expect(result.finalDecimal).toBe('Infinity');
            expect(result.specialExplanation).toContain('Overflow');
        });

        it('should handle Underflow', () => {
            const result = simulateDivision('1e-200', 'decimal', '1e200', 'decimal', 'nearest-even');
            expect(result.success).toBe(true);
        });
    });
});