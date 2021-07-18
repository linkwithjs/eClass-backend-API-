const express = require("express");
const router = express.Router();

const courseModel = require("./courseModel");
const upload = require("../../middleware/videoUploader");

// Router & controller to get all courses
router.get("/", async (req, res) => {
  const course = await courseModel.find();
  if (!course) {
    res.status(500).json({ message: "No course found !" });
  }
  res.status(200).json(course);
});

// Router & controller to add new course
router.post("/", upload.single("videoUrl"), (req, res, next) => {
  if (req.fileError) {
    return next({
      msg: req.fileError,
      status: 400,
    });
  }
  if (req.file) {
    req.body.videoUrl = req.file.filename;
  }

  const course = new courseModel({
    title: req.body.title,
    shortDesc: req.body.shortDesc,
    desc: req.body.desc,
    outcome: req.body.outcome,
    thumbnail: req.body.thumbnail,
    requirement: req.body.requirement,
    courseIncludes: req.body.courseIncludes,
    category: req.body.category,
    price: req.body.price,
    discount: req.body.discount,
    user: req.body.user,
    videoUrl: req.body.videoUrl,
    isFeatured: req.body.isFeatured,
    //   hasDiscout : req.body.hasDiscout,
    //    result: req.body
  });
  course
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
      });
    });
});

//  Router & controller to update a course data by Id
router.put("/:id", async (req, res) => {
  const course = await courseModel.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      shortDesc: req.body.shortDesc,
      desc: req.body.desc,
      outcome: req.body.outcome,
      requirement: req.body.requirement,
      courseIncludes: req.body.courseIncludes,
      category: req.body.category,
      price: req.body.price,
      discount: req.body.discount,
      user: req.body.user,
      thumbnail: req.body.thumbnail,
      videoUrl: req.body.videoUrl,
      isFeatured: req.body.isFeatured,
      status: req.body.status,
    },
    { new: true }
  );
  if (!course) {
    res.status(500).json({
      message: `No course with Id : ${req.body.id} found.`,
    });
  } else {
    res.status(200).send(course);
  }
});

//  Router & controller to delete a course data by Id
router.delete("/:id", (req, res) => {
  courseModel
    .findByIdAndRemove(req.params.id)
    .then((course) => {
      if (course) {
        return res
          .status(200)
          .json({ message: "Course is deleted successfully" });
      } else {
        return res.status(404).json({ message: "Course not found" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ success: false, error: err });
    });
});

//  Router & controller to get a course data by Id
router.get("/:id", async (req, res) => {
  const course = await courseModel.findById(req.params.id);
  if (!course) {
    res.status(500).json({
      success: false,
      message: "No course found with that id",
    });
  } else res.status(200).send(course);
});

// Router & controller to count total course
router.get("/get/count", async (req, res) => {
  const courseCount = await courseModel.countDocuments((count) => count);
  if (!courseCount) {
    res.status(500).json({
      success: false,
    });
  } else res.send({ courseCount: courseCount });
});

// Router & controller to get featured courses
router.get("/get/featured", async (req, res) => {
  const featured = await courseModel.find({ isFeatured: "1" });
  // const course = await courseModel.find();
  if (featured) {
    res.send(featured);
  } else res.send("No featured course found!");
});

// // Router & controller to get popular courses
// router.get("/get/featured", async (req, res) => {
//   const featured = await courseModel.findOne({ isFeatured: "1" });
//   // const course = await courseModel.find();
//   if (featured) {
//     res.send(featured);
//   } else res.send("No featured course found!");
// });

module.exports = router;
