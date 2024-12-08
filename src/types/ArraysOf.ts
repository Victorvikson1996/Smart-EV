import { randNumber } from '@ngneat/falso';

export function arrayOf<T>(
  generator: () => T,
  options: { minLength: number; maxLength: number }
) {
  return new Array(
    randNumber({ min: options.minLength, max: options.maxLength })
  )
    .fill(null)
    .map(generator);
}
