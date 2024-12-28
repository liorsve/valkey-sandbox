import basicTemplates from "./basic";
import advancedTemplates from "./advanced";

const valkeyGlide = {
  python: { ...basicTemplates.python, ...advancedTemplates.python },
  node: { ...basicTemplates.node, ...advancedTemplates.node },
  java: { ...basicTemplates.java, ...advancedTemplates.java },
};

export default valkeyGlide;
