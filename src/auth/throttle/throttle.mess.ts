import { ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';

export class MyThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(): Promise<void> {
    throw new ThrottlerException(
      'Tốc độ quá nhanh! Hãy để trang tải xong trước nhé.',
    );
  }
}
