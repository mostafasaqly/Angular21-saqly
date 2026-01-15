import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from './safe-url.pipe';
import { describe, it, expect, vi } from 'vitest';

describe('SafeUrlPipe (Vitest)', () => {
  it('should build youtube-nocookie embed url and call sanitizer', () => {
    const fakeSafe = {} as SafeResourceUrl;

    const sanitizerMock = {
      bypassSecurityTrustResourceUrl: vi.fn().mockReturnValue(fakeSafe),
    } as unknown as DomSanitizer;

    const pipe = new SafeUrlPipe(sanitizerMock);

    const key = 'abc123';
    const result = pipe.transform(key);

    expect(sanitizerMock.bypassSecurityTrustResourceUrl).toHaveBeenCalledTimes(1);
    expect(sanitizerMock.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      'https://www.youtube-nocookie.com/embed/' + key
    );

    expect(result).toBe(fakeSafe);
  });

  it('should still work with empty key', () => {
    const fakeSafe = {} as SafeResourceUrl;

    const sanitizerMock = {
      bypassSecurityTrustResourceUrl: vi.fn().mockReturnValue(fakeSafe),
    } as unknown as DomSanitizer;

    const pipe = new SafeUrlPipe(sanitizerMock);

    const result = pipe.transform('');

    expect(sanitizerMock.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
      'https://www.youtube-nocookie.com/embed/'
    );
    expect(result).toBe(fakeSafe);
  });
});
