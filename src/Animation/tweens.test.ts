import { Tweens } from "./tweens";

describe('Yest!', () => {
  it('Test', () => {
    expect(Tweens.easeInSine(0)).toBe(0);
    expect(Tweens.easeInSine(0.5)).toBe(0);
    expect(Tweens.easeInSine(1)).toBe(1);
  });
})