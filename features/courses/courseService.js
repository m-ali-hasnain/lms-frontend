import globalAxios from "../../axios/index";

const createCourse = async (courseData) => {
  const response = await globalAxios.post("courses/", courseData);
  return response.data;
};
const editCourse = async (courseData) => {
  const response = await globalAxios.put(
    `courses/${courseData.id}`,
    courseData
  );
  return response.data;
};

const deleteCourse = async (courseData) => {
  const response = await globalAxios.delete(
    `courses/${courseData}`
  );
  return response.data;
};

const getCourse = async (courseData) => {
  const response = await globalAxios.get(`courses/${courseData.id}/students`);
  return response.data;
};
const getCourses = async () => {
  const response = await globalAxios.get("courses");
  return response.data;
};
const registerCourse = async(data) => {
  const response = await globalAxios.post(`registrations/`, data);
  return response.data;
}

const getRegisteredCourses = async(data) => {
  const response = await globalAxios.get(`users/${data.id}/courses`);
  return response.data;
}
const removeFromRegisteredCourses = async(data) => {
  const response = await globalAxios.delete(`users/${data.id}/courses/${data.courseId}`);
  return response.data;
}


const courseService = {
  createCourse,
  editCourse,
  deleteCourse,
  getCourse,
  getCourses,
  getRegisteredCourses,
  removeFromRegisteredCourses,
  registerCourse
};

export default courseService;
