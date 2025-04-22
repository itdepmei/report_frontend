const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default formatDate;
