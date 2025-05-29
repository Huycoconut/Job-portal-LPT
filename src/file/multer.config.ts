import { Injectable } from '@nestjs/common';
import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  getRootPath(): string {
    return process.cwd();
  }

  ensureExists(targetDirectory: string) {
    const fullPath = path.resolve(this.getRootPath(), targetDirectory);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Created directory: ${fullPath}`);
    }
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // Lấy folder_type từ header hoặc dùng "default"
          const folder = req?.headers?.['folder_type']?.toString() ?? 'default';
          const uploadPath = `public/images/${folder}`;
          this.ensureExists(uploadPath);
          cb(null, path.join(this.getRootPath(), uploadPath));
        },
        filename: (req, file, cb) => {
          const extName = path.extname(file.originalname);
          const baseName = path.basename(file.originalname, extName);
          const timestamp = Date.now();
          const finalName = `${baseName}-${timestamp}${extName}`;
          cb(null, finalName);
        },
      }),
    };
  }
}
