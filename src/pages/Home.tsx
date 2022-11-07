import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import Papa from "papaparse";
import { Navigate, useNavigate } from "react-router-dom";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

export const Home = () => {
    const [columns, setFileColumns] = useState([]);
    const [error, setError] = useState("");
    const [file, setFile] = useState("");

    const handleFileChange = (e) => {
        setError("");

        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            const fileExtension = inputFile?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                setError("Please input a csv file");
                return;
            }

            setFile(inputFile);
        }
    };
    const handleParse = () => {
        if (!file) return setError("Enter a valid file");

        const reader = new FileReader();

        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target?.result, { header: true });
            const parsedData = csv?.data;
            const columns = Object.keys(parsedData[0]);
            console.log("parsing:", parsedData);

            setFileColumns(columns);
        };
        reader.readAsText(file);
    };

    const headerSelection = (e: BaseSyntheticEvent) => {
        console.log(e);
    };

    const handleFetching = () => {
        // Papa.parse(file, {
        //     worker: true,
        //     step: function (row) {
        //         console.log("Row:", row.data);
        //     },
        //     complete: function () {
        //         console.log("All done!");
        //     },
        // });
    };

    return (
        <div>
            <label htmlFor="csvInput" style={{ display: "block" }}>
                Enter CSV File
            </label>
            <input
                onChange={handleFileChange}
                id="csvInput"
                name="file"
                type="File"
            />
            <div>
                <button className="btn" onClick={handleParse}>
                    Read File
                </button>
            </div>
            <div style={{ marginTop: "3rem" }}>
                {error ? (
                    error
                ) : (
                    <>
                        <label htmlFor="tracking_header">
                            Choose the column with the Tracking Numbers
                        </label>
                        <select
                            onChange={headerSelection}
                            name="tracking_header"
                            id="tracking_header"
                        >
                            <option value="" disabled selected hidden>
                                Choose Header...
                            </option>
                            {columns.map((col, idx) => (
                                <option value={idx} key={idx}>
                                    {col}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleFetching}>Bundle numbers</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
