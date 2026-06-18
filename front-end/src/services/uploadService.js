async function uploadFile(file) {
  const formData = new FormData();
  formData.append("image", file);

  let res;
  try {
    res = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}upload`,
      {
        method: "POST",
        body: formData,
      },
    );
  } catch (err) {
    throw new Error(
      "Unable to connect to the server. Please check your connection.",
      { cause: err },
    );
  }

  let data;
  try {
    data = await res.json();
  } catch (err) {
    throw new Error("Received an unexpected response from the server.", {
      cause: err,
    });
  }

  if (!res.ok) {
    throw new Error(data.message || data.error || "Upload failed");
  }

  return data;
}

async function downloadFile(id) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}download/${id}`,
      {
        method: "GET",
      },
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.error(err);
  }
}

export { uploadFile, downloadFile };
