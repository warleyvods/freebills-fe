import axios from 'axios';


export async function uploadFileToS3(url: string, file) {
  const config = {
    headers: {
      'Content-Type': file.type,
    },
  };

  return axios.put(url, file, config);
}
