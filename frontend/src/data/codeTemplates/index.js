import valkeyGlide from "./valkey-glide";
import valkeyPy from "./valkey-py";
import ioValkey from "./iovalkey";
import valkeyJava from "./valkey-java";
import valkeyGo from "./valkey-go";

class TemplateNavigator {
  constructor() {
    this.clients = {
      "glide-python": valkeyGlide.python,
      "glide-node": valkeyGlide.node,
      "glide-java": valkeyGlide.java,
      "valkey-py": valkeyPy,
      iovalkey: ioValkey,
      "valkey-java": valkeyJava,
      "valkey-go": valkeyGo,
    };
  }

  getTemplate(client, templateName) {
    return this.clients[client][templateName];
  }

  listTemplates(client) {
    return Object.keys(this.clients[client]);
  }

  listAllTemplates() {
    return Object.keys(this.clients).reduce((acc, client) => {
      return acc.concat(Object.keys(this.clients[client]));
    }, []);
  }
}

export default new TemplateNavigator();
