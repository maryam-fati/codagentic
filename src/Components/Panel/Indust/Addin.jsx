import { useState } from "react";
import {X} from 'lucide-react'
import axios from "axios";

export default function Addin() {
    const url = import.meta.env.VITE_SERVER;

  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [list, setList] = useState([""]);
  const [list2, setList2] = useState([{ key: "", value: "" }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleListChange = (index, value) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const handleList2Change = (index, keyOrValue, value) => {
    const updated = [...list2];
    updated[index][keyOrValue] = value;
    setList2(updated);
  };

  const addListItem = () => setList([...list, ""]);
  const removeListItem = (index) => setList(list.filter((_, i) => i !== index));

  const addList2Item = () => setList2([...list2, { key: "", value: "" }]);
  const removeList2Item = (index) => setList2(list2.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const transformedList2 = list2.reduce((arr, item) => {
      if (item.key && item.value) arr.push({ [item.key]: item.value });
      return arr;
    }, []);

    try {
      await axios.post(`${url}/addindustry`, {
        title,
        des,
        list,
        list2: transformedList2,
      });
      setMessage("Industry added successfully!");
      setTitle("");
      setDes("");
      setList([""]);
      setList2([{ key: "", value: "" }]);
    } catch (error) {
      setMessage("Error: " + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-4   shadow rounded space-y-4"
    >
      <h2 className="text-xl font-semibold">Add Industry</h2>

      <input
        className="w-full p-2 border-[1px] border-gray-400 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full p-2 border-[1px] border-gray-400 rounded"
        placeholder="Description"
        value={des}
        onChange={(e) => setDes(e.target.value)}
        required
      />

      <div>
        <label className="font-medium">List Items <span className="text-xs text-gray-400">Make sure to add only 3 items.</span></label>
        {list.map((item, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              className="flex-1 p-2 border-[1px] border-gray-400 rounded"
              placeholder={`Item ${index + 1}`}
              value={item}
              onChange={(e) => handleListChange(index, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeListItem(index)}
              className="bg-red-800 text-white px-2 rounded"
            >
              <X/>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addListItem}
          className="mt-2 text-sm text-blue-600"
        >
          + Add List Item
        </button>
      </div>

      <div>
        <label className="font-medium">List2 (Key-Value) <span className="text-xs text-gray-400">Make sure to add only 3 items.</span></label>
        {list2.map((item, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              className="flex-1 p-2 border-[1px] border-gray-400 rounded"
              placeholder="Key"
              value={item.key}
              onChange={(e) => handleList2Change(index, "key", e.target.value)}
            />
            <input
              className="flex-1 p-2 border-[1px] border-gray-400 rounded"
              placeholder="Value"
              value={item.value}
              onChange={(e) => handleList2Change(index, "value", e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeList2Item(index)}
              className="bg-red-800 text-white px-2 rounded"
            >
              <X/>
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addList2Item}
          className="mt-2 text-sm text-blue-600"
        >
          + Add List2 Item
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white   py-2 px-4 rounded"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {message && <p className="text-sm text-center mt-2">{message}</p>}
    </form>
  );
}
