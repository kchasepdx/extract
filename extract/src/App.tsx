import { useEffect, useState } from 'react';
import { Upload, FileText, Mail, Phone, Calendar, Clock, FileCheck, X } from 'lucide-react';
import { PDFParse } from 'pdf-parse';
import './App.css';


export default function App() {
  const [file, setFile] = useState(null);
  const [extracting, setExtracting] = useState(false);
  const [extracted, setExtracted] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setExtracted(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setExtracted(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleExtract = async () => {
    if (!file) return;

    setExtracting(true);

    // Simulate extraction process
    setTimeout(() => {
      setExtracted({
        summary: "This document contains a project proposal for implementing a new customer management system. Key objectives include improving customer data organization, streamlining communication workflows, and enhancing reporting capabilities.",
        dates: ["2025-03-15", "2025-04-01", "2025-06-30"],
        times: ["09:00 AM", "2:30 PM", "5:00 PM"],
        emails: ["contact@company.com", "support@example.org", "project.lead@business.net"],
        phones: ["+1 (555) 123-4567", "+1 (555) 987-6543", "+44 20 7123 4567"]
      });
      setExtracting(false);
    }, 2000);
  };

  const clearFile = () => {
    setFile(null);
    setExtracted(null);
  };

  console.log({ file })
  const link = 'https://mehmet-kozan.github.io/pdf-parse/pdf/climate.pdf';
  const parser = new PDFParse({ url: link });
  useEffect(() => {
    const fetchInfo = async () => {
      const result = await parser.getInfo({ parsePageInfo: true });
      console.log({ result });
    };
    fetchInfo();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">PDF Information Extractor</h1>
          <p className="text-gray-600">Upload your PDF to automatically extract key information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-3 border-dashed border-indigo-300 rounded-xl p-12 text-center hover:border-indigo-500 transition-colors cursor-pointer bg-indigo-50"
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-16 h-16 mx-auto mb-4 text-indigo-500" />
                <p className="text-xl font-semibold text-gray-700 mb-2">
                  Drop your PDF here or click to browse
                </p>
                <p className="text-gray-500">Supports PDF files only</p>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearFile}
                  className="p-2 hover:bg-indigo-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <button
                onClick={handleExtract}
                disabled={extracting}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {extracting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Extracting Information...
                  </span>
                ) : (
                  'Extract Information'
                )}
              </button>
            </div>
          )}
        </div>

        {extracted && (
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileCheck className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">Extracted Information</h2>
            </div>

            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                  Summary
                </h3>
                <p className="text-gray-600">{extracted.summary}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Dates Found
                  </h3>
                  <ul className="space-y-2">
                    {extracted.dates.map((date, idx) => (
                      <li key={idx} className="text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        {date}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-purple-600" />
                    Times Found
                  </h3>
                  <ul className="space-y-2">
                    {extracted.times.map((time, idx) => (
                      <li key={idx} className="text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                        {time}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-green-600" />
                    Emails Found
                  </h3>
                  <ul className="space-y-2">
                    {extracted.emails.map((email, idx) => (
                      <li key={idx} className="text-gray-600 flex items-center text-sm break-all">
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-2 flex-shrink-0"></span>
                        {email}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-orange-600" />
                    Phone Numbers Found
                  </h3>
                  <ul className="space-y-2">
                    {extracted.phones.map((phone, idx) => (
                      <li key={idx} className="text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-orange-600 rounded-full mr-2"></span>
                        {phone}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}