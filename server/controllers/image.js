const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "techbuy",
  api_key: "514874762815767",
  api_secret: "6KfLutbdna9BEAgciobfRxipn-U",
});

const upload = async (req, res) => {
  //

  try {
    let image = req.body.bin;
    const result = await cloudinary.uploader.upload(image, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });
    res.status(201).json({
      success: true,
      message: "Image Uploaded Successfully",
      data: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Image Could not be Uploaded",
      error_code: 500,
      data: {},
    });
  }
};

const remove = (req, res) => {
  cloudinary.uploader.destroy(req.body.id, (err, result) => {
    if (err)
      return res.json({
        success: false,
        message: err,
      });

    res.send("ok");
  });
};
const object = { upload, remove };
module.exports = object;
