// src/utils/getCourseImageSrc.js

const getCourseImageSrc = (course) => {
  const folder = course.category === 'Academic' ? 'academic' : 'skill';
  const name = course.title.toLowerCase().replace(/\s+/g, '');
  const extensions = ['.jpeg', '.jpg', '.png'];

  for (const ext of extensions) {
    const path = `/images/courses/${folder}/${name}${ext}`;
    const img = new Image();
    img.src = path;
    if (img.complete) return path;
  }

  return '/images/placeholder.png'; // fallback image
};

export default getCourseImageSrc;
