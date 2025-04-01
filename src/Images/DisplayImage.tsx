import { useEffect, useState } from "react";

const DisplayImage = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            const response = await fetch("http://localhost:8080/images/1");
            const blob = await response.blob();
            setImageSrc(URL.createObjectURL(blob));
        };

        fetchImage();
    }, []);

    return (
        <div>
            {imageSrc ? <img src={imageSrc} alt="Fetched Image" width={300} /> : <p>Loading...</p>}
        </div>
    );
};

export default DisplayImage;
