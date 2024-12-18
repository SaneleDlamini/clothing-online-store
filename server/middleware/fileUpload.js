const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../public/images');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  export default upload = multer({storage : storage})