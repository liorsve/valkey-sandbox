import * as sharedMetadata from "./shared";
import pythonChallenges from "./python";
import nodeChallenges from "./node";
import javaChallenges from "./java";

class ChallengeManager {
  constructor() {
    this.implementations = {
      python: pythonChallenges,
      node: nodeChallenges,
      java: javaChallenges,
    };
    this.metadata = sharedMetadata;
  }

  getChallenge(challengeId, language) {
    const metadata = this.metadata[challengeId];
    const implementation = this.implementations[language]?.[challengeId];

    if (!metadata || !implementation) return null;

    return {
      ...metadata,
      ...implementation,
    };
  }

  listChallenges(language) {
    const impl = this.implementations[language];
    if (!impl) return [];

    return Object.keys(impl).map((id) => ({
      ...this.metadata[id],
      id,
      implementation: impl[id],
    }));
  }

  listByDifficulty(language, difficulty) {
    return Object.keys(this.implementations[language] || {}).filter(
      (id) => this.metadata[id].difficulty === difficulty
    );
  }
}

export default new ChallengeManager();
