import { useState } from "react";

const ImageUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:8080/images/upload", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            setMessage("Upload successful!");
        } else {
            setMessage("Upload failed.");
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <p>{message}</p>
        </div>
    );
};

export default ImageUpload;
