import { flatErrorArray, isDuplicate } from "@/utils";
import courseService from "./courseService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  registeredCourses: [],
  course: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createCourse = createAsyncThunk(
  "admin/courses/create",
  async (courseData, thunkAPI) => {
    try {
      return await courseService.createCourse(courseData);
    } catch (error) {
      let message = flatErrorArray(error?.response?.data?.errors).join(" ");
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const editCourse = createAsyncThunk(
  "admin/courses/edit",
  async (courseData, thunkAPI) => {
    try {
      return await courseService.editCourse(courseData);
    } catch (error) {
      let message = flatErrorArray(error?.response?.data?.errors).join(" ");
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteCourse = createAsyncThunk(
  "admin/courses/delete",
  async (courseData, thunkAPI) => {
    try {
      return await courseService.deleteCourse(courseData);
    } catch (error) {
      let message = flatErrorArray(error?.response?.data?.errors).join(" ");
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getCourse = createAsyncThunk(
  "admin/course/get",
  async (courseData, thunkAPI) => {
    try {
      return await courseService.getCourse(courseData);
    } catch (error) {
      let message = flatErrorArray(error?.response?.data?.errors).join(" ");
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getCourses = createAsyncThunk(
  "admin/courses",
  async (thunkAPI) => {
    try {
      return await courseService.getCourses();
    } catch (error) {
      let message = flatErrorArray(error?.response?.data?.errors).join(" ");
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getRegisteredCourses = createAsyncThunk(
  "student/courses",
  async (data, thunkAPI) => {
    try {
      return await courseService.getRegisteredCourses(data);
    } catch (error) {
      let message = flatErrorArray(error?.response?.data?.errors).join(" ");
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const removeFromRegisteredCourses = createAsyncThunk(
  "student/courses/remove",
  async (data, thunkAPI) => {
    try {
      return await courseService.removeFromRegisteredCourses(data);
    } catch (error) {
      let message = flatErrorArray(error?.response?.data?.errors).join(" ");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerCourse = createAsyncThunk(
  "student/courses/register",
  async (data, thunkAPI) => {
    try {
      return await courseService.registerCourse(data);
    } catch (error) {
      let message = flatErrorArray(error?.response?.data?.errors).join(" ");
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = "");
      state.courses = [];
    },
    resetCourses: (state) => {
      state.courses = [];
    },
    resetCourse: (state) => {
      state.course = null;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course = action.payload;
        if (!isDuplicate(state.courses, action.payload, "name"))
          state.courses = [...state.courses, action.payload];
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = false;
        (state.isError = true), (state.message = action.payload);
        state.course = null;
      }).
      addCase(registerCourse.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course = action.payload;
        if (!isDuplicate(state.registeredCourses, action.payload, "name"))
          state.registeredCourses = [...state.registeredCourses, action.payload];
      })
      .addCase(registerCourse.rejected, (state, action) => {
        state.isLoading = false;
        (state.isError = true), (state.message = action.payload);
      })
      .addCase(editCourse.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course = action.payload;
        state.courses = state.courses.map((c) =>
          c.id == action.payload.id ? action.payload : c
        );
      })
      .addCase(editCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.course = null;
      })
      .addCase(deleteCourse.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses = state.courses.filter(
          (course) => course.id !== action.meta.arg
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.message = action.payload);
      })
      .addCase(getCourse.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.course = action.payload;
      })
      .addCase(getCourse.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.message = action.payload);
        state.course = null;
      })
      .addCase(getCourses.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.message = action.payload);
        state.courses = [];
      })
      .addCase(getRegisteredCourses.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getRegisteredCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.registeredCourses = action.payload;
      })
      .addCase(getRegisteredCourses.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.message = action.payload);
        state.registeredCourses = [];
      })
      .addCase(removeFromRegisteredCourses.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(removeFromRegisteredCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.registeredCourses = state.registeredCourses.filter(
          (course) => course.id !== action.meta.arg.courseId
        );
      })
      .addCase(removeFromRegisteredCourses.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.message = action.payload);
      });
  },
});

export const { reset, resetCourses, setCourses } = courseSlice.actions;
export default courseSlice.reducer;
