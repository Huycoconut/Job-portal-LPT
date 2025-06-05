import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

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

  //has add file fillter and limit data upload file
  createMulterOptions(): MulterOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const folder = req.headers['folder_type']?.toString() || 'default';
          const uploadPath = path.join(process.cwd(), 'public/images', folder);

          // Tạo thư mục nếu chưa tồn tại
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }

          cb(null, uploadPath);
        },

        filename: (req, file, cb) => {
          const extName = path.extname(file.originalname);
          const baseName = path.basename(file.originalname, extName);
          const finalName = `${baseName}-${Date.now()}${extName}`;
          cb(null, finalName);
        },
      }),

      fileFilter: (req, file, cb) => {
        const allowedFileTypes = [
          'jpg',
          'jpeg',
          'png',
          'gif',
          'pdf',
          'doc',
          'docx',
        ];
        const fileExt = file.originalname.split('.').pop()?.toLowerCase();

        const isValidFileType = fileExt && allowedFileTypes.includes(fileExt);

        if (!isValidFileType) {
          return cb(
            new HttpException(
              'Invalid file type',
              HttpStatus.UNPROCESSABLE_ENTITY,
            ),
            false,
          );
        }

        cb(null, true);
      },
      limits: {
        fieldSize: 1024 * 1024 * 1, //true
      },
    };
  }
}
