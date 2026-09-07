class AttendanceService {


constructor(attendanceModel, studentModel,classModel, teacherModel){
  this.Attendance=attendanceModel,
  this.Student=studentModel,
  this.Class=classModel,
  this.Teacher=teacherModel
}
  // ================= CREATE ATTENDANCE =================  
  async createAttendance(attendanceData) {

    if(Array.isArray(attendanceData)){
      const attendanceRecords=[];

      for(const item of attendanceData){
        const attendanceDate = new Date(item.date);
        attendanceDate.setHours(0, 0, 0, 0);

        attendanceRecords.push({
          studentId: item.studentId,
          classId: item.classId,
          date: attendanceDate,
          status: item.status,
          markedBy: item.markedBy,
        })
      }


      // instert in bulk
      return await this.Attendance.insertMany(attendanceRecords)
    }

    
    // existing single attendance logic 
     const {
      studentId,
      classId,
      date,
      status,
      markedBy,
    } = attendanceData;

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    return  await this.Attendance.create({
    studentId,
    classId,
    date:attendanceDate,
    status,
    markedBy,
  });
  }


  // ================= GET ALL ATTENDANCE =================
  async getAllAttendance(queryParams) {
    const filter = {};

  if (queryParams.studentId) {
  filter.studentId = queryParams.studentId;
  }

  if (queryParams.classId) {
  filter.classId = queryParams.classId;
  }

  if (queryParams.status) {
  filter.status = queryParams.status;
  }

  if (queryParams.markedBy) {
  filter.markedBy = queryParams.markedBy;
  }

  if (queryParams.date) {
  filter.date = queryParams.date;
  }

   let query = this.Attendance.find(filter)
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
      if (queryParams.sort) {
  query = query.sort(queryParams.sort);
  } else {
    query = query.sort("-date");
  }


  let page = 1;
  let limit = 10;

  if (queryParams.all !== "true") {
    page = Number(queryParams.page) || 1;
    limit = Number(queryParams.limit) || 10;

    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);
  }

  
const attendance = await query;

const total = await this.Attendance.countDocuments(filter);

  return {
  attendance,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  },
};

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


  // ================= GET ATTENDANCE STATS =================
async getAttendanceStats() {

  const total = await this.Attendance.countDocuments();

  const present = await this.Attendance.countDocuments({
    status: "present",
  });

  const absent = await this.Attendance.countDocuments({
    status: "absent",
  });

  const late = await this.Attendance.countDocuments({
    status: "late",
  });

  const attendanceRate =
    total > 0
      ? ((present / total) * 100).toFixed(1)
      : 0;

  return {
    present,
    absent,
    late,
    attendanceRate,
  };
}
}

export default AttendanceService;