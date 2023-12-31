const multer = require("multer");
require("dotenv").config();

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { RequestError } = require("../helpers");

const {CLOUD_NAME, 
CLOUD_API_KEY, 
CLOUD_API_SECRET} = process.env;

cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: CLOUD_API_KEY, 
  api_secret: CLOUD_API_SECRET, 
});

const logoStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    if (!file) {
      throw RequestError(404, 'Image Not found');
    }

    let folder;
    if (file.fieldname === 'logoIMG') {
      folder = 'logoIMG';
    }  else {
      folder = 'docs';
    }
    return {
      folder: folder,
      allowed_formats: ['jpg', 'png'],
      public_id: file.originalname,
      transformation: [{ width: 500, height: 500 }],
    };
  },
});


const avaStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    if (!file) {
      throw RequestError(404, 'Image Not found');
    }

    const { id } = req.user;
    let folder;
    if (file.fieldname === 'avatar') {
      folder = 'avatars';
    } else {
      folder = 'docs';
    }
    return {
      folder: folder,
      allowed_formats: ['jpg', 'png', 'webp'],
      public_id: `${id}_${file.originalname}`,
      transformation: [{ width: 100, height: 100, crop: 'fill' }],
    };
  },
});

const typeOfDonatsStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    if (!file) {
      throw RequestError(404, 'Image Not found');
    }

    let folder;
    if (file.fieldname === 'typeIMG') {
      folder = 'typeOfDonats';
    }  else {
      folder = 'docs';
    }
    return {
      folder: folder,
      allowed_formats: ['jpg', 'png'],
      public_id: file.originalname,
      transformation: [{ width: 150, height: 150 }],
    };
  },
});

const unitStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    if (!file) {
      throw RequestError(404, 'Image Not found');
    }

    let folder;
    if (file.fieldname === 'unitIMG') {
      folder = 'units';
    }  else {
      folder = 'docs';
    }
    return {
      folder: folder,
      allowed_formats: ['jpg', 'png'],
      public_id: file.originalname,
      transformation: [{ width: 250, height: 350 }],
    };
  },
});

const reportStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    if (!file) {
      throw RequestError(404, 'Image Not found');
    }

    let folder;
    if (file.fieldname === 'reportIMG') {
      folder = 'report';
    }  else {
      folder = 'docs';
    }
    return {
      folder: folder,
      allowed_formats: ['jpg', 'png'],
      public_id: file.originalname,
      transformation: [{ width: 350, height: 250, crop: "fit" }],
    };
  },
});

const fundStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    if (!file) {
      throw RequestError(404, 'Image Not found');
    }

    let folder;
    if (file.fieldname === 'fundIMG') {
      folder = 'funds';
    }  else {
      folder = 'docs';
    }
    return {
      folder: folder,
      allowed_formats: ['jpg', 'png'],
      public_id: file.originalname,
      transformation: [{ width: 200, height: 200 }],
    };
  },
});


const uploadAva = multer({ storage: avaStorage });
const uploadLogo = multer({ storage: logoStorage });
const uploadTypeOfDonats = multer({ storage: typeOfDonatsStorage });
const uploadUnits = multer({ storage: unitStorage });
const uploadReport = multer({ storage: reportStorage});
const uploadFund = multer({ storage: fundStorage});

module.exports = { uploadAva, uploadLogo, uploadTypeOfDonats, uploadUnits, uploadReport, uploadFund };
