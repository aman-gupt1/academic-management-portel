
class DashboardService{

constructor(Student,Teacher,Class,Test,Result,Activity ){
    this.Student = Student;
    this.Teacher = Teacher;
    this.Class = Class;
    this.Test = Test;
    this.Result = Result;
    this.Activity = Activity;
  }


async getDashboardStats() {
  const [
    totalStudents,
    totalTeachers,
    totalClasses,
    totalTests,
    totalResults,
    totalActivities,
  ] = await Promise.all([
    this.Student.countDocuments(),
    this.Teacher.countDocuments(),
    this.Class.countDocuments(),
    this.Test.countDocuments(),
    this.Result.countDocuments(),
    this.Activity.countDocuments(),
  ]);

  return {
    totalStudents,
    totalTeachers,
    totalClasses,
    totalTests,
    totalResults,
    totalActivities,
  };
}
}


export default DashboardService;