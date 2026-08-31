class AttendanceService {


constructor(attendanceModel, studentModel,classModel, teacherModel){
  this.Attendance=attendanceModel,
  this.Student=studentModel,
  this.Class=classModel,
  this.Teacher=teacherModel
}
  // ================= CREATE ATTENDANCE =================  
  async createAttendance(attendanceData) {

    const {
      studentId,
      classId,
      date,
      status,
      markedBy,
    } = attendanceData;

    // Check student
    const student = await this.Student.findById(studentId);

    if (!student) {
      const error = new Error("Student not found");
      error.statusCode = 404;
      throw error;
    }

    // Check class
    const classData = await this.Class.findById(classId);

    if (!classData) {
      const error = new Error("Class not found");
      error.statusCode = 404;
      throw error;
    }

    // Check teacher
    const teacher = await this.Teacher.findById(markedBy);

    if (!teacher) {
      const error = new Error("Teacher not found");
      error.statusCode = 404;
      throw error;
    }

    // Check duplicate attendance
    const existingAttendance = await this.Attendance.findOne({
      studentId,
      date,
    });

    if (existingAttendance) {
      const error = new Error(
        "Attendance already marked for this student on this date"
      );
      error.statusCode = 400;
      throw error;
    }

    // Create attendance
    const attendance = await this.Attendance.create({
      studentId,
      classId,
      date,
      status,
      markedBy,
    });

    return attendance;
  }


  // ================= GET ALL ATTENDANCE =================
  async getAllAttendance() {

    const attendance = await this.Attendance.find()
      .populate({
        path: "studentId",
        populate: {
          path: "userId",
          select: "name email profileImg",
        },
      })
      .populate("classId")
      .populate({
        path: "markedBy",
        populate: {
          path: "userId",
          select: "name email profileImg",
        },
      })
      .sort({ date: -1 });

    return attendance;
  }


  // ================= GET ATTENDANCE BY ID =================
  async getAttendanceById(attendanceId) {

    const attendance = await this.Attendance.findById(attendanceId)
      .populate({
        path: "studentId",
        populate: {
          path: "userId",
          select: "name email profileImg",
        },
      })
      .populate("classId")
      .populate({
        path: "markedBy",
        populate: {
          path: "userId",
          select: "name email profileImg",
        },
      });

    if (!attendance) {
      const error = new Error("Attendance not found");
      error.statusCode = 404;
      throw error;
    }

    return attendance;
  }


  // ================= UPDATE ATTENDANCE =================
  async updateAttendance(attendanceId, attendanceData) {

    // First check attendance exists
    const existingAttendance =
      await this.Attendance.findById(attendanceId);

    if (!existingAttendance) {
      const error = new Error("Attendance not found");
      error.statusCode = 404;
      throw error;
    }

    const {
      studentId,
      classId,
      date,
      status,
      markedBy,
    } = attendanceData;


    // Check student if provided
    if (studentId !== undefined) {

      const student = await this.Student.findById(studentId);

      if (!student) {
        const error = new Error("Student not found");
        error.statusCode = 404;
        throw error;
      }
    }


    // Check class if provided
    if (classId !== undefined) {

      const classData = await this.Class.findById(classId);

      if (!classData) {
        const error = new Error("Class not found");
        error.statusCode = 404;
        throw error;
      }
    }


    // Check teacher if provided
    if (markedBy !== undefined) {

      const teacher = await this.Teacher.findById(markedBy);

      if (!teacher) {
        const error = new Error("Teacher not found");
        error.statusCode = 404;
        throw error;
      }
    }


    // Build update object
    const updateData = {};

    if (studentId !== undefined) {
      updateData.studentId = studentId;
    }

    if (classId !== undefined) {
      updateData.classId = classId;
    }

    if (date !== undefined) {
      updateData.date = date;
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    if (markedBy !== undefined) {
      updateData.markedBy = markedBy;
    }


    // Update attendance
    const attendance = await this.Attendance.findByIdAndUpdate(
      attendanceId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    return attendance;
  }


  // ================= DELETE ATTENDANCE =================
  async deleteAttendance(attendanceId) {

    const attendance =
      await this.Attendance.findByIdAndDelete(attendanceId);

    if (!attendance) {
      const error = new Error("Attendance not found");
      error.statusCode = 404;
      throw error;
    }

    return attendance;
  }
}

export default AttendanceService;