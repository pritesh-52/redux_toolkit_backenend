const pool = require("../model/studentmodel");

exports.getstudent = async (req, res) => {
  try {
    const getdata = await pool.query("SELECT *from student");
    res.status(200).send(getdata.rows);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.addstudent = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const existsinngemail = await pool.query(
      "SELECT *FROM Student where email=$1",
      [email]
    );

    if (existsinngemail.rows.length > 0) {
      res.status(400).json({ error: "Email id Already Exists" });
    } else {
      await pool.query(
        "INSERT INTO student (name,email,phone) VALUES ($1,$2,$3) RETURNING *",
        [name, email, phone]
      );
      res.status(200).json({ message: "Data has added" });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.updatestudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const updatedata = await pool.query(
      "UPDATE student set name=$1 , email=$2 , phone=$3 where id=$4",
      [name, email, phone, id]
    );
    if(updatedata.rowCount==1)
    {
      res.status(200).json({ message: "Data Has Updated" });
    }
    else{
      res.status(400).json({error:"Data not found"});
    }
   
    /*console.log(id);
    res.status(200).send("Update");*/
  } catch (e) {
    res.status(400).json({ e });
  }
};

exports.deletestudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedata = await pool.query("DELETE FROM student where id=$1", [
      id,
    ]);
    if(deletedata.rowCount==1)
    {
      res.status(200).json({message:"Delete sucesfully"});
    }
    else
    {
      res.status(200).json({error:"Data Not Foudn"});
    }
   
  } catch (e) {
    res.status(400).json(e);
  }
};
