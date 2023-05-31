import axios from "axios";
export const truncateString = (str, num) => {
    if (str.split(" ").length <= num) {
        return str;
    }
    const words = str.split(" ");
    const truncated = words.slice(0, num).join(" ");
    return truncated + "...";
}

export const colors = [
    '#FE6244',
    '#85F4FF',
    '#FF33FF',
    '#FFD95A',
    '#00FFCA',
    "#E11299",
    "#F9D949",
    "#EA8FEA",
    "#E93B81",
    "#B3FFAE",
    "#FDCFDF",
]

export const uploadFileToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "xisastza");
    formData.append("cloud_name", "dziizjlqs");

    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dziizjlqs/image/upload",
            formData
        );

        console.log(response.status === 200);
        if (response.status === 200) {
            const imageUrl = response.data.secure_url; // Retrieve the secure URL of the uploaded image
            return imageUrl
        } else {
            // Handle error response
            console.error('Upload failed:', response.status, response.statusText);
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Upload error:', error);
    }

    return null;
};

export const formatDate = (releaseDate) => {
    const date = new Date(releaseDate);
    const formattedDate = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
    return formattedDate;
}