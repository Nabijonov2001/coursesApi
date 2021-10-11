const fs = require("fs/promises");
const path = require("path");
const slugify = require("slugify");
module.exports = class Courses {
  static getCourses = async (req, res) => {
    let data = await fs.readFile(path.join(__dirname, '..', 'db', 'database.json'))
      data = JSON.parse(data)
      res.status(200).json(data.courses)
  };

  static postCourse = async(req, res)=>{
      const {courseName, courseAuthor} = req.body
      let slug = slugify(courseName, {
          remove:/[*+~.()'"!:@]/g,
          lower:true
      })
      let data = await fs.readFile(path.join(__dirname, '..', 'db', 'database.json'))
      data = JSON.parse(data)
      let checkCourse = data.courses.find(course=>course.slug === slug)
      if(checkCourse){
          res.status(400).json({
              ok:false,
              message:"Bunday kurs mavjud!"
          })
      }else{
        const newCourse = {
            courseName,
            courseAuthor,
            id:data.courses.length+1,
            slug
        }
        data.courses.push(newCourse)
        await fs.writeFile(path.join(__dirname, '..', 'db', 'database.json'), JSON.stringify(data))
        res.status(201).json({
            ok:true,
            message:'Kurs muvaffaqqiyatli qo`shildi',
            newCourse
        })
      }
  }

  static getCourse = async(req, res)=>{
    let data = await fs.readFile(path.join(__dirname, '..', 'db', 'database.json'))
    data = JSON.parse(data)
    let checkCourse = data.courses.find(course=>course.slug === req.params.slug)
    if(checkCourse){
        res.status(200).json({
            ok:true,
            message:'Bunday kurs mavjud',
            checkCourse
        })
    }else{
        res.status(404).json({
            ok:false,
            message:'Bunday kurs mavjud emas'
        })
    }
  }

  static updateCourse = async(req, res)=>{
    let data = await fs.readFile(path.join(__dirname, '..', 'db', 'database.json'))
    data = JSON.parse(data)
    let checkCourse = data.courses.find(course=>course.slug === req.params.slug)
    if(!checkCourse){
       res.status(400).json({
           ok:false,
           message:'Bunday kitob mavjud emas'
       }) 
    }else{
        if(req.body.courseName){
            let slug = slugify(req.body.courseName, {
               remove:/[*+~.()'"!:@]/g,
               lower:true
           })
           data.courses[checkCourse.id-1] =  {...checkCourse, ...req.body, slug }
           await fs.writeFile(path.join(__dirname, '..', 'db', 'database.json'), JSON.stringify(data))
           res.json({
               ok:true,
               message:'Tahrirlandi',
               course:data.courses[checkCourse.id-1]
           })
         }
        data.courses[checkCourse.id-1] =  {...checkCourse, ...req.body, }
        res.json(data.courses[checkCourse.id-1])
        
    }
  }

  static deleteCourse = async(req, res)=>{
    let data = await fs.readFile(path.join(__dirname, '..', 'db', 'database.json'))
    data = JSON.parse(data)
    let checkCourse = data.courses.find(course=>course.slug === req.params.slug)
    if(!checkCourse){
       res.status(400).json({
           ok:false,
           message:'Bunday kitob mavjud emas'
       }) 
    }else{
       delete data.courses[checkCourse.id-1]
       await fs.writeFile(path.join(__dirname, '..', 'db', 'database.json'), JSON.stringify(data))
       res.status(200).json({
           ok:true,
           message:'O`chirildi',
           deletedCourse:checkCourse
       })
    }
  }

};
