import app from "./app";
import config from "./config/config";

app.listen(config.PORT, () => {
  console.log(`🚀 Server is running at ${config.URL}:${config.PORT}`);
});
