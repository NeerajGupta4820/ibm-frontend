// utils/filterUtils.js

export const filterByFees = (data, fee) => {
  return data.filter(item => Math.min(...Object.values(item.fees)) <= fee);
};

export const filterByAvailability = (data, availability) => {
  return data.filter(item => item.availability === availability);
};

export const filterByCourse = (data, course) => {
  return data.filter(item => item.courses && item.courses.includes(course));
};

export const filterByRatings = (data, rating) => {
  return data.filter(item => item.ratings >= rating);
};

export const filterBySubject = (data, subject) => {
  return data.filter(item => item.subjects && item.subjects.includes(subject));
};
