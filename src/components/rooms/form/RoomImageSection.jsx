import React from "react";
import { useDropzone } from "react-dropzone";

const RoomImageSection = ({ imagePreview, onDrop, onRemove }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
        Visual Preview
      </label>

      <div
        {...getRootProps()}
        className={`w-full h-64 border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer group relative overflow-hidden ${
          isDragActive
            ? "border-ruby-red-600 bg-ruby-red-50"
            : "border-gray-300 bg-gray-100 hover:border-ruby-red-400 hover:bg-ruby-red-50"
        }`}
      >
        <input {...getInputProps()} />

        {imagePreview ? (
          <>
            <img
              src={imagePreview}
              alt="Room Preview"
              className="w-full h-full object-cover absolute inset-0 z-10"
            />
            <div className="absolute inset-0 z-20 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={onRemove}
                className="bg-white text-red-600 px-4 py-2 text-xs uppercase tracking-widest rounded shadow hover:bg-red-50"
              >
                Remove Image
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-gray-400 group-hover:text-ruby-red-600 z-10">
            <svg
              className={`w-10 h-10 mb-2 transition-transform ${
                isDragActive ? "scale-110" : "group-hover:scale-110"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs uppercase tracking-widest px-4 text-center">
              {isDragActive ? "Drop image here..." : "Click or Drag Image"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomImageSection;
