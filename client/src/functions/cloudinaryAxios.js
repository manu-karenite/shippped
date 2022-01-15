import axios from "axios";
const upload = async (token, binary) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_API}/upload-images`,
    headers: {
      authorization: "Bearer " + token,
    },
    data: {
      bin: binary,
    },
  });
  return result;
};

const destroy = async (token, uniqueId) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_API}/destroy-image`,
    headers: {
      authorization: "Bearer " + token,
    },
    data: {
      id: uniqueId,
    },
  });
  return result;
};
// const currentUser = async (token) => {
//   const result = await axios({
//     method: "GET",
//     url: `${process.env.REACT_APP_BACKEND_API}/current-user`,
//     headers: {
//       authorization: "Bearer " + token,
//     },
//   });
//   return result;
// };

// const currentAdmin = async (token) => {
//   const result = await axios({
//     method: "GET",
//     url: `${process.env.REACT_APP_BACKEND_API}/current-admin`,
//     headers: {
//       authorization: "Bearer " + token,
//     },
//   });
//   return result;
// };

export { upload, destroy };
