import * as Yup from "yup";

const registerCourseSchema = Yup.object().shape({
    user: Yup.number().required(),
    course: Yup.number().required()
});

export default registerCourseSchema;
