abstract class Config {
      public mySql = {host:"",user:"",password:"",database:""}
}

class DevelopmentConfig extends Config {
      public constructor() {
            super();
            this.mySql = { host: "localhost", user: "root", password: "", database: "shufersal" };
      }
}



const config = new DevelopmentConfig();

export default config;
