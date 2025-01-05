class DataNavigator {
  constructor() {
    this.templatesPromise = null;
    this.challengesPromise = null;
  }

  async loadTemplates() {
    if (!this.templatesPromise) {
      this.templatesPromise = import("./codeTemplates").then((m) => m.default);
    }
    return this.templatesPromise;
  }

  async loadChallenges() {
    if (!this.challengesPromise) {
      this.challengesPromise = import("./challenges").then((m) => m.default);
    }
    return this.challengesPromise;
  }

  // Template-related methods
  async getTemplate(client, templateName) {
    const templates = await this.loadTemplates();
    return templates.getTemplate(client, templateName);
  }

  async listTemplates(client, language = null) {
    const templates = await this.loadTemplates();
    return templates.listTemplates(client, language);
  }

  async listAllTemplates() {
    const templates = await this.loadTemplates();
    return templates.listAllTemplates();
  }

  // Challenge-related methods
  async getChallenge(challengeId, language) {
    const challenges = await this.loadChallenges();
    return challenges.getChallenge(challengeId, language);
  }

  async listChallenges(language) {
    const challenges = await this.loadChallenges();
    return challenges.listChallenges(language);
  }

  async listChallengesByDifficulty(language, difficulty) {
    const challenges = await this.loadChallenges();
    return challenges.listByDifficulty(language, difficulty);
  }
}

export default new DataNavigator();
