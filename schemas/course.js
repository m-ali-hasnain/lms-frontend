import * as Yup from "yup";

const courseSchema = Yup.object().shape({
    name: Yup.string().required(),
    credit_hours: Yup.number()
});

export default courseSchema;
