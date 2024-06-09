export default function ExtractCourseNameFromUrl(url) {
    const parts = url.split("/");
    let course = parts[4];
    course = course.slice(0, 1).toUpperCase() + course.slice(1); // get course name and uppercase first letter
    return course;
}