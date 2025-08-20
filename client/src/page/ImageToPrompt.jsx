import React, { useState } from 'react';
import { FormField, Loader } from '../components';

const ImageToPrompt = () => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setGeneratedPrompt('');
    }
  };

  const generatePrompt = async () => {
    if (!selectedImage) {
      alert('Please select an image first');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('https://dalle-arbb.onrender.com/api/v1/image-to-prompt/generate-prompt', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setGeneratedPrompt(result.data.prompt);
      } else {
        alert('Failed to generate prompt. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while generating the prompt.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    alert('Prompt copied to clipboard!');
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Image to Prompt Generator</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Upload an image and get a detailed prompt that can be used to recreate it with DALL-E AI
        </p>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#222328]">Upload Image</h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full h-auto max-h-64 mx-auto rounded-lg"
                  />
                ) : (
                  <div className="space-y-2">
                    <div className="text-4xl">📷</div>
                    <p className="text-gray-600">Click to upload an image</p>
                    <p className="text-sm text-gray-500">Supports JPG, PNG, GIF up to 5MB</p>
                  </div>
                )}
              </label>
            </div>

            {selectedImage && (
              <button
                type="button"
                onClick={generatePrompt}
                disabled={loading}
                className="w-full bg-[#6469ff] text-white py-3 px-4 rounded-md font-medium hover:bg-[#5a5fd8] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader /> : 'Generate Prompt'}
              </button>
            )}
          </div>

          {/* Generated Prompt Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#222328]">Generated Prompt</h2>
            
            {generatedPrompt ? (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap">{generatedPrompt}</p>
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="bg-green-600 text-white py-2 px-4 rounded-md font-medium hover:bg-green-700"
                  >
                    Copy Prompt
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setGeneratedPrompt('');
                      setPreviewUrl('');
                    }}
                    className="bg-gray-600 text-white py-2 px-4 rounded-md font-medium hover:bg-gray-700"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
                <div className="text-4xl mb-2">✨</div>
                <p className="text-gray-600">
                  Upload an image and click "Generate Prompt" to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageToPrompt;
