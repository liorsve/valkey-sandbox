import codeTemplates from "./codeTemplates";
import challenges from "./challenges";

class DataNavigator {
  constructor() {
    this.templates = codeTemplates;
    this.challenges = challenges;
  }

  // Template-related methods
  getTemplate(client, templateName) {
    return this.templates.getTemplate(client, templateName);
  }

  listTemplates(client, language = null) {
    return this.templates.listTemplates(client, language);
  }

  listAllTemplates() {
    return this.templates.listAllTemplates();
  }

  // Challenge-related methods
  getChallenge(challengeId, language) {
    return this.challenges.getChallenge(challengeId, language);
  }

  listChallenges(language) {
    return this.challenges.listChallenges(language);
  }

  listChallengesByDifficulty(language, difficulty) {
    return this.challenges.listByDifficulty(language, difficulty);
  }
}

export default new DataNavigator();
