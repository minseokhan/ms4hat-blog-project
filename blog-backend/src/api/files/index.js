import Router from 'koa-router';
const files = new Router();
import multer from 'koa-multer';
import path from 'path';
import File from '../../models/file';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const uploadImage = multer({ storage: storage });

files.post('/file/upload', uploadImage.single('image'), async (ctx) => {
  console.log(ctx.req.file);
  const { originalname, filename } = ctx.req.file;
  const files = new File({
    originalname,
    filename,
  });
  try {
    await files.save();
    ctx.body = filename;
  } catch (e) {
    ctx.throw(500, e);
  }
});

export default files;
