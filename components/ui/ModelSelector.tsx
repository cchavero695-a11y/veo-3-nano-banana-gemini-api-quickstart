import React from "react";
import { ChevronDown } from "lucide-react";

type StudioMode =
  | "create-image"
  | "edit-image"
  | "compose-image"
  | "create-video";

interface ModelSelectorProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  mode: StudioMode;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  setSelectedModel,
  mode,
}) => {
  const getModelsForMode = (currentMode: StudioMode) => {
    if (currentMode === "create-video") {
      return [
        "veo-3.1-fast-generate-preview",
        "veo-3.1-generate-preview",
      ];
    } else {
      // For image modes
      return ["gemini-2.5-flash-image", "gemini-3.1-flash-image", "gemini-3-pro-image"];
    }
  };

  const models = getModelsForMode(mode);

  const formatModelName = (model: string) => {
    if (model.includes("veo-3.1-fast")) return "Veo 3.1 - Fast";
    if (model.includes("veo-3.1")) return "Veo 3.1";
    if (model.includes("gemini-2.5")) return "Gemini 2.5 Flash Image";
    if (model.includes("gemini-3.1")) return "Gemini 3.1 Flash Image";
    if (model.includes("gemini-3-pro")) return "Gemini 3 Pro Image";
    return model;
  };

  return (
    <div className="relative flex items-center">
      <select
        aria-label="Model selector"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        className="pl-3 pr-8 py-2 text-sm rounded-md border  focus:outline-none focus:ring-2 focus:ring-gray-500 appearance-none"
      >
        {models.map((model) => (
          <option key={model} value={model}>
            {formatModelName(model)}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default ModelSelector;
