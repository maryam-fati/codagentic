import React, { useState, useEffect } from "react";
import { Copy, X } from 'lucide-react';

const TagInput = ({ initialTags = [], onTagsChange, placehold }) => {
  const [tags, setTags] = useState(initialTags);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (initialTags.length > 0) {

      setTags(initialTags);
    }
  }, [initialTags]);

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue !== "") {
      const updatedTags = [...tags, trimmedValue];
      setTags(updatedTags);
      setInputValue("");
      onTagsChange(updatedTags);
    }
  };
  const removeTag = (indexToRemove) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
    onTagsChange(updatedTags);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };


  const copyTags = () => {
    navigator.clipboard.writeText(tags.join(", "));
    alert("Links copied to clipboard!");

  };

  const clearTags = () => {

    setTags([]);
    onTagsChange([])
  };

  return (
    <div className="rounded-lg  w-full ">
      <div className="flex flex-wrap items-center gap-2 border !border-gray-700 p-2 py-4 rounded-lg">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center border-[1px] !border-gray-400 px-3 py-1 rounded-full text-sm"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-2 text-gray-400 hover:text-red-500"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          placeholder={placehold}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow  text-sm bg-transparent  focus:outline-none border-none placeholder-gray-500"
        />
        <div className="space-x-2">

          <button type="button" onClick={copyTags} className="text-gray-400 hover:text-blue-500">
            <Copy size={14} />
          </button>
          <button type="button" onClick={clearTags} className="text-gray-400 hover:text-red-500">
            <X size={14} />
          </button>
        </div>

      </div>
      <div className="mt-2 text-sm text-gray-500 flex justify-between">
        <span>Length: {tags.join(", ").length}</span>
      </div>
    </div>
  );
};

export default TagInput;
