const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.get("/edit/:id", ensureAuth, postsController.getEdit);

//const multiUpload = upload.fields([{ name: 'file'}, { name: 'file2'}])
// router.post("/createPost", multiUpload, postsController.createPost);
router.post("/createPost", upload.single("file"), postsController.createPost);


router.put("/updatePost/:id", postsController.updatePost);

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
