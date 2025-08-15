import React, { useState, useRef } from 'react';
import axios from 'axios';

import * as pdfjsLib from 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs';

// Set the workerSrc globally (needed for pdf.js to work)
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';

const MainContent = ({ user, setIsLoginModalOpen, showAlert }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSelected, setFileSelected] = useState(false);
  const [languages] = useState([
    "English", "Spanish", "French", "German", "Italian", "Portuguese", "Dutch", "Russian", "Chinese", "Japanese", "Korean", "Turkish", "Arabic", "Hindi", "Bengali", "Polish", "Swedish", "Greek", "Hebrew", "Thai", "Vietnamese"
  ]);

  const [isTranslating, setIsTranslating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState(null);
  const [outputLanguage, setOutputLanguage] = useState('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const canvasRef = useRef(null);

  const closeModal = (e) => {
    if (e.target.classList.contains("confirmation-modal")) {
      setIsConfirmationModalOpen(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileSelected(true);
    } else {
      showAlert("Please select a valid file.", "warning");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setFileSelected(true);
    } else {
      showAlert("Please drop a valid file.", "warning");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleTranslatePdf = async () => {
    if (!user) {
      showAlert("Please login to translate a file.", "danger");
      setIsLoginModalOpen(true);
      return;
    }

    if (!file) {
      showAlert("Please select a file to translate.", "warning");
      return;
    }

    if (!outputLanguage) {
      showAlert("Please select an output language.", "warning");
      return;
    }

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result);
        try {
          const pdf = await pdfjsLib.getDocument(typedArray).promise;
          const page = await pdf.getPage(1);

          const viewport = page.getViewport({ scale: 1 });
          const canvas = canvasRef.current;

          if (!canvas) {
            console.error("Canvas element not found!");
            return; // Exit early if canvas is not available
          }

          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          await page.render(renderContext).promise;

          setPdfPreviewUrl(canvas.toDataURL());
          setIsConfirmationModalOpen(true);
        } catch (error) {
          console.error("Error generating PDF preview:", error);
          showAlert("Failed to generate PDF preview.", "danger");
        }
      };
      fileReader.readAsArrayBuffer(file);
    } else {
      setIsConfirmationModalOpen(true);
    }
  };

  const confirmTranslation = async () => {
    setIsConfirmationModalOpen(false);

    setIsTranslating(true);
    setProgress(0);
    setFileUrl(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('outputLanguage', outputLanguage);

    try {
      const response = await axios.post('http://localhost:3000/pdf/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'json',
      });

      if (response.data && response.data.pdfBuffer) {
        const binaryString = atob(response.data.pdfBuffer);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        setFileUrl(url);

        setIsTranslating(false);
        showAlert("File translated successfully!", "success");
      } else {
        throw new Error('Translation response is invalid.');
      }
    } catch (error) {
      showAlert(`Translation failed: ${error.message || 'Please try again later.'}`, "danger");
      setIsTranslating(false);
    }
  };

  const handleDownload = () => {
    if (fileUrl) {
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = 'translated.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      showAlert("No translated file available for download.", "warning");
    }
  };

  return (
    <div className="main-content">
      <h2 className="translate-title">Instantly Translate a Document</h2>
      <div
        className="upload-section"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input type="file" id="fileInput" onChange={handleFileChange} hidden />
        <label htmlFor="fileInput" className="upload-box">
          <span className="upload-icon">☁️</span>
          <p>Drag and Drop here</p>
        </label>
        {fileSelected && <p className="file-name">{`File selected: ${fileName}`}</p>}
      </div>

      <div className="language-selection">
        <label>Input Language:</label>
        <select>
          <option value="auto">Auto Detect</option>
          {languages.map((lang, index) => (
            <option key={index} value={lang}>{lang}</option>
          ))}
        </select>
        <label>Output Language:</label>
        <select onChange={(e) => setOutputLanguage(e.target.value)}>
          <option value="">Select Language</option>
          {languages.map((lang, index) => (
            <option key={index} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div className="translate-button">
        {!isTranslating && !fileUrl && <button onClick={handleTranslatePdf}>Translate Now!</button>}
        {isTranslating && (
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
        )}
        {fileUrl && (
          <button onClick={handleDownload} className="download-btn">Download Translated File</button>
        )}
      </div>

      {isConfirmationModalOpen && (
        <div className="confirmation-modal" onClick={closeModal}>
          <div className="confirmation-modal-content">
            {/*<span className="close" onClick={() => setIsConfirmationModalOpen(false)}>&times;</span>*/}
            <h2> Please approve the translation.</h2>
            <p className='no-margin'>Here's a 1-page preview of your document.</p>
              <div className="pdf-preview-container">
                {pdfPreviewUrl && <img src={pdfPreviewUrl} alt="PDF Preview" style={{ maxWidth: '100%' }} />}
              </div>
              <div className="file-info">
                <p><strong>File name:</strong> {fileName}</p> 
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p><strong>Translation Language:</strong></p>
                    <p className='no-margin'>{outputLanguage}</p> 
                  </div>
                  <div>
                    <p><strong>Credit for this translation:</strong></p>
                    <p className='no-margin'>132</p>
                  </div>
                </div>
              </div>
            <br></br>
            <div className="credit-info">
              <p style={{ textAlign: 'justify' }}>
                ⚠️ If you approve the translation, the amount above will be deducted from your credit, if any. If you close the page or log out before the translation is completed, your calculated credit will not be refunded.
              </p>
            </div>

            <button className="confirm-btn" onClick={confirmTranslation}>Confirm</button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="supported-formats">
        <p className='no-margin'>Supported formats:</p>
        <div className="format-container">
          <span className="format pdf">PDF</span>
          <span className="format docx">DOCX</span>
          <span className="format txt">TXT</span>
          <span className="format pptx">PPTX</span>
        </div>
      </div>

      <style>
        {`
          .main-content { padding: 40px; background: #fcfcfa; }
          .translate-title { margin-top: 20px; }
          .upload-section { text-align: center; margin: 40px 0; }
          .upload-box { 
            display: inline-block; 
            border: 3px dashed black; 
            padding: 40px; 
            cursor: pointer; 
            font-size: 18px; 
            transition: box-shadow 0.3s ease;
          }
          .upload-box:hover {
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          }
          .upload-icon { font-size: 50px; }
          .language-selection { display: flex; justify-content: center; align-items: center; gap: 20px; margin-top: 30px; font-size: 18px; }
          select { padding: 8px; font-size: 16px; background: #ddd; border: none; transition: box-shadow 0.3s ease; }
          select:hover {
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          }
          .translate-button { text-align: center; margin-top: 30px; }
          .translate-button button, .download-btn { 
            background: #008b8b; 
            color: white; 
            padding: 12px 25px; 
            border: none; 
            cursor: pointer; 
            font-size: 18px; 
            border-radius: 5px; 
            box-shadow: 5px 5px 0px #69a5a5; 
            text-decoration: none; 
            display: inline-block;
            transition: box-shadow 0.3s ease;
          }
          .translate-button button:hover, .download-btn:hover {
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          }
          .progress-bar { width: 100%; height: 20px; background: #ddd; border-radius: 10px; margin-top: 10px; overflow: hidden; }
          .progress { height: 100%; background: #008b8b; transition: width 0.5s ease; }
          .supported-formats { position: absolute; bottom: 20px; right: 20px; text-align: left; font-size: 16px; font-style: italic;}
          .format-container { display: flex; align-items: center; gap: 10px; }
          .format { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 5px; color: white; font-size: 14px; font-weight: bold; }
          .format:hover {
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
          }
          .no-margin { margin: -2px auto 8px auto !important; }
          .pdf { background: red; }
          .docx { background: blue; }
          .txt { background: black; }
          .pptx { background: orange; }
          .file-name {
            margin-top: 15px;
            color: #333;
            font-size: 16px;
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
          }
          .confirmation-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }

          .confirmation-modal-content {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            width: 500px;
            position: relative;
            text-align: center;
            animation: fadeIn 0.5s ease-out, slideUp 0.5s ease-out;
          }

          .close {
            position: absolute;
            right: 10px;
            top: 5px;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
          }

          .file-info p {
            margin-bottom: 5px;
          }

          .credit-info {
            background-color: #f0f0f0;
            padding: 2px 15px;
            border-radius: 5px;
            margin-bottom: 20px;
          }

          .confirm-btn {
            background-color: #008b8b;
            color: white;
            padding: 12px 25px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
          }
          
          .pdf-preview-container {
            width: 100%;
            height: 200px; /* Set the height to make it scrollable */
            overflow-y: auto; /* Make the content scrollable vertically */
            padding: 10px;
          }
          
          canvas {
            display: block;
            margin: 0 auto; /* Center the canvas */
            width: 100%; /* Fit the width of the container */
          }
        `}
      </style>
    </div>
  );
};

export default MainContent;