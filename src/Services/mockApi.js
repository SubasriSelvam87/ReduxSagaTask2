import axios from "axios";

let apiURL="https://66c44c11b026f3cc6ceebb30.mockapi.io/Bill/";

export const getAll=async()=>{
  const response=await axios({
    method:'GET',
    url:apiURL,
  });
  return response;
}

export const getId=async(id)=>{
  const response=await axios({
    method:'GET',
    url:`${apiURL}${id}`,
  });
  return response;
}

export const postItem=async(data)=>{
  const response=await axios({
    method:'POST',
    url:apiURL,
    data,
  });
  return response;
}


export const putItem=async(data,id)=>{
  const response=await axios({
    method:'PUT',
    url:`${apiURL}${id}`,
    // url: API_URL + id,
    data,
  });
  return response;
}

export const deleteItem=async(id)=>{
  const response=await axios({
    method:'DELETE',
    url:`${apiURL}${id}`,
    // data:id,
  });
  return response;
}


export const viewItem = async (id) => {
  if (typeof id !== "string" && typeof id !== "number") {
      throw new Error("Invalid ID type");
  }
  const response = await axios.get(`${apiURL}${id}`); // Ensure id is a string or number
  return response;
};


// export const loginApi = async (credentials) => {
//   const { username, password } = credentials;

//   try {
//       const response = await axios.get(apiURL);
//       const user = response.data.find(user => user.username === username && user.password === password);

//       if (user) {
//           return { data: user }; // Return user data
//       } else {
//           throw new Error('Invalid credentials');
//       }
//   } catch (error) {
//       return { error: error.message || 'Login failed' };
//   }
// };

