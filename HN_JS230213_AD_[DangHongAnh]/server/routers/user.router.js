const express = require('express');
const router =  express.Router();
const db = require('../utils/db');

router.get('/', async (req, res) => {
    try {
        const dataUsers = await db.execute("SELECT * FROM user");
        res.json({
            users : dataUsers[0]
        })
    } catch (error) {
        res.json({
            errors : error
        })
    }
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;
  try {
    const dataUsers = await db.execute("SELECT * FROM user where id =?", [id]);
    res.json({
      users: dataUsers[0],
    });
  } catch (error) {
    res.json({
      errors: error,
    });
  }
});

router.post("/", async (req, res) => {
    const {name , email, age} = req.body;
  try {
    await db.execute("INSERT INTO user (name, email, age) VALUES (?, ?, ?)", [
        name, email, age
    ]);
    res.status(200).json({
        message: 'Success'
    })
  } catch (error) {
    res.json({
        error: error
    })
  }
});
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email,age, } = req.body;
  try {
    const dataUsers = await db.execute(
      "UPDATE user SET name = ?, email = ?, age = ? WHERE id = ?",
      [name, email, age, id]
    );
        if (dataUsers[0].affectedRows > 0) {
            res.status(200).json({
                message: `Success patch id: ${id}`,
            })
        }else{
            res.status(404).json({
                message: `Error patch id: ${id}`,

            });
        }
  } catch (error) {
    res.json({
        error: error,
    })
  }

})

routes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dataUsers = await db.execute(
      "DELETE FROM user WHERE (id= ?);",
      [id]
    );
    if (dataUsers[0].affectedRows > 0) {
      res.status(200).json({
        message: `xóa thành công id: ${id}`,
      });
    } else {
      res.status(404).json({
        message: `xóa không thành công, không tìm thấy id: ${id}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;